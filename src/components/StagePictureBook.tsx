import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Loader2, Sparkles, Settings2 } from 'lucide-react';

export function StagePictureBook() {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('初级 (幼儿园/K12)');
  const [pageCount, setPageCount] = useState(3);
  const [apiProvider, setApiProvider] = useState('gemini');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [customBaseUrl, setCustomBaseUrl] = useState('https://ark.cn-beijing.volces.com/api/v3');
  const [customModel, setCustomModel] = useState('ep-xxx-chat');
  const [customImageModel, setCustomImageModel] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState<any[]>([]);
  const [error, setError] = useState('');

  const generateBook = async () => {
    if (!topic) return;
    setLoading(true);
    setError('');
    setPages([]);

    try {
      let generatedPages = [];

      if (apiProvider === 'gemini') {
        const apiKey = apiKeyInput || (import.meta as any).env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
        if (!apiKey) {
          throw new Error('请输入 Gemini API Key 或在环境中配置。');
        }
        
        const ai = new GoogleGenAI({ apiKey });
        
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Write a children's picture book about: ${topic}. 
          Difficulty level: ${difficulty}.
          If difficulty is "初级 (幼儿园/K12)" (Beginner/Kindergarten): Use very simple English, 1 short sentence per page.
          If difficulty is "中级 (小学/K12)" (Intermediate/Elementary): Use slightly more complex sentences, 2-3 sentences per page.
          If difficulty is "高级 (初中/K12)" (Advanced/Middle School): Use descriptive paragraphs, more advanced vocabulary.
          Keep it to exactly ${pageCount} pages. Each page should have the English text and its Chinese translation.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  englishText: { type: Type.STRING },
                  chineseText: { type: Type.STRING },
                  imagePrompt: { type: Type.STRING, description: "Detailed prompt for generating a cute children's book illustration" }
                },
                required: ["englishText", "chineseText", "imagePrompt"]
              }
            }
          }
        });

        generatedPages = JSON.parse(response.text || '[]');
        
        // Generate images with Gemini
        const pagesWithImages = await Promise.all(generatedPages.map(async (page: any) => {
          try {
            const imgResponse = await ai.models.generateContent({
              model: 'gemini-2.5-flash-image',
              contents: {
                parts: [{ text: page.imagePrompt + ", cute children's book illustration style, bright colors, simple shapes, 2D vector art" }]
              }
            });
            
            let imageUrl = '';
            for (const part of imgResponse.candidates?.[0]?.content?.parts || []) {
              if (part.inlineData) {
                imageUrl = `data:image/png;base64,${part.inlineData.data}`;
                break;
              }
            }
            return { ...page, imageUrl };
          } catch (e) {
            console.error("Image generation failed for page", e);
            return { ...page, imageUrl: '' };
          }
        }));
        
        setPages(pagesWithImages);

      } else {
        // Custom OpenAI Compatible API
        if (!apiKeyInput) {
          throw new Error('请输入自定义大模型的 API Key。');
        }
        
        const response = await fetch(`${customBaseUrl.replace(/\/$/, '')}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKeyInput}`
          },
          body: JSON.stringify({
            model: customModel,
            messages: [
              { role: 'system', content: 'You are a children\'s book author. You must respond ONLY with a valid JSON array. Do not include markdown formatting like ```json. Each object in the array must have exactly these keys: "englishText", "chineseText", "imagePrompt".' },
              { role: 'user', content: `Write a ${pageCount}-page picture book about: ${topic}. Difficulty level: ${difficulty}. If Beginner: 1 short sentence per page. If Intermediate: 2-3 sentences per page. If Advanced: descriptive paragraphs. Each page has English text and Chinese translation.` }
            ]
          })
        });
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        let content = data.choices[0].message.content.trim();
        
        // Clean up markdown formatting if present
        if (content.startsWith('```json')) {
          content = content.replace(/^```json\n/, '').replace(/\n```$/, '');
        } else if (content.startsWith('```')) {
          content = content.replace(/^```\n/, '').replace(/\n```$/, '');
        }
        
        generatedPages = JSON.parse(content);
        
        // Generate images if customImageModel is provided
        if (customImageModel) {
          const pagesWithImages = await Promise.all(generatedPages.map(async (page: any) => {
            try {
              const imgResponse = await fetch(`${customBaseUrl.replace(/\/$/, '')}/images/generations`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${apiKeyInput}`
                },
                body: JSON.stringify({
                  model: customImageModel,
                  prompt: page.imagePrompt + ", cute children's book illustration style, bright colors, simple shapes, 2D vector art",
                  n: 1,
                  size: "1024x1024"
                })
              });
              
              if (!imgResponse.ok) {
                return { ...page, imageUrl: '' };
              }
              
              const imgData = await imgResponse.json();
              const imageUrl = imgData.data?.[0]?.url || imgData.data?.[0]?.b64_json ? `data:image/png;base64,${imgData.data[0].b64_json}` : '';
              return { ...page, imageUrl: imageUrl || imgData.data?.[0]?.url || '' };
            } catch (e) {
              console.error("Custom image generation failed for page", e);
              return { ...page, imageUrl: '' };
            }
          }));
          setPages(pagesWithImages);
        } else {
          setPages(generatedPages.map((p: any) => ({ ...p, imageUrl: '' })));
        }
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center text-orange-600 font-fredoka text-3xl mb-6">AI 绘本工坊 🎨</div>
      <p className="text-center text-gray-500 mb-6">输入一个想法，AI为你生成专属的双语绘本！</p>
      
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 shadow-md border-4 border-sky-200 mb-8">
        
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-700">模型设置</h3>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="text-sky-500 hover:text-sky-600 flex items-center gap-1 text-sm font-bold"
          >
            <Settings2 size={16} /> {showSettings ? '收起设置' : '展开设置'}
          </button>
        </div>

        {showSettings && (
          <div className="bg-gray-50 p-4 rounded-xl mb-4 border border-gray-200 space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">API 提供商</label>
              <select 
                value={apiProvider} 
                onChange={e => setApiProvider(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-sky-400 focus:outline-none text-sm"
              >
                <option value="gemini">Google Gemini (支持自动配图)</option>
                <option value="custom">其他大模型 (豆包, DeepSeek等 - 支持自定义生图)</option>
              </select>
            </div>
            
            {apiProvider === 'custom' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Base URL (OpenAI 兼容)</label>
                  <input 
                    type="text" 
                    value={customBaseUrl}
                    onChange={e => setCustomBaseUrl(e.target.value)}
                    placeholder="例如: https://ark.cn-beijing.volces.com/api/v3"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-sky-400 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">文本模型名称 (Model)</label>
                  <input 
                    type="text" 
                    value={customModel}
                    onChange={e => setCustomModel(e.target.value)}
                    placeholder="例如: ep-xxx-chat"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-sky-400 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">生图模型名称 (可选, 留空则不生图)</label>
                  <input 
                    type="text" 
                    value={customImageModel}
                    onChange={e => setCustomImageModel(e.target.value)}
                    placeholder="例如: ep-xxx-image"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-sky-400 focus:outline-none text-sm"
                  />
                </div>
              </>
            )}
            
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">API Key</label>
              <input 
                type="password" 
                value={apiKeyInput}
                onChange={e => setApiKeyInput(e.target.value)}
                placeholder={apiProvider === 'gemini' ? "输入 Gemini API Key (已配置可留空)" : "输入您的 API Key"}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-sky-400 focus:outline-none text-sm"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <select 
            value={difficulty} 
            onChange={e => setDifficulty(e.target.value)}
            className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-sky-400 focus:outline-none text-lg bg-white"
          >
            <option value="初级 (幼儿园/K12)">初级 (幼儿园/K12)</option>
            <option value="中级 (小学/K12)">中级 (小学/K12)</option>
            <option value="高级 (初中/K12)">高级 (初中/K12)</option>
          </select>
          <select 
            value={pageCount} 
            onChange={e => setPageCount(Number(e.target.value))}
            className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-sky-400 focus:outline-none text-lg bg-white"
          >
            <option value={3}>3 页</option>
            <option value={4}>4 页</option>
            <option value={5}>5 页</option>
          </select>
          <input 
            type="text" 
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="例如：一只勇敢的小飞猫..."
            className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-sky-400 focus:outline-none text-lg"
            onKeyDown={e => e.key === 'Enter' && generateBook()}
          />
          <button 
            onClick={generateBook}
            disabled={loading || !topic}
            className="bg-sky-400 hover:bg-sky-500 disabled:bg-gray-300 text-white px-6 py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            生成绘本
          </button>
        </div>
        {error && <p className="text-red-500 mt-4 text-center font-bold">{error}</p>}
        {apiProvider === 'custom' && !customImageModel && pages.length > 0 && (
          <p className="text-orange-500 mt-2 text-center text-sm">注：当前使用的是自定义模型，未配置生图模型，暂不支持配图。</p>
        )}
      </div>

      {loading && pages.length === 0 && (
        <div className="text-center text-sky-500 flex flex-col items-center justify-center py-10">
          <Loader2 className="animate-spin w-12 h-12 mb-4" />
          <p className="font-bold text-lg">正在施展魔法，绘制绘本中...</p>
        </div>
      )}

      {pages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pages.map((page, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-gray-100 flex flex-col hover:scale-105 transition-transform">
              <div className="aspect-4/3 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                {page.imageUrl ? (
                  <img src={page.imageUrl} alt={`Page ${idx + 1}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <span className="text-4xl mb-2">🖼️</span>
                    <span>{apiProvider === 'custom' ? '自定义模型无配图' : '图片生成失败'}</span>
                  </div>
                )}
              </div>
              <div className="p-6 text-center flex-1 flex flex-col justify-center">
                <p className="font-fredoka text-2xl text-gray-800 mb-3">{page.englishText}</p>
                <p className="text-gray-500 font-bold">{page.chineseText}</p>
              </div>
              <div className="bg-sky-50 py-3 text-center text-sky-600 font-bold text-sm border-t-2 border-sky-100">
                Page {idx + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
