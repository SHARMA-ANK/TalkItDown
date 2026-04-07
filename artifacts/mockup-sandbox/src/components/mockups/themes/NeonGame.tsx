import React from 'react';

export function NeonGame() {
  return (
    <div className="min-h-screen bg-black text-[#00FFFF] font-['Space_Mono',monospace] p-4 flex flex-col relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, #000 2px, #000 4px)' }}></div>
      
      {/* Status Bar */}
      <div className="flex justify-between items-center mb-8 text-sm" style={{ textShadow: '0 0 5px #00FFFF' }}>
        <span>LOC: DRIVE-THRU // McDONALD'S</span>
        <span className="animate-pulse">02:14</span>
      </div>

      {/* Rage Meter */}
      <div className="mb-12">
        <div className="flex justify-between text-xs mb-2">
          <span>[ KAREN RAGE: 67% ]</span>
        </div>
        <div className="h-6 border-2 border-[#00FFFF] p-1 flex gap-1">
          {/* 67% fill with segmented blocks */}
          {Array.from({ length: 20 }).map((_, i) => {
            const isActive = i < 13;
            let color = '#ADFF2F'; // green
            if (i > 9) color = '#FFA500'; // amber
            if (i > 15) color = '#FF0000'; // red
            
            return (
              <div 
                key={i} 
                className="flex-1 h-full"
                style={{ backgroundColor: isActive ? color : 'transparent', boxShadow: isActive ? `0 0 5px ${color}` : 'none' }}
              />
            );
          })}
        </div>
      </div>

      {/* Customer Avatar */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 border-4 border-[#FF00FF] flex items-center justify-center mb-4 bg-black" style={{ boxShadow: '4px 4px 0 0 #FF00FF' }}>
          <span className="text-6xl text-[#FF00FF]" style={{ textShadow: '0 0 10px #FF00FF' }}>B</span>
        </div>
        <div className="text-center">
          <h2 className="text-xl mb-1 text-[#00FFFF]">&gt;&gt; BRENDA K. &lt;&lt;</h2>
          <p className="text-xs text-[#FF00FF]">HOA PRESIDENT</p>
        </div>
      </div>

      {/* Speech Bubble */}
      <div className="border-2 border-[#00FFFF] bg-[#111111] p-4 mb-auto relative" style={{ boxShadow: '4px 4px 0 0 #00FFFF' }}>
        <p className="text-white text-lg leading-relaxed">
          I HAVE SHOPPED HERE FOR THIRTY YEARS!!
        </p>
      </div>

      {/* Controls */}
      <div className="mt-12 flex flex-col items-center gap-8 pb-8">
        <button className="w-24 h-24 rounded-full border-4 border-[#00FFFF] flex items-center justify-center relative animate-[pulse_2s_infinite]" style={{ boxShadow: '0 0 20px #00FFFF, inset 0 0 20px #00FFFF' }}>
          <div className="w-16 h-16 rounded-full border-2 border-[#00FFFF] flex items-center justify-center">
            <span className="text-xs">MIC</span>
          </div>
        </button>

        <button className="w-full py-4 text-lg border-2 border-[#FF00FF] text-[#FFA500] bg-black hover:bg-[#FF00FF] hover:text-black transition-all" style={{ boxShadow: '0 0 15px #FF00FF' }}>
          [ !! CALL MANAGER !! ]
        </button>
      </div>
    </div>
  );
}
