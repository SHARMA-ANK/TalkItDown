import React from 'react';

export function ZineHome() {
  return (
    <div className="min-h-screen bg-white text-black font-['Impact',sans-serif] p-6 flex flex-col relative">
      {/* Massive Header */}
      <header className="mb-6 pb-4 border-b-8 border-black">
        <h1 className="text-8xl leading-none tracking-tighter uppercase transform -rotate-2">
          SURVIVE
        </h1>
        <h2 className="text-6xl leading-none tracking-tighter uppercase mt-2">
          THE SHIFT
        </h2>
      </header>

      {/* Diagonal red slash */}
      <div className="absolute top-0 right-0 w-32 h-8 bg-[#FF3333] transform rotate-45 translate-x-8 -translate-y-4"></div>

      {/* Player Stats */}
      <div className="border-4 border-black p-4 mb-8 relative">
        <p className="font-mono text-xs font-bold uppercase mb-2">EMPLOYEE #0047 | @JSMITH94</p>
        <p className="text-7xl text-[#FF3333] tracking-tighter">4,280</p>
      </div>

      {/* Streak */}
      <div className="border-4 border-black inline-block px-2 py-1 mb-12 transform rotate-2 self-start bg-black text-white">
        <p className="text-sm uppercase tracking-widest">3-DAY STREAK</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-6 mt-auto mb-16">
        <button className="w-full text-left py-4 px-6 text-4xl border-4 border-black uppercase tracking-tighter hover:bg-black hover:text-white transition-colors relative group">
          START SHIFT /
          <div className="absolute top-full left-0 w-full h-2 bg-black opacity-0 group-hover:opacity-100 mt-1"></div>
        </button>
        <button className="w-full text-right py-4 px-6 text-4xl border-4 border-[#FF3333] text-[#FF3333] uppercase tracking-tighter hover:bg-[#FF3333] hover:text-white transition-colors">
          / BOSS FIGHT
        </button>
      </div>

      {/* Tab bar */}
      <div className="mt-auto border-t-4 border-black pt-4 flex justify-between text-xs font-bold uppercase tracking-widest">
        <span>LDR</span>
        <span>—</span>
        <span>REC</span>
        <span>—</span>
        <span>SET</span>
      </div>
    </div>
  );
}
