import React from 'react';

export function OpsHome() {
  return (
    <div className="min-h-screen bg-[#0a0c0a] text-[#8B9B6B] font-['Share_Tech_Mono'] font-mono relative overflow-hidden flex flex-col">
      {/* Scanline Overlay */}
      <div 
        className="absolute inset-0 z-50 pointer-events-none opacity-10"
        style={{
          background: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))`,
          backgroundSize: '100% 4px, 3px 100%'
        }}
      />

      <div className="relative z-10 flex flex-col flex-1 p-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center border-b border-[#4A7C59]/30 pb-2 mb-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#00FF41] animate-pulse">●</span>
            <span className="text-[#00FF41]">SYSTEM ACTIVE</span>
          </div>
          <span>14:32:45Z</span>
        </div>

        {/* Header */}
        <div className="mb-10 relative">
          <p className="text-[#00FF41] text-sm mb-1 uppercase tracking-wider">Field Operations Terminal</p>
          <h1 className="text-2xl text-[#8B9B6B] uppercase tracking-widest border-l-4 border-[#4A7C59] pl-3">
            Customer<br/>De-Escalation<br/>Unit
          </h1>
          <div className="absolute top-0 right-0 border-2 border-[#CC2200] text-[#CC2200] px-2 py-1 transform rotate-[15deg] font-bold text-xs opacity-80">
            CLASSIFIED //<br/>TOP SECRET
          </div>
        </div>

        {/* Player Card */}
        <div className="border-2 border-[#4A7C59] p-1 mb-10 bg-[#0a0c0a]">
          <div className="border border-[#4A7C59] p-4 flex flex-col gap-2 uppercase tracking-wide">
            <div className="flex justify-between border-b border-[#4A7C59]/30 pb-2 mb-2">
              <span className="text-[#8B9B6B]">Operative:</span>
              <span className="text-[#00FF41]">@JSMITH94</span>
            </div>
            <div className="flex justify-between border-b border-[#4A7C59]/30 pb-2 mb-2">
              <span className="text-[#8B9B6B]">Clearance:</span>
              <span className="text-[#00FF41]">LEVEL 3</span>
            </div>
            <div className="flex justify-between border-b border-[#4A7C59]/30 pb-2 mb-2">
              <span className="text-[#8B9B6B]">Threat Neutralizations:</span>
              <span className="text-[#00FF41] text-xl">4,280</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8B9B6B]">Active Streak:</span>
              <span className="text-[#00FF41]">3 DAYS</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-6 mt-auto mb-10">
          <button className="w-full bg-transparent border-2 border-[#00FF41] text-[#00FF41] py-4 uppercase tracking-widest hover:bg-[#00FF41]/10 transition-colors">
            [ INITIATE MISSION ]
          </button>
          
          <button className="w-full bg-transparent border-2 border-[#FFA500] text-[#FFA500] py-4 uppercase tracking-widest hover:bg-[#FFA500]/10 transition-colors">
            [ BOSS ENCOUNTER ]
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#4A7C59] p-3 relative z-10 bg-[#0a0c0a]">
        <div className="flex justify-between text-xs tracking-widest text-[#8B9B6B]">
          <button className="text-[#00FF41] hover:text-[#00FF41] transition-colors">COMMAND</button>
          <span>|</span>
          <button className="hover:text-[#00FF41] transition-colors">RECORDS</button>
          <span>|</span>
          <button className="hover:text-[#00FF41] transition-colors">CONFIG</button>
        </div>
      </div>
    </div>
  );
}
