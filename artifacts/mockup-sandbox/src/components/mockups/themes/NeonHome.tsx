import React from 'react';

export function NeonHome() {
  return (
    <div className="min-h-screen bg-black text-[#00FFFF] font-['Space_Mono',monospace] p-4 flex flex-col relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, #000 2px, #000 4px)' }}></div>
      
      {/* Header */}
      <header className="text-center mt-8 mb-12 animate-pulse">
        <h1 className="text-2xl font-bold tracking-widest" style={{ textShadow: '0 0 10px #00FFFF, 0 0 20px #00FFFF' }}>
          &gt;&gt; SURVIVE THE SHIFT &lt;&lt;
        </h1>
      </header>

      {/* Player Card */}
      <div className="border-2 border-[#00FFFF] p-4 mb-8" style={{ boxShadow: '4px 4px 0 0 #00FFFF, inset 0 0 10px #00FFFF' }}>
        <p className="text-sm mb-2 text-[#FF00FF]">PLAYER_1 | @jsmith94</p>
        <p className="text-4xl text-[#ADFF2F] font-bold" style={{ textShadow: '0 0 10px #ADFF2F' }}>4,280 PTS</p>
      </div>

      {/* Streak */}
      <div className="text-center mb-12">
        <p className="text-[#ADFF2F] animate-pulse">
          &gt;&gt;&gt; 3-DAY STREAK &lt;&lt;&lt;
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-6 mt-auto mb-16 px-4">
        <button className="w-full py-4 text-xl border-2 border-[#00FFFF] text-[#00FFFF] transition-all hover:bg-[#00FFFF] hover:text-black" style={{ boxShadow: '0 0 15px #00FFFF' }}>
          [ START SHIFT ]
        </button>
        <button className="w-full py-4 text-xl border-2 border-[#FF00FF] text-[#FF00FF] transition-all hover:bg-[#FF00FF] hover:text-black" style={{ boxShadow: '0 0 15px #FF00FF' }}>
          [ DAILY BOSS ]
        </button>
      </div>

      <div className="text-center mb-8 animate-pulse text-sm">
        INSERT COIN
      </div>

      {/* Tab bar */}
      <div className="mt-auto border-t-2 border-[#00FFFF] pt-4 flex justify-between px-8 text-sm pb-4">
        <span>LDR</span>
        <span>|</span>
        <span>REC</span>
        <span>|</span>
        <span>SET</span>
      </div>
    </div>
  );
}
