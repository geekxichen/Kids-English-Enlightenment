import React, { useState, useEffect } from 'react';
import { ALPHABET, DAILY_WORDS_1, DAILY_WORDS_2, DAILY_WORDS_3, SIGHT_WORDS_LEVELS, SIGHT_WORDS_LEVELS_2 } from '../data';

const RAW_DICT = { ...DAILY_WORDS_1, ...DAILY_WORDS_2, ...DAILY_WORDS_3 };
const SIGHT_WORDS = { ...SIGHT_WORDS_LEVELS, ...SIGHT_WORDS_LEVELS_2 };

export function StageLetters({ speakWord, playReward }: { speakWord: any, playReward: any }) {
  const [targetLetter, setTargetLetter] = useState<any>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    loadPuzzle();
  }, []);

  const loadPuzzle = () => {
    const target = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    setTargetLetter(target);
    setIsSuccess(false);
    
    let opts = [target];
    while(opts.length < 3) {
      let r = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
      if(!opts.find(o => o.l === r.l)) opts.push(r);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  const handleDrop = (e: React.DragEvent, letter: string) => {
    e.preventDefault();
    const droppedLetter = e.dataTransfer.getData('letter');
    if (droppedLetter === targetLetter.l) {
      setIsSuccess(true);
      playReward();
      setTimeout(loadPuzzle, 1500);
    } else {
      speakWord('Try again');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center text-orange-600 font-fredoka text-3xl mb-6">字母大本营 🍎</div>
      
      <div className="bg-white border-4 border-dashed border-sky-300 rounded-3xl p-6 text-center mb-8 shadow-md">
        <h3 className="text-sky-500 font-bold text-xl mb-4">Feed the Shadow (喂影子)</h3>
        <div 
          className={`inline-flex justify-center items-center w-24 h-24 rounded-2xl font-fredoka text-6xl border-4 border-dashed transition-all duration-300 m-2
            ${isSuccess ? 'bg-yellow-400 text-white border-yellow-500 border-solid animate-bounce-custom' : 'bg-gray-100 text-gray-300 border-gray-300'}`}
          onDragOver={e => e.preventDefault()}
          onDrop={e => handleDrop(e, targetLetter?.l)}
        >
          {targetLetter?.l || '?'}
        </div>
        
        <div className="flex justify-center gap-4 mt-4">
          {options.map(opt => (
            <div 
              key={opt.l}
              draggable
              onDragStart={e => e.dataTransfer.setData('letter', opt.l)}
              onClick={() => {
                if (opt.l === targetLetter?.l) {
                  setIsSuccess(true);
                  playReward();
                  setTimeout(loadPuzzle, 1500);
                } else {
                  speakWord('Try again');
                }
              }}
              className="bg-white rounded-xl p-4 cursor-pointer shadow-md border-b-4 border-sky-300 min-w-[60px] font-fredoka text-3xl hover:scale-105 transition-transform"
            >
              {opt.l}
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-gray-500 mb-6">点击卡片听发音，结合图片加深记忆！</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {ALPHABET.map(item => (
          <div 
            key={item.l}
            onClick={() => speakWord(`${item.l}, ${item.word}`, true)}
            className="bg-white rounded-2xl p-4 text-center cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-md border-b-4 border-sky-300 flex flex-col items-center"
          >
            <img src={`https://placehold.co/100x100/FFD93D/2c3e50?text=${item.word}`} alt={item.word} className="w-16 h-16 object-cover rounded-xl mb-3 border-2 border-gray-100 pointer-events-none" />
            <div className="flex items-center gap-2">
              <span className="font-fredoka text-3xl">{item.l}</span>
              <span className="text-2xl">{item.emoji}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StageWords({ speakWord }: { speakWord: any }) {
  const [activeCat, setActiveCat] = useState(Object.keys(RAW_DICT)[0]);

  const words = RAW_DICT[activeCat as keyof typeof RAW_DICT].split(',').map(w => {
    const [eng, chn, emoji, phonetic] = w.split('|');
    return { eng, chn, emoji, phonetic };
  });

  return (
    <div className="animate-fade-in">
      <div className="text-center text-orange-600 font-fredoka text-3xl mb-6">生活小词典 📚</div>
      <p className="text-center text-gray-500 mb-6">超多词汇等你探索！点击就能跟读哦。</p>
      
      <div className="flex flex-wrap justify-center gap-3 pb-4 mb-4">
        {Object.keys(RAW_DICT).map(key => {
          const [catName, catEmoji] = key.split('|');
          return (
            <button 
              key={key}
              onClick={() => setActiveCat(key)}
              className={`whitespace-nowrap px-5 py-2 rounded-full font-bold text-lg border-2 transition-colors
                ${activeCat === key ? 'bg-sky-400 text-white border-sky-400' : 'bg-white text-gray-700 border-gray-200 hover:border-sky-300'}`}
            >
              {catEmoji} {catName}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {words.map((w, i) => (
          <div 
            key={i}
            onClick={() => speakWord(w.eng, true)}
            className="bg-white rounded-2xl p-4 text-center cursor-pointer shadow-md border-2 border-transparent hover:border-sky-300 active:scale-95 transition-all"
          >
            <span className="text-5xl block mb-2">{w.emoji}</span>
            <span className="font-fredoka text-xl text-gray-800 block">{w.eng}</span>
            {w.phonetic && <span className="text-sm text-sky-600 font-mono block">{w.phonetic}</span>}
            <span className="text-sm text-gray-500 font-bold block mt-1">{w.chn}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const SIGHT_WORD_SENTENCES: Record<string, string> = {
  "Level 1|🌱": "I can see the big red car go down.",
  "Level 2|🌿": "She said yes, I want to ride out now.",
  "Level 3|🍀": "Thank you for going to take some of them.",
  "Level 4|🌲": "Always wash your right hand first before sleep.",
  "Level 5|🌳": "I will try to draw a small warm tree today.",
  "Level 6|🍎": "The boy and girl eat bread and cake at home.",
  "Level 7|🍊": "Mother and father say goodbye to the sheep in the rain.",
  "Level 8|🍋": "Anyone can draw a beautiful tree near the city door.",
  "Level 9|🍇": "Every friend gave a great green apple to the girl.",
  "Level 10|🍉": "It is important to learn and listen to a great idea.",
};

export function StageSightWords({ speakWord }: { speakWord: any }) {
  const [activeCat, setActiveCat] = useState(Object.keys(SIGHT_WORDS)[0]);

  const words = SIGHT_WORDS[activeCat as keyof typeof SIGHT_WORDS].split(',').map(w => {
    const [eng, chn, phonetic] = w.split('|');
    return { eng, chn, phonetic };
  });

  return (
    <div className="animate-fade-in">
      <div className="text-center text-orange-600 font-fredoka text-3xl mb-6">Sight Words 常见词 👁️</div>
      <p className="text-center text-gray-500 mb-6">掌握这些高频词，阅读更轻松！</p>
      
      <div className="flex flex-wrap justify-center gap-3 pb-4 mb-4">
        {Object.keys(SIGHT_WORDS).map(key => {
          const [catName, catEmoji] = key.split('|');
          return (
            <button 
              key={key}
              onClick={() => setActiveCat(key)}
              className={`whitespace-nowrap px-6 py-3 rounded-full font-bold text-lg border-2 transition-colors
                ${activeCat === key ? 'bg-purple-500 text-white border-purple-500' : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300'}`}
            >
              {catEmoji} {catName}
            </button>
          );
        })}
      </div>

      <div className="bg-purple-50 rounded-2xl p-6 mb-6 text-center border-2 border-purple-200 cursor-pointer hover:bg-purple-100 transition-colors" onClick={() => speakWord(SIGHT_WORD_SENTENCES[activeCat])}>
        <div className="text-purple-400 text-sm font-bold mb-2 uppercase tracking-wider">Example Sentence 例句</div>
        <div className="text-purple-800 font-fredoka text-2xl">
          {SIGHT_WORD_SENTENCES[activeCat]}
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {words.map((w, i) => (
          <div 
            key={i}
            onClick={() => speakWord(w.eng, false)}
            className="bg-white rounded-2xl p-4 text-center cursor-pointer shadow-sm border-b-4 border-purple-200 hover:bg-purple-50 active:scale-95 transition-all"
          >
            <span className="font-fredoka text-2xl text-purple-700 block">{w.eng}</span>
            {w.phonetic && <span className="text-xs text-gray-400 font-mono block">{w.phonetic}</span>}
            <span className="text-sm text-gray-500 font-bold block mt-1">{w.chn}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
