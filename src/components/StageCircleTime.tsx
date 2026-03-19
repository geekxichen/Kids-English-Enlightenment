import React, { useState } from 'react';

export function StageCircleTime({ speakWord, playReward }: { speakWord: any, playReward: any }) {
  const [day, setDay] = useState<{text: string, color: string} | null>(null);
  const [time, setTime] = useState<{text: string, color: string} | null>(null);

  const handleDrop = (e: React.DragEvent, type: 'day' | 'time') => {
    e.preventDefault();
    const droppedType = e.dataTransfer.getData('type');
    if (droppedType === type) {
      const text = e.dataTransfer.getData('text');
      const color = e.dataTransfer.getData('color');
      if (type === 'day') {
        setDay({ text, color });
        speakWord(`Today is ${text}`);
      } else {
        setTime({ text, color });
        speakWord(`It is ${text}`);
      }
      playReward();
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center text-orange-600 font-fredoka text-3xl mb-6">Circle Time 🕒</div>
      <p className="text-center text-gray-500 mb-6">拖拽星期和时间到虚线框内，点击下方图标表达今天的心情和天气吧！</p>
      
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-md border-4 border-white">
          <h3 className="text-center text-gray-500 border-b-2 border-dashed border-gray-200 pb-2 mb-4 font-bold">TIME OF DAY</h3>
          <div className="space-y-2">
            <div draggable onDragStart={e => { e.dataTransfer.setData('text', 'MORNING'); e.dataTransfer.setData('type', 'time'); e.dataTransfer.setData('color', '#535c68'); }} onClick={() => speakWord('It is Morning')} className="bg-[#f6e58d] text-[#535c68] p-3 rounded-xl text-center font-bold cursor-grab shadow-sm">MORNING</div>
            <div draggable onDragStart={e => { e.dataTransfer.setData('text', 'AFTERNOON'); e.dataTransfer.setData('type', 'time'); e.dataTransfer.setData('color', 'white'); }} onClick={() => speakWord('It is Afternoon')} className="bg-[#ffbe76] text-white p-3 rounded-xl text-center font-bold cursor-grab shadow-sm">AFTERNOON</div>
            <div draggable onDragStart={e => { e.dataTransfer.setData('text', 'EVENING'); e.dataTransfer.setData('type', 'time'); e.dataTransfer.setData('color', 'white'); }} onClick={() => speakWord('It is Evening')} className="bg-[#30336b] text-white p-3 rounded-xl text-center font-bold cursor-grab shadow-sm">EVENING</div>
          </div>
          
          <h3 className="text-center text-gray-500 border-b-2 border-dashed border-gray-200 pb-2 mb-4 mt-6 font-bold">DAYS OF THE WEEK</h3>
          <div className="space-y-2">
            <div draggable onDragStart={e => { e.dataTransfer.setData('text', 'MONDAY'); e.dataTransfer.setData('type', 'day'); e.dataTransfer.setData('color', 'white'); }} onClick={() => speakWord('Today is Monday')} className="bg-[#ff9f43] text-white p-3 rounded-xl text-center font-bold cursor-grab shadow-sm">MONDAY</div>
            <div draggable onDragStart={e => { e.dataTransfer.setData('text', 'TUESDAY'); e.dataTransfer.setData('type', 'day'); e.dataTransfer.setData('color', 'white'); }} onClick={() => speakWord('Today is Tuesday')} className="bg-[#feca57] text-white p-3 rounded-xl text-center font-bold cursor-grab shadow-sm">TUESDAY</div>
            <div draggable onDragStart={e => { e.dataTransfer.setData('text', 'WEDNESDAY'); e.dataTransfer.setData('type', 'day'); e.dataTransfer.setData('color', 'white'); }} onClick={() => speakWord('Today is Wednesday')} className="bg-[#1dd1a1] text-white p-3 rounded-xl text-center font-bold cursor-grab shadow-sm">WEDNESDAY</div>
            <div draggable onDragStart={e => { e.dataTransfer.setData('text', 'THURSDAY'); e.dataTransfer.setData('type', 'day'); e.dataTransfer.setData('color', 'white'); }} onClick={() => speakWord('Today is Thursday')} className="bg-[#48dbfb] text-white p-3 rounded-xl text-center font-bold cursor-grab shadow-sm">THURSDAY</div>
            <div draggable onDragStart={e => { e.dataTransfer.setData('text', 'FRIDAY'); e.dataTransfer.setData('type', 'day'); e.dataTransfer.setData('color', 'white'); }} onClick={() => speakWord('Today is Friday')} className="bg-[#5f27cd] text-white p-3 rounded-xl text-center font-bold cursor-grab shadow-sm">FRIDAY</div>
            <div draggable onDragStart={e => { e.dataTransfer.setData('text', 'SATURDAY'); e.dataTransfer.setData('type', 'day'); e.dataTransfer.setData('color', 'white'); }} onClick={() => speakWord('Today is Saturday')} className="bg-[#ff9ff3] text-white p-3 rounded-xl text-center font-bold cursor-grab shadow-sm">SATURDAY</div>
            <div draggable onDragStart={e => { e.dataTransfer.setData('text', 'SUNDAY'); e.dataTransfer.setData('type', 'day'); e.dataTransfer.setData('color', 'white'); }} onClick={() => speakWord('Today is Sunday')} className="bg-[#ff6b6b] text-white p-3 rounded-xl text-center font-bold cursor-grab shadow-sm">SUNDAY</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md border-8 border-yellow-400 flex flex-col items-center text-center">
          <h2 className="text-orange-600 font-fredoka text-4xl m-0">TODAY IS...</h2>
          
          <div className="flex w-full justify-center gap-4 my-8">
            <div 
              className={`w-2/5 h-24 rounded-2xl border-4 border-dashed flex items-center justify-center transition-all ${day ? 'bg-gray-50 border-gray-200' : 'bg-gray-50 border-gray-300'}`}
              onDragOver={e => e.preventDefault()}
              onDrop={e => handleDrop(e, 'day')}
            >
              {day ? <span style={{color: day.color}} className="font-bold text-2xl">{day.text}</span> : <span className="text-gray-400">Drag Day (星期)</span>}
            </div>
            <div 
              className={`w-2/5 h-24 rounded-2xl border-4 border-dashed flex items-center justify-center transition-all ${time ? 'bg-gray-50 border-gray-200' : 'bg-gray-50 border-gray-300'}`}
              onDragOver={e => e.preventDefault()}
              onDrop={e => handleDrop(e, 'time')}
            >
              {time ? <span style={{color: time.color}} className="font-bold text-2xl">{time.text}</span> : <span className="text-gray-400">Drag Time (时间)</span>}
            </div>
          </div>
          
          <button 
            onClick={() => { setDay(null); setTime(null); }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-bold mb-6 transition-colors"
          >
            🔄 Reset 重置
          </button>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
            <div className="bg-orange-50 rounded-2xl p-4 border-2 border-orange-100">
              <h4 className="text-gray-500 font-bold mb-3">How are you feeling?</h4>
              <div className="flex justify-around flex-wrap gap-2">
                <button className="text-3xl bg-white border-2 border-gray-200 rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 hover:border-yellow-400 transition-all" onClick={() => speakWord('I am feeling happy', true)} title="Happy">😊</button>
                <button className="text-3xl bg-white border-2 border-gray-200 rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 hover:border-yellow-400 transition-all" onClick={() => speakWord('I am feeling sad', true)} title="Sad">😢</button>
                <button className="text-3xl bg-white border-2 border-gray-200 rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 hover:border-yellow-400 transition-all" onClick={() => speakWord('I am feeling angry', true)} title="Angry">😡</button>
                <button className="text-3xl bg-white border-2 border-gray-200 rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 hover:border-yellow-400 transition-all" onClick={() => speakWord('I am feeling sleepy', true)} title="Sleepy">😴</button>
                <button className="text-3xl bg-white border-2 border-gray-200 rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 hover:border-yellow-400 transition-all" onClick={() => speakWord('I am feeling excited', true)} title="Excited">🤩</button>
              </div>
            </div>
            <div className="bg-sky-50 rounded-2xl p-4 border-2 border-sky-100">
              <h4 className="text-gray-500 font-bold mb-3">What's the weather like?</h4>
              <div className="flex justify-around flex-wrap gap-2">
                <button className="text-3xl bg-white border-2 border-gray-200 rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 hover:border-yellow-400 transition-all" onClick={() => speakWord('The weather is sunny', true)} title="Sunny">☀️</button>
                <button className="text-3xl bg-white border-2 border-gray-200 rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 hover:border-yellow-400 transition-all" onClick={() => speakWord('The weather is rainy', true)} title="Rainy">🌧️</button>
                <button className="text-3xl bg-white border-2 border-gray-200 rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 hover:border-yellow-400 transition-all" onClick={() => speakWord('The weather is cloudy', true)} title="Cloudy">☁️</button>
                <button className="text-3xl bg-white border-2 border-gray-200 rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 hover:border-yellow-400 transition-all" onClick={() => speakWord('The weather is windy', true)} title="Windy">💨</button>
                <button className="text-3xl bg-white border-2 border-gray-200 rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 hover:border-yellow-400 transition-all" onClick={() => speakWord('The weather is snowy', true)} title="Snowy">❄️</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
