import React, { useState, useEffect } from "react";

export function CctvGame() {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const i = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a18] text-[#e8e4d9] font-mono flex flex-col relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5 z-50" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }}></div>

      {/* Top area: Main feed + Right panel */}
      <div className="flex-1 flex gap-1 p-1 pb-0">
        
        {/* Main Feed */}
        <div className="flex-1 bg-[#1a1a18] relative flex flex-col border border-[#2e2e2a] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.5) 100%)' }}></div>
          
          <div className="flex justify-between p-2 text-[10px] text-[#A32D2D] z-10">
            <span>CAM 04 — REGISTER 4 // McDONALD'S</span>
            <span className="flex items-center gap-2">
              <span className={`text-[#A32D2D] ${blink ? 'opacity-100' : 'opacity-0'}`}>REC ●</span>
              <span>02:14</span>
            </span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center z-10 mt-[-2rem]">
            <div className="w-24 h-24 rounded-full border border-[#D4870A] flex items-center justify-center text-4xl text-[#f5f0e8] mb-4 bg-black/40">
              B
            </div>
            <div className="text-sm text-[#f5f0e8]">BRENDA K.</div>
            <div className="text-[10px] text-[#8a8578] mt-1">HOA PRESIDENT</div>
          </div>

          {/* Comms Capture */}
          <div className="bg-black/80 border-t border-[#2e2e2a] p-2 z-10 text-[10px] text-[#e8e4d9]">
            <div className="text-[#8a8578] mb-1">COMMS CAPTURE</div>
            <div className="text-[#f5f0e8]">{">> I HAVE SHOPPED HERE FOR THIRTY YEARS..."}</div>
          </div>
        </div>

        {/* Right side panel */}
        <div className="w-16 bg-[#1a1a18] border border-[#2e2e2a] flex flex-col items-center py-2 z-10">
          <div className="text-[8px] text-[#8a8578] text-center mb-4 px-1" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            THREAT LEVEL
          </div>
          
          <div className="flex-1 w-4 bg-black border border-[#2e2e2a] flex flex-col justify-end relative">
            {/* Grid lines for the meter */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 4px, #1a1a18 4px, #1a1a18 6px)' }}></div>
            <div className="w-full bg-[#D4870A]" style={{ height: '67%' }}></div>
          </div>

          <div className="text-[10px] text-[#D4870A] mt-4">67%</div>
        </div>
      </div>

      {/* Bottom controls panel */}
      <div className="h-32 bg-[#f5f0e8] border-t-2 border-[#2e2e2a] mt-1 p-4 flex flex-col justify-between z-10 text-[#1a1a18]">
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="w-16 h-16 rounded-full bg-[#1a1a18] border-4 border-[#2e2e2a] flex items-center justify-center active:scale-95 transition-transform">
              <div className="w-12 h-12 rounded-full bg-[#2e2e2a] flex items-center justify-center text-[10px] text-[#f5f0e8] font-bold">
                TX
              </div>
            </button>
            <div className="flex items-end gap-1 h-8">
              {[40, 70, 30, 90, 50, 20].map((h, i) => (
                <div key={i} className="w-1 bg-[#1a1a18]" style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <div className="text-[10px] font-bold">TRANSMIT</div>
          </div>

          <button className="h-12 px-4 bg-[#1a1a18] text-[#D4870A] border-2 border-[#D4870A] text-[10px] font-bold flex flex-col items-center justify-center">
            <span>DISPATCH MGR</span>
          </button>
        </div>

        <div className="text-[8px] text-[#8a8578] text-right">
          MANAGER POWER-UP: 1 REMAINING
        </div>

      </div>

    </div>
  );
}
