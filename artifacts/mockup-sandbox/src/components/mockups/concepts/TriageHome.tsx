import React from "react";

export function TriageHome() {
  return (
    <div className="min-h-screen bg-[#1a1a18] text-[#1a1a18] font-mono flex flex-col">
      {/* Top Stats Strip */}
      <div className="bg-[#1a1a18] text-[#8a8578] text-[10px] p-2 flex justify-between border-b border-[#2e2e2a]">
        <span>INTAKE SPECIALIST: @jsmith94</span>
        <span>CASES RESOLVED: 47 | SURVIVAL RATE: 84%</span>
      </div>

      <div className="bg-[#1a1a18] text-[#f5f0e8] p-4 text-center border-b border-[#2e2e2a]">
        <div className="text-lg font-bold tracking-widest">PATIENT QUEUE</div>
      </div>

      {/* Cards Area */}
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
        
        {/* Card 1: Next Patient */}
        <div className="bg-[#f5f0e8] p-4 border border-[#2e2e2a] shadow-[4px_4px_0px_#2e2e2a] relative">
          <div className="absolute top-4 right-4 bg-[#A32D2D] text-[#f5f0e8] text-[10px] px-2 py-1 font-bold">
            PRIORITY: HIGH
          </div>
          <div className="text-xs text-[#8a8578] mb-1">PATIENT #0047</div>
          <div className="text-lg font-bold mb-4">BRENDA K., F/52</div>
          
          <div className="border-t border-b border-[#2e2e2a] py-2 mb-4 space-y-2">
            <div>
              <span className="text-[#8a8578] text-[10px] block">CHIEF COMPLAINT</span>
              <span className="text-sm">Demands refund on partially consumed product</span>
            </div>
            <div>
              <span className="text-[#8a8578] text-[10px] block">THREAT ASSESSMENT</span>
              <span className="text-sm text-[#A32D2D] font-bold">●●●○○ (MODERATE)</span>
            </div>
            <div>
              <span className="text-[#8a8578] text-[10px] block">EST. TREATMENT TIME</span>
              <span className="text-sm">8-12 min</span>
            </div>
          </div>

          <button className="w-full bg-[#A32D2D] text-[#f5f0e8] py-3 font-bold flex justify-center items-center gap-2 hover:bg-[#8a2525] transition-colors">
            BEGIN INTAKE <span className="text-xl leading-none">→</span>
          </button>
        </div>

        {/* Card 2: Queued */}
        <div className="bg-[#f9f6ef] p-3 border border-[#2e2e2a] shadow-[2px_2px_0px_#2e2e2a] relative">
          <div className="absolute top-3 right-3 bg-[#D4870A] text-[#1a1a18] text-[10px] px-2 py-1 font-bold">
            PRIORITY: MED
          </div>
          <div className="text-[10px] text-[#8a8578] mb-1">PATIENT #0048</div>
          <div className="font-bold mb-2">TODD H., M/44</div>
          <div className="text-xs text-[#8a8578]">CHIEF COMPLAINT: Wrong order, claims discrimination</div>
        </div>

        {/* Card 3: Daily Boss */}
        <div className="bg-[#1a1a18] border-2 border-[#D4870A] p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2">
            <div className="w-4 h-4 relative">
              <div className="absolute inset-0 bg-[#D4870A] rounded-full opacity-20 animate-ping"></div>
              <div className="absolute inset-1 bg-[#D4870A] rounded-full"></div>
            </div>
          </div>
          <div className="text-[10px] text-[#D4870A] mb-1">DAILY CRITICAL PATIENT</div>
          <div className="text-[#f5f0e8] font-bold text-lg mb-2">BOSS CASE — DEBORAH M.</div>
          <div className="text-xs text-[#8a8578] mb-4">7,432 CASES ATTEMPTED</div>
          <div className="text-sm text-[#D4870A] font-bold">NEW PATIENT IN 06:42:18</div>
        </div>

      </div>

      {/* Bottom Tab Bar */}
      <div className="bg-[#1a1a18] border-t border-[#2e2e2a] flex text-[#8a8578] text-[10px] font-bold">
        <button className="flex-1 py-4 border-r border-[#2e2e2a] hover:text-[#f5f0e8] transition-colors">
          WARD RANKINGS
        </button>
        <button className="flex-1 py-4 border-r border-[#2e2e2a] hover:text-[#f5f0e8] transition-colors">
          CASE FILES
        </button>
        <button className="flex-1 py-4 hover:text-[#f5f0e8] transition-colors">
          SETTINGS
        </button>
      </div>

    </div>
  );
}
