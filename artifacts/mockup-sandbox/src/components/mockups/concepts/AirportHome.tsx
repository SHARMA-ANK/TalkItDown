import React from "react";
import { ChevronRight, PlaneTakeoff, Settings, Trophy, History } from "lucide-react";

export function AirportHome() {
  return (
    <div className="min-h-screen bg-[#1a1a18] text-[#e8e4d9] font-sans flex flex-col font-['Inter'] selection:bg-[#A32D2D]/30 max-w-md mx-auto relative overflow-hidden">
      
      {/* Top Personal Stats Strip */}
      <div className="bg-[#1a1a18] border-b border-[#2e2e2a] px-4 py-2 text-[10px] font-mono tracking-widest text-[#8a8578] flex justify-between items-center z-10 relative">
        <span className="text-[#e8e4d9]">GATE AGENT: @jsmith94</span>
        <span className="flex gap-3">
          <span>FLIGHTS: 47</span>
          <span>STREAK: 3 DAYS</span>
        </span>
      </div>

      {/* Header */}
      <div className="px-4 py-6 border-b border-[#2e2e2a] flex flex-col gap-1 relative">
        <div className="flex justify-between items-baseline">
          <h1 className="text-xl font-bold tracking-widest text-[#A32D2D]">SURVIVE THE SHIFT</h1>
          <span className="font-mono text-sm tracking-widest text-[#D4870A]">TERMINAL J</span>
        </div>
        <div className="flex justify-between items-baseline">
          <h2 className="text-sm font-semibold tracking-[0.2em] text-[#8a8578]">DEPARTURE BOARD</h2>
          <span className="font-mono text-lg text-[#e8e4d9]">14:28:03</span>
        </div>
      </div>

      {/* Board Headers */}
      <div className="grid grid-cols-[3.5rem_1fr_3.5rem_4rem_1rem] gap-2 px-4 py-2 text-[9px] font-mono tracking-widest text-[#8a8578] uppercase border-b border-[#2e2e2a]">
        <div>Flight</div>
        <div>Destination</div>
        <div className="text-right">Time</div>
        <div className="text-right">Status</div>
        <div></div>
      </div>

      {/* Board Rows */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="flex flex-col text-sm text-[#1a1a18]">
          
          {/* Row 1 - Boarding */}
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-[#A32D2D] z-0"></div>
            <div className="relative z-10 grid grid-cols-[3.5rem_1fr_3.5rem_4rem_1rem] gap-2 px-4 py-4 items-center text-[#e8e4d9]">
              <div className="font-mono text-xs font-bold">STS-047</div>
              <div className="font-bold truncate text-[13px] tracking-wide uppercase">McDONALD'S DRIVE-THRU</div>
              <div className="font-mono text-xs text-right">NOW</div>
              <div className="text-[10px] font-bold px-1.5 py-0.5 bg-[#2D7A3A] text-[#f5f0e8] rounded-sm text-center whitespace-nowrap uppercase tracking-wider animate-pulse">BOARDING</div>
              <div className="flex justify-end"><ChevronRight size={14} className="opacity-50" /></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#A32D2D] to-[#A32D2D] z-20 flex items-center justify-end px-4 opacity-0 group-active:opacity-100 transition-opacity duration-200">
              <span className="font-mono text-sm font-bold text-[#e8e4d9] tracking-widest flex items-center gap-2">
                ▶ TAP TO BOARD <PlaneTakeoff size={16} />
              </span>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-[3.5rem_1fr_3.5rem_4rem_1rem] gap-2 px-4 py-3 items-center bg-[#f9f6ef] border-b border-[#e8e4d9]/50">
            <div className="font-mono text-xs font-bold text-[#8a8578]">STS-048</div>
            <div className="font-bold truncate text-[13px] tracking-wide uppercase">MEGA MART — REG. 4</div>
            <div className="font-mono text-xs text-right">14:32</div>
            <div className="text-[10px] font-bold text-[#8a8578] text-right whitespace-nowrap uppercase tracking-wider">ON TIME</div>
            <div className="flex justify-end text-[#8a8578]"><ChevronRight size={14} className="opacity-40" /></div>
          </div>

          {/* Row 3 - Boss */}
          <div className="grid grid-cols-[3.5rem_1fr_3.5rem_4rem_1rem] gap-2 px-4 py-3 items-center bg-[#f5f0e8] border-b border-[#e8e4d9]/50 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4870A]"></div>
            <div className="font-mono text-xs font-bold text-[#D4870A]">BOSS-1</div>
            <div className="font-bold truncate text-[13px] tracking-wide uppercase flex items-center gap-2">
              DEBORAH M.
              <span className="text-[8px] bg-[#1a1a18] text-[#D4870A] px-1 py-0.5 rounded-sm">FINAL BOSS</span>
            </div>
            <div className="font-mono text-xs text-right">TONIGHT</div>
            <div className="text-[10px] font-bold text-[#D4870A] text-right whitespace-nowrap uppercase tracking-wider animate-pulse">DELAYED</div>
            <div className="flex justify-end text-[#8a8578]"><ChevronRight size={14} className="opacity-40" /></div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-[3.5rem_1fr_3.5rem_4rem_1rem] gap-2 px-4 py-3 items-center bg-[#f9f6ef] border-b border-[#e8e4d9]/50">
            <div className="font-mono text-xs font-bold text-[#8a8578]">STS-049</div>
            <div className="font-bold truncate text-[13px] tracking-wide uppercase">WALMART SELF-CHECKOUT</div>
            <div className="font-mono text-xs text-right">15:10</div>
            <div className="text-[10px] font-bold text-[#8a8578] text-right whitespace-nowrap uppercase tracking-wider">ON TIME</div>
            <div className="flex justify-end text-[#8a8578]"><ChevronRight size={14} className="opacity-40" /></div>
          </div>

          {/* Row 5 - Cancelled */}
          <div className="grid grid-cols-[3.5rem_1fr_3.5rem_4rem_1rem] gap-2 px-4 py-3 items-center bg-[#f5f0e8] opacity-60">
            <div className="font-mono text-xs font-bold text-[#8a8578] line-through decoration-[#A32D2D]">STS-050</div>
            <div className="font-bold truncate text-[13px] tracking-wide uppercase text-[#8a8578] line-through decoration-[#A32D2D]">APPLEBEE'S TABLE 12</div>
            <div className="font-mono text-xs text-right text-[#8a8578] line-through decoration-[#A32D2D]">15:45</div>
            <div className="text-[10px] font-bold text-[#A32D2D] text-right whitespace-nowrap uppercase tracking-wider">CANCELLED</div>
            <div className="flex justify-end text-[#8a8578]"><ChevronRight size={14} className="opacity-20" /></div>
          </div>
          
        </div>
      </div>

      {/* Bottom Navigation styled as terminal signs */}
      <div className="absolute bottom-0 inset-x-0 bg-[#1a1a18] border-t border-[#2e2e2a] px-2 py-3 z-10">
        <div className="flex justify-between items-center bg-[#2e2e2a]/30 rounded-md p-1">
          <button className="flex-1 flex flex-col items-center gap-1 py-2 px-1 text-[#8a8578] hover:text-[#e8e4d9] transition-colors rounded-sm hover:bg-[#2e2e2a]/50">
            <Trophy size={18} strokeWidth={1.5} />
            <span className="text-[9px] font-bold tracking-widest uppercase">RANKINGS</span>
          </button>
          
          <div className="w-px h-8 bg-[#2e2e2a]"></div>
          
          <button className="flex-1 flex flex-col items-center gap-1 py-2 px-1 text-[#D4870A] bg-[#2e2e2a]/50 rounded-sm">
            <PlaneTakeoff size={18} strokeWidth={1.5} />
            <span className="text-[9px] font-bold tracking-widest uppercase">HISTORY</span>
          </button>
          
          <div className="w-px h-8 bg-[#2e2e2a]"></div>
          
          <button className="flex-1 flex flex-col items-center gap-1 py-2 px-1 text-[#8a8578] hover:text-[#e8e4d9] transition-colors rounded-sm hover:bg-[#2e2e2a]/50">
            <Settings size={18} strokeWidth={1.5} />
            <span className="text-[9px] font-bold tracking-widest uppercase">SETTINGS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
