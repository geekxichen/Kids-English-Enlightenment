import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { StageLetters, StageWords, StageSightWords } from './components/VocabularyStages';
import { StageCircleTime } from './components/StageCircleTime';
import { StageCVC, StageLongVowels, StageBlends } from './components/PhonicsStages';
import { StagePictureBook } from './components/StagePictureBook';
import { Star, Settings, X, BookOpen } from 'lucide-react';

export default function App() {
  const [stars, setStars] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [moduleProgress, setModuleProgress] = useState<Record<string, number>>({});
  const [startTime] = useState(Date.now());
  const [activeTab, setActiveTab] = useState('letters');
  const [showParentModal, setShowParentModal] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [visibleStages, setVisibleStages] = useState({
    cvc: true,
    long: true,
    blends: true
  });

  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setIsHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const playReward = () => {
    setStars(s => s + 1);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
  };

  const speakWord = (text: string, rewardProb = false) => {
    setClicks(c => c + 1);
    setModuleProgress(prev => ({ ...prev, [activeTab]: (prev[activeTab] || 0) + 1 }));
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      let textToSpeak = text;
      if (text.toLowerCase() === 'ag') textToSpeak = 'agg';
      if (text.toLowerCase() === 'ap') textToSpeak = 'app';
      
      const msg = new SpeechSynthesisUtterance(textToSpeak);
      msg.lang = 'en-US'; 
      msg.rate = 0.8; 
      window.speechSynthesis.speak(msg);
    }
    if (rewardProb && Math.random() > 0.6) {
      setTimeout(() => {
        const praises = ["Super!", "Great job!", "Amazing!", "You did it!", "Excellent!"];
        const msg = new SpeechSynthesisUtterance(praises[Math.floor(Math.random() * praises.length)]);
        msg.lang = 'en-US'; 
        window.speechSynthesis.speak(msg);
        playReward();
      }, 1000);
    }
  };

  const startPress = () => {
    pressTimer.current = setTimeout(() => setShowParentModal(true), 2000);
  };

  const cancelPress = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
  };

  const generateReport = () => {
    const min = Math.floor((Date.now() - startTime) / 60000);
    alert(`生成海报成功！\n\n🎉 今天学习了 ${min} 分钟\n⭐ 收集了 ${stars} 颗奖励星\n🗣️ 勇敢开口跟读了 ${clicks} 次！`);
    setShowParentModal(false);
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    // On mobile, actively scroll to the main content area
    if (window.innerWidth < 768 && mainRef.current) {
      const yOffset = -20; 
      const y = mainRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const tabs = [
    { id: 'letters', label: '1. 字母大本营' },
    { id: 'words', label: '2. 日常词汇' },
    { id: 'sight', label: '3. Sight Words' },
    { id: 'circle', label: '4. Circle Time' },
    { id: 'cvc', label: '5. 短元音 CVC', hidden: !visibleStages.cvc },
    { id: 'long', label: '6. 长元音', hidden: !visibleStages.long },
    { id: 'blends', label: '7. 辅音拼读', hidden: !visibleStages.blends },
    { id: 'book', label: '8. 绘本工坊', icon: <BookOpen size={18} className="inline mr-1" /> }
  ];

  return (
    <div className="min-h-screen pb-12">
      <header className={`bg-gradient-to-br from-sky-400 to-blue-500 p-5 text-center text-white rounded-b-3xl shadow-lg sticky top-0 z-50 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex justify-between items-center max-w-5xl mx-auto mb-3 bg-white/20 rounded-full px-6 py-2">
          <div className="font-fredoka text-lg font-bold">
            {tabs.find(t => t.id === activeTab)?.label?.replace(/^\d+\.\s*/, '')} 学习进度
          </div>
          <div className="flex items-center gap-3">
            <div className="w-24 sm:w-32 h-3 bg-black/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(((moduleProgress[activeTab] || 0) / 20) * 100, 100)}%` }}
              />
            </div>
            <span className="font-bold">{moduleProgress[activeTab] || 0} 次互动</span>
          </div>
        </div>
        <h1 className="font-fredoka text-4xl m-0 drop-shadow-md">🌟 Phonics Hub</h1>
        
        <div className="flex justify-center gap-2 mt-4 flex-wrap max-w-5xl mx-auto">
          {tabs.filter(t => !t.hidden).map(tab => (
            <button 
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`font-fredoka text-sm px-4 py-2 rounded-full shadow-sm transition-all
                ${activeTab === tab.id ? 'bg-yellow-400 text-orange-600 scale-105' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>
      </header>

      <main ref={mainRef} className="max-w-5xl mx-auto mt-8 px-4">
        {activeTab === 'letters' && <StageLetters speakWord={speakWord} playReward={playReward} />}
        {activeTab === 'words' && <StageWords speakWord={speakWord} />}
        {activeTab === 'sight' && <StageSightWords speakWord={speakWord} />}
        {activeTab === 'circle' && <StageCircleTime speakWord={speakWord} playReward={playReward} />}
        {activeTab === 'cvc' && <StageCVC speakWord={speakWord} />}
        {activeTab === 'long' && <StageLongVowels speakWord={speakWord} />}
        {activeTab === 'blends' && <StageBlends speakWord={speakWord} />}
        {activeTab === 'book' && <StagePictureBook />}
      </main>

      {/* Parent Modal */}
      {showParentModal && (
        <div className="fixed inset-0 bg-black/60 z-[1000] flex justify-center items-center animate-fade-in p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowParentModal(false)}
              className="absolute right-4 top-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-gray-800 font-fredoka text-2xl text-center mb-6">🛡️ 家长控制台</h2>
            
            <div className="bg-sky-50 rounded-2xl p-5 mb-6 flex justify-around text-center">
              <div>
                <h4 className="text-gray-500 text-sm font-bold m-0">学习时长</h4>
                <p className="text-sky-500 font-fredoka text-3xl m-0 mt-1">{Math.floor((Date.now() - startTime) / 60000)}</p>
                <span className="text-xs text-gray-400">分钟</span>
              </div>
              <div>
                <h4 className="text-gray-500 text-sm font-bold m-0">获得星星</h4>
                <p className="text-sky-500 font-fredoka text-3xl m-0 mt-1">{stars}</p>
                <span className="text-xs text-gray-400">颗</span>
              </div>
              <div>
                <h4 className="text-gray-500 text-sm font-bold m-0">发音次数</h4>
                <p className="text-sky-500 font-fredoka text-3xl m-0 mt-1">{clicks}</p>
                <span className="text-xs text-gray-400">次</span>
              </div>
            </div>

            <h4 className="text-gray-500 font-bold mb-3">学习模块管理</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <span className="font-bold text-gray-700">显示【短元音 CVC】</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={visibleStages.cvc} onChange={e => setVisibleStages(s => ({...s, cvc: e.target.checked}))} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <span className="font-bold text-gray-700">显示【长元音】</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={visibleStages.long} onChange={e => setVisibleStages(s => ({...s, long: e.target.checked}))} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <span className="font-bold text-gray-700">显示【辅音拼读】</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={visibleStages.blends} onChange={e => setVisibleStages(s => ({...s, blends: e.target.checked}))} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
            </div>

            <div className="text-center mt-8">
              <button 
                onClick={generateReport}
                className="bg-sky-400 hover:bg-sky-500 text-white border-none py-3 px-8 text-lg rounded-full cursor-pointer font-bold shadow-lg transition-transform active:scale-95"
              >
                生成今日荣誉报告 📸
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
