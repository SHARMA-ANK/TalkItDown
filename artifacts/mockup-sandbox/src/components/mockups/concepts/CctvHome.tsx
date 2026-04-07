import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function CctvHome() {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const i = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(i);
  }, []);

  const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="min-h-screen bg-[#1a1a18] text-[#e8e4d9] font-mono flex flex-col relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5 z-50" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }}></div>

      {/* Main 2x2 Grid */}
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-1 p-1 bg-[#2e2e2a]">
        
        {/* CAM 01 */}
        <div className="bg-[#1a1a18] relative flex flex-col border border-[#2e2e2a] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.4) 100%)' }}></div>
          <div className="flex justify-between p-1 text-[10px] text-[#A32D2D] z-10 border-b border-[#2e2e2a]">
            <span>CAM 01 — STATS</span>
            <span>{timeStr}{blink ? '_' : ' '}</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-4 text-center z-10">
            <div className="text-xs text-[#8a8578] mb-1">OPERATIVE</div>
            <div className="text-sm text-[#f5f0e8] mb-4">@jsmith94</div>
            
            <div className="text-xs text-[#8a8578] mb-1">CURRENT SCORE</div>
            <div className="text-2xl text-[#f5f0e8] mb-2">4,280</div>
            
            <div className="text-[10px] text-[#2D7A3A] px-2 py-0.5 border border-[#2D7A3A]">
              STREAK: 12
            </div>
          </div>
        </div>

        {/* CAM 02 */}
        <div className="bg-[#1a1a18] relative flex flex-col border border-[#A32D2D] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.4) 100%)' }}></div>
          <div className="flex justify-between p-1 text-[10px] text-[#A32D2D] z-10 border-b border-[#2e2e2a]">
            <span>CAM 02 — REGISTER 4</span>
            <span className="flex items-center gap-1">
              <span className={`text-[#A32D2D] ${blink ? 'opacity-100' : 'opacity-0'}`}>REC ●</span>
              <span>{timeStr}{blink ? '_' : ' '}</span>
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-2 z-10">
            <div className="w-16 h-16 rounded-full border-2 border-[#A32D2D] flex items-center justify-center text-2xl text-[#A32D2D] mb-2">
              ?
            </div>
            <div className="text-[10px] text-[#8a8578] mb-4">STANDBY — SHIFT AVAILABLE</div>
            <Button className="w-full bg-[#f5f0e8] text-[#1a1a18] hover:bg-[#e8e4d9] rounded-none h-10 font-bold text-xs">
              INITIATE START
            </Button>
          </div>
        </div>

        {/* CAM 03 */}
        <div className="bg-[#1a1a18] relative flex flex-col border border-[#2e2e2a] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.4) 100%)' }}></div>
          <div className="flex justify-between p-1 text-[10px] text-[#A32D2D] z-10 border-b border-[#2e2e2a]">
            <span>CAM 03 — DRIVE-THRU</span>
            <span>{timeStr}{blink ? '_' : ' '}</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-4 z-10">
            <div className="text-[10px] text-[#D4870A] mb-2 flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full bg-[#D4870A] ${blink ? 'opacity-100' : 'opacity-50'}`}></span>
              DAILY BOSS LIVE
            </div>
            <div className="text-sm text-[#f5f0e8] mb-1 text-center">BOSS:<br/>DEBORAH M.</div>
            <div className="text-xl text-[#A32D2D] mt-2">
              06:42:18
            </div>
          </div>
        </div>

        {/* CAM 04 */}
        <div className="bg-[#1a1a18] relative flex flex-col border border-[#2e2e2a] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.4) 100%)' }}></div>
          <div className="flex justify-between p-1 text-[10px] text-[#A32D2D] z-10 border-b border-[#2e2e2a]">
            <span>CAM 04 — LOBBY</span>
            <span>{timeStr}{blink ? '_' : ' '}</span>
          </div>
          <div className="flex-1 flex flex-col p-2 z-10 text-[9px] leading-tight">
            <div className="text-[#8a8578] mb-2 border-b border-[#2e2e2a] pb-1">INCIDENT LOG</div>
            <div className="flex justify-between mb-1 text-[#2D7A3A]">
              <span>✓ Brenda K.</span>
              <span>RESOLVED</span>
            </div>
            <div className="flex justify-between mb-1 text-[#2D7A3A]">
              <span>✓ Todd M.</span>
              <span>RESOLVED</span>
            </div>
            <div className="flex justify-between mb-1 text-[#A32D2D]">
              <span>✗ Sandra L.</span>
              <span>TERMINATED</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Control Strip */}
      <div className="h-16 bg-[#1a1a18] border-t border-[#2e2e2a] flex items-center justify-around px-2 z-10">
        <button className="text-[10px] text-[#8a8578] hover:text-[#f5f0e8] transition-colors border border-[#2e2e2a] px-4 py-2 bg-black/20">
          [ RANKINGS ]
        </button>
        <button className="text-[10px] text-[#8a8578] hover:text-[#f5f0e8] transition-colors border border-[#2e2e2a] px-4 py-2 bg-black/20">
          [ CASE FILES ]
        </button>
        <button className="text-[10px] text-[#8a8578] hover:text-[#f5f0e8] transition-colors border border-[#2e2e2a] px-4 py-2 bg-black/20">
          [ CONFIG ]
        </button>
      </div>

    </div>
  );
}
