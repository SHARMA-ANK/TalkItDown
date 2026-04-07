import React from "react";

export function TriageGame() {
  return (
    <div className="min-h-screen bg-[#1a1a18] text-[#e8e4d9] font-mono flex flex-col">
      
      {/* Header Strip */}
      <div className="bg-[#1a1a18] border-b border-[#2e2e2a] p-3 flex justify-between items-center text-[10px]">
        <div>
          <div className="text-[#8a8578]">CASE #0047 // McDONALD'S DRIVE-THRU</div>
          <div className="text-[#f5f0e8] font-bold mt-1">PATIENT: BRENDA K.</div>
        </div>
        <div className="text-right">
          <div className="text-[#8a8578]">ELAPSED</div>
          <div className="text-[#f5f0e8] font-bold text-sm">02:14</div>
        </div>
      </div>

      <div className="p-2 flex justify-end bg-[#1a1a18]">
         <div className="bg-[#D4870A] text-[#1a1a18] text-[10px] px-2 py-1 font-bold rounded-sm">
            CONSULT SPECIALIST AVAILABLE
         </div>
      </div>

      {/* Vital Signs Monitor */}
      <div className="bg-[#f5f0e8] text-[#1a1a18] p-4 m-4 mb-2 border border-[#2e2e2a] shadow-[4px_4px_0px_#2e2e2a]">
        <div className="text-[10px] text-[#A32D2D] font-bold mb-4">VITAL SIGNS — LIVE</div>
        
        <div className="mb-2 flex justify-between text-[10px] text-[#8a8578] font-bold">
          <span>STABLE</span>
          <span>CRITICAL</span>
        </div>
        
        <div className="h-4 bg-[#e8e4d9] border border-[#2e2e2a] relative mb-2 overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 bg-[#D4870A] border-r border-[#2e2e2a]" style={{ width: '67%' }}></div>
        </div>

        {/* EKG line simulation */}
        <div className="h-8 border-b border-[#2e2e2a] relative overflow-hidden mb-4 opacity-50">
          <div className="absolute inset-0 flex items-center">
             <div className="w-full h-[1px] bg-[#D4870A]"></div>
          </div>
        </div>

        <div className="text-[10px] font-bold border-t border-[#2e2e2a] pt-2">
          AGITATION: <span className="text-[#D4870A]">67% — ELEVATED.</span> Monitor closely.
        </div>
      </div>

      {/* Patient File Card */}
      <div className="bg-[#f9f6ef] text-[#1a1a18] p-4 m-4 mt-2 border border-[#2e2e2a] shadow-[4px_4px_0px_#2e2e2a] flex-1">
        <div className="text-[10px] text-[#8a8578] font-bold mb-4 border-b border-[#2e2e2a] pb-2">PATIENT FILE</div>
        
        <div className="flex gap-4 items-center mb-6">
          <div className="w-16 h-16 rounded-full border-4 border-[#D4870A] flex items-center justify-center text-2xl font-bold text-[#1a1a18] bg-[#e8e4d9]">
            B
          </div>
          <div>
            <div className="text-xl font-bold">BRENDA K.</div>
            <div className="text-xs text-[#8a8578]">HOA President / Coupon Collector</div>
          </div>
        </div>

        <div className="border-l-4 border-[#2e2e2a] pl-4 py-1">
          <div className="text-[10px] text-[#8a8578] mb-1 font-bold">PATIENT STATEMENT</div>
          <div className="italic text-sm">
            "I HAVE SHOPPED HERE FOR THIRTY YEARS AND I WILL NOT BE SPOKEN TO LIKE THIS!!"
          </div>
        </div>
      </div>

      {/* Treatment Controls */}
      <div className="bg-[#1a1a18] border-t border-[#2e2e2a] p-4 mt-auto">
        <div className="flex gap-4 items-center mb-4">
          <button className="w-16 h-16 rounded-full bg-[#f5f0e8] border-2 border-[#2e2e2a] flex items-center justify-center active:scale-95 transition-transform text-[#1a1a18]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" x2="12" y1="19" y2="22"></line>
            </svg>
          </button>
          
          <div className="flex-1">
            <div className="text-[10px] text-[#8a8578] mb-2 font-bold">RESPOND TO PATIENT</div>
            <div className="flex items-center gap-1 h-6">
              {[30, 60, 40, 80, 50].map((h, i) => (
                <div key={i} className="flex-1 bg-[#2D7A3A]" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>
        </div>

        <button className="w-full bg-[#1a1a18] text-[#D4870A] border border-[#D4870A] py-3 text-xs font-bold hover:bg-[#D4870A] hover:text-[#1a1a18] transition-colors">
          REQUEST SPECIALIST CONSULT — 1 USE
        </button>
      </div>

    </div>
  );
}
