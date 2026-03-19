import React, { useState } from 'react';
import { WORD_FAMILIES } from '../data';

export function StageCVC({ speakWord }: { speakWord: any }) {
  const [activeVowel, setActiveVowel] = useState('A');
  const [activeFamily, setActiveFamily] = useState(WORD_FAMILIES['A'][0]);
  const [blendState, setBlendState] = useState({ c: '?', w: '', e: '❓', showC: false });

  const handleVowelClick = (v: string) => {
    setActiveVowel(v);
    setActiveFamily(WORD_FAMILIES[v as keyof typeof WORD_FAMILIES][0]);
    setBlendState({ c: '?', w: '', e: '❓', showC: false });
  };

  const handleFamilyClick = (fam: any) => {
    setActiveFamily(fam);
    setBlendState({ c: '?', w: '', e: '❓', showC: false });
    speakWord(fam.family);
  };

  const handleBlend = (c: string, w: string, e: string) => {
    setBlendState({ c: '?', w: '', e: '❓', showC: false });
    setTimeout(() => {
      setBlendState({ c, w, e, showC: true });
      speakWord(w, true);
    }, 150);
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center text-orange-600 font-fredoka text-3xl mb-6">短元音与 CVC 魔法合成 🪄</div>
      
      <div className="bg-white rounded-3xl p-8 shadow-md text-center max-w-3xl mx-auto">
        <div className="flex justify-center gap-3 mb-6">
          {['A', 'E', 'I', 'O', 'U'].map(v => (
            <button 
              key={v}
              onClick={() => handleVowelClick(v)}
              className={`font-fredoka text-3xl w-16 h-16 rounded-2xl transition-transform
                ${activeVowel === v ? 'bg-red-400 text-white scale-110' : 'bg-gray-100 text-red-400 hover:bg-gray-200'}`}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {WORD_FAMILIES[activeVowel as keyof typeof WORD_FAMILIES].map(fam => (
            <button
              key={fam.family}
              onClick={() => handleFamilyClick(fam)}
              className={`font-bold text-xl px-5 py-2 rounded-full border-2 transition-colors
                ${activeFamily.family === fam.family ? 'bg-sky-400 text-white border-sky-400' : 'bg-white text-sky-400 border-sky-400 hover:bg-sky-50'}`}
            >
              -{fam.family}
            </button>
          ))}
        </div>

        <div className="bg-purple-50 border-4 border-dashed border-purple-300 rounded-3xl py-10 px-6 my-8 font-fredoka text-7xl flex flex-col items-center">
          <div className="flex items-center justify-center gap-2">
            <span className={`text-sky-500 transition-opacity duration-300 ${blendState.showC ? 'opacity-100' : 'opacity-0'}`}>{blendState.c}</span>
            <span className="text-red-400">{activeFamily.family[0]}</span>
            <span className="text-sky-500">{activeFamily.family[1]}</span>
          </div>
          <div className={`text-6xl mt-6 transition-opacity duration-300 ${blendState.showC ? 'opacity-100 animate-bounce-custom' : 'opacity-50'}`}>
            {blendState.e}
          </div>
        </div>

        <div className="text-gray-400 font-bold mb-4">添加首辅音：</div>
        <div className="flex flex-wrap justify-center gap-3">
          {activeFamily.words.map(wordObj => (
            <button
              key={wordObj.c}
              onClick={() => handleBlend(wordObj.c, wordObj.w, wordObj.e)}
              className="font-fredoka text-3xl w-16 h-16 rounded-2xl bg-sky-500 text-white hover:bg-sky-600 hover:scale-105 transition-transform shadow-sm"
            >
              {wordObj.c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StageLongVowels({ speakWord }: { speakWord: any }) {
  const vowels = [
    { title: 'a_e', color: 'text-orange-400', border: 'border-orange-400', sound: '/eɪ/ as in cake', words: ['cake|/keɪk/|🍰', 'game|/ɡeɪm/|🎮', 'tape|/teɪp/|📼', 'face|/feɪs/|😊', 'gate|/ɡeɪt/|⛩️', 'snake|/sneɪk/|🐍'] },
    { title: 'e_e', color: 'text-pink-400', border: 'border-pink-400', sound: '/iː/ as in these', words: ['these|/ðiːz/|👈', 'theme|/θiːm/|🎭', 'Pete|/piːt/|👦', 'Eve|/iːv/|👧', 'gene|/dʒiːn/|🧬', 'scene|/siːn/|🎬'] },
    { title: 'i_e', color: 'text-blue-400', border: 'border-blue-400', sound: '/aɪ/ as in kite', words: ['kite|/kaɪt/|🪁', 'bike|/baɪk/|🚲', 'five|/faɪv/|🖐️', 'nine|/naɪn/|9️⃣', 'mice|/maɪs/|🐁', 'fire|/faɪər/|🔥'] },
    { title: 'o_e', color: 'text-green-400', border: 'border-green-400', sound: '/oʊ/ as in bone', words: ['bone|/boʊn/|🦴', 'rose|/roʊz/|🌹', 'hole|/hoʊl/|🕳️', 'home|/hoʊm/|🏠', 'nose|/noʊz/|👃', 'cone|/koʊn/|🍦'] },
    { title: 'u_e', color: 'text-purple-400', border: 'border-purple-400', sound: '/juː/ or /uː/ as in cube, flute', words: ['cube|/kjuːb/|🧊', 'tube|/tjuːb/|🧪', 'June|/dʒuːn/|📅', 'mule|/mjuːl/|🐴', 'tune|/tjuːn/|🎵', 'flute|/fluːt/|🪈'] }
  ];

  return (
    <div className="animate-fade-in">
      <div className="text-center text-orange-600 font-fredoka text-3xl mb-4">长元音 (Magic E 魔法) ✨</div>
      
      <div className="max-w-3xl mx-auto bg-orange-50 rounded-2xl p-6 mb-8 border-2 border-orange-200 shadow-sm">
        <h4 className="text-orange-600 font-bold text-xl mb-2">什么是 Magic E (魔法 E)？</h4>
        <p className="text-gray-700 leading-relaxed mb-3">
          在英语中，当一个单词以元音字母 + 辅音字母 + 不发音的 <strong>e</strong> 结尾时（比如 c-a-k-<strong>e</strong>），
          这个结尾的 <strong>e</strong> 就像有魔法一样！它自己不发音，但会把前面的元音字母变成<strong>长元音</strong>（也就是字母本身的名字）。
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li><strong className="text-orange-500">a</strong> 读作 /eɪ/ (A的名字)</li>
          <li><strong className="text-blue-500">i</strong> 读作 /aɪ/ (I的名字)</li>
          <li><strong className="text-green-500">o</strong> 读作 /oʊ/ (O的名字)</li>
          <li><strong className="text-purple-500">u</strong> 读作 /juː/ 或 /uː/ (U的名字)</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vowels.map(v => (
          <div key={v.title} className={`bg-white rounded-3xl p-6 border-l-8 ${v.border} shadow-md text-center`}>
            <h3 className={`font-fredoka text-4xl mb-2 ${v.color}`}>{v.title}</h3>
            <p className="text-gray-500 font-bold mb-4">{v.sound}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {v.words.map(w => {
                const [word, phonetic, emoji] = w.split('|');
                return (
                  <div 
                    key={word}
                    onClick={() => speakWord(word, true)}
                    className="bg-purple-50 text-purple-700 px-4 py-2 rounded-xl font-bold text-lg border-2 border-purple-200 cursor-pointer hover:bg-purple-100 active:scale-95 transition-all flex flex-col items-center justify-center"
                  >
                    <div>{word} {emoji}</div>
                    <div className="text-xs text-purple-400 font-mono font-normal">{phonetic}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StageBlends({ speakWord }: { speakWord: any }) {
  const groups = [
    { title: 'L-Blends (辅音+l)', color: 'bg-blue-500', borderColor: 'border-blue-500', textColor: 'text-blue-500', items: [
      { b: 'bl', p: '/bl/', w: 'black ⬛' }, { b: 'cl', p: '/kl/', w: 'clock ⏰' }, { b: 'fl', p: '/fl/', w: 'flag 🚩' }, 
      { b: 'gl', p: '/gl/', w: 'globe 🌍' }, { b: 'pl', p: '/pl/', w: 'plant 🪴' }, { b: 'sl', p: '/sl/', w: 'slide 🛝' }
    ]},
    { title: 'R-Blends (辅音+r)', color: 'bg-orange-500', borderColor: 'border-orange-500', textColor: 'text-orange-500', items: [
      { b: 'br', p: '/br/', w: 'brick 🧱' }, { b: 'cr', p: '/kr/', w: 'crab 🦀' }, { b: 'dr', p: '/dr/', w: 'drum 🥁' }, 
      { b: 'fr', p: '/fr/', w: 'frog 🐸' }, { b: 'gr', p: '/gr/', w: 'grape 🍇' }, { b: 'pr', p: '/pr/', w: 'price 💰' }, { b: 'tr', p: '/tr/', w: 'tree 🌳' }
    ]},
    { title: 'S-Blends (s+辅音)', color: 'bg-yellow-400', borderColor: 'border-yellow-400', textColor: 'text-yellow-500', items: [
      { b: 'sc', p: '/sk/', w: 'scarf 🧣' }, { b: 'sk', p: '/sk/', w: 'skirt 👗' }, { b: 'sm', p: '/sm/', w: 'smile 😊' }, 
      { b: 'sn', p: '/sn/', w: 'snail 🐌' }, { b: 'sp', p: '/sp/', w: 'spider 🕷️' }, { b: 'st', p: '/st/', w: 'star ⭐' }, { b: 'sw', p: '/sw/', w: 'swan 🦢' }
    ]},
    { title: 'W-Blends & Tw', color: 'bg-teal-500', borderColor: 'border-teal-500', textColor: 'text-teal-500', items: [
      { b: 'tw', p: '/tw/', w: 'twin 👯' }, { b: 'dw', p: '/dw/', w: 'dwarf 🧔' }
    ]},
    { title: 'Digraphs (双辅音发一音)', color: 'bg-purple-500', borderColor: 'border-purple-500', textColor: 'text-purple-500', items: [
      { b: 'sh', p: '/ʃ/', w: 'ship 🚢' }, { b: 'ch', p: '/tʃ/', w: 'chair 🪑' }, { b: 'th', p: '/θ/', w: 'three 3️⃣' }, 
      { b: 'wh', p: '/w/', w: 'whale 🐋' }, { b: 'ph', p: '/f/', w: 'phone 📱' }
    ]},
    { title: 'Trigraphs (三辅音)', color: 'bg-pink-500', borderColor: 'border-pink-500', textColor: 'text-pink-500', items: [
      { b: 'scr', p: '/skr/', w: 'screen 📺' }, { b: 'spl', p: '/spl/', w: 'splash 💦' }, { b: 'spr', p: '/spr/', w: 'spring 🌱' }, 
      { b: 'str', p: '/str/', w: 'street 🛣️' }, { b: 'squ', p: '/skw/', w: 'square 🟩' }, { b: 'shr', p: '/ʃr/', w: 'shrimp 🦐' }, { b: 'thr', p: '/θr/', w: 'three 3️⃣' }
    ]}
  ];

  return (
    <div className="animate-fade-in">
      <div className="text-center text-orange-600 font-fredoka text-3xl mb-6">辅音丛与双辅音 🧩</div>
      
      <div className="max-w-3xl mx-auto bg-blue-50 rounded-2xl p-6 mb-8 border-2 border-blue-200 shadow-sm">
        <h4 className="text-blue-600 font-bold text-xl mb-2">什么是辅音丛 (Blends) 和双辅音 (Digraphs)？</h4>
        <p className="text-gray-700 leading-relaxed mb-3">
          当两个或多个辅音字母连在一起时，它们会产生奇妙的化学反应：
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>
            <strong className="text-blue-500">辅音丛 (Blends):</strong> 两个辅音字母在一起，<strong>各自发音，但连读得很快</strong>。就像混合果汁，你能尝出每种水果的味道。比如 <strong>bl</strong> (b+l), <strong>st</strong> (s+t)。
          </li>
          <li>
            <strong className="text-purple-500">双辅音 (Digraphs):</strong> 两个辅音字母在一起，<strong>发一个全新的音</strong>。就像蓝色加黄色变成了绿色。比如 <strong>sh</strong> (/ʃ/), <strong>ch</strong> (/tʃ/)。
          </li>
        </ul>
      </div>
      
      {groups.map(g => (
        <div key={g.title} className="mb-8">
          <div className={`inline-block px-6 py-2 rounded-full font-fredoka text-xl text-white mb-4 ${g.color}`}>
            {g.title}
          </div>
          <div className="flex flex-wrap gap-4">
            {g.items.map(item => {
              const [word, emoji] = item.w.split(' ');
              return (
                <div 
                  key={item.b}
                  onClick={() => speakWord(word, true)}
                  className={`bg-white border-4 ${g.borderColor} rounded-2xl p-4 w-32 text-center cursor-pointer shadow-sm hover:scale-105 active:scale-95 transition-transform flex flex-col items-center justify-center`}
                >
                  <h4 className={`font-fredoka text-3xl m-0 ${g.textColor}`}>{item.b}</h4>
                  <p className="text-sm text-gray-400 font-mono mt-1">{item.p}</p>
                  <p className="font-bold text-gray-600 mt-1">{item.w}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
