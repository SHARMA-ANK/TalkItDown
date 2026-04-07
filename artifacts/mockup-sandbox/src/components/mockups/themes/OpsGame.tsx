import React from 'react';

export function OpsGame() {
  return (
    <div className="min-h-screen bg-[#0a0c0a] text-[#8B9B6B] font-['Share_Tech_Mono'] font-mono relative flex flex-col">
      {/* Scanline Overlay */}
      <div 
        className="absolute inset-0 z-50 pointer-events-none opacity-10"
        style={{
          background: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.06), rgba(0, 0, 255, 0.06))`,
          backgroundSize: '100% 4px, 3px 100%'
        }}
      />

      <div className="relative z-10 flex flex-col flex-1 p-4">
        {/* Status Bar Strip */}
        <div className="flex justify-between items-center border border-[#4A7C59] bg-[#4A7C59]/10 px-2 py-1 mb-6 text-xs">
          <span className="text-[#00FF41] uppercase">[LOCATION: DRIVE-THRU // McDONALD'S]</span>
          <div className="flex items-center gap-4">
            <span className="text-[#FFA500] text-lg">02:14</span>
            <button className="border border-[#FFA500] text-[#FFA500] px-2 py-0.5 animate-pulse uppercase">MGR</button>
          </div>
        </div>

        {/* Rage Meter (Threat Level) */}
        <div className="mb-8">
          <p className="text-[#8B9B6B] text-xs uppercase mb-1">THREAT LEVEL: <span className="text-[#FFA500]">ELEVATED (67%)</span></p>
          <div className="flex gap-1 h-6 border border-[#4A7C59] p-1 bg-[#0a0c0a]">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i} 
                className={`flex-1 ${
                  i < 4 ? 'bg-[#00FF41]' : 
                  i < 7 ? 'bg-[#FFA500]' : 
                  i < 7 ? 'bg-[#CC2200]' : 'bg-[#4A7C59]/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Customer Avatar & Speech Bubble */}
        <div className="flex-1 flex flex-col gap-6 mt-4">
          <div className="border border-[#00FF41] p-1 bg-[#0a0c0a]">
            <div className="border border-[#4A7C59] p-4 flex gap-4 items-center relative">
              <span className="absolute top-0 left-0 bg-[#CC2200] text-[#0a0c0a] text-[10px] px-1 font-bold">TARGET</span>
              <div className="w-16 h-16 border border-[#00FF41] flex items-center justify-center bg-[#00FF41]/10 shrink-0">
                <span className="text-3xl text-[#00FF41]">B</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[#00FF41] text-lg uppercase">BRENDA K. // HOA PRESIDENT</h3>
                <p className="text-[#8B9B6B] text-xs uppercase">Class: Alpha-Karen // Status: Hostile</p>
              </div>
            </div>
          </div>

          <div className="border border-[#4A7C59] bg-[#0a0c0a] relative mt-4">
            <div className="absolute -top-3 left-4 bg-[#0a0c0a] px-2 text-[#8B9B6B] text-xs border border-[#4A7C59]">COMMS INTERCEPT</div>
            <div className="p-4 pt-6">
              <p className="text-[#00FF41] text-sm uppercase leading-relaxed">
                "I HAVE SHOPPED HERE FOR THIRTY YEARS AND I WILL NOT BE SPOKEN TO LIKE THIS!!"
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-12 mb-6 flex flex-col gap-4">
          <button className="w-full bg-[#00FF41]/10 border-2 border-[#00FF41] text-[#00FF41] py-4 text-lg uppercase tracking-widest hover:bg-[#00FF41]/20 transition-colors">
            [ TRANSMIT ]
          </button>
          
          <button className="w-full bg-transparent border border-[#CC2200] text-[#CC2200] py-3 text-sm uppercase tracking-widest hover:bg-[#CC2200]/10 transition-colors">
            [!! DISPATCH BACKUP !!]
          </button>
        </div>
      </div>
    </div>
  );
}
