import React from "react";

export function WinScreen() {
  return (
    <div className="min-h-screen bg-[#1a1a18] p-4 flex flex-col items-center justify-center font-['Space_Mono']">
      <div className="w-full max-w-sm bg-[#f9f6ef] text-black p-6 pb-8 shadow-2xl relative overflow-hidden flex flex-col">
        {/* Receipt edges */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-repeat-x bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBhdGggZD0iTTAgMTBMNSAwTDEwIDEwWiIgZmlsbD0iIzFhMWExOCIvPjwvc3ZnPg==')] -mt-1"></div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-repeat-x bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBhdGggZD0iTTAgMEw1IDEwTDEwIDBaIiBmaWxsPSIjMWExYTE4Ii8+PC9zdmc+')] -mb-1"></div>

        {/* Header */}
        <div className="flex flex-col items-center mb-6 pt-4">
          <div className="w-16 h-16 border-4 border-[#2D7A3A] rounded-full flex items-center justify-center text-[#2D7A3A] text-4xl mb-4 transform -rotate-12">
            ✓
          </div>
          <h1 className="text-xl font-bold tracking-tighter uppercase text-center">CUSTOMER<br/>DE-ESCALATED</h1>
        </div>

        {/* Receipt Content */}
        <div className="text-xs leading-relaxed space-y-1 relative">
          {/* APPROVED Stamp */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 z-0">
            <div className="text-4xl font-bold border-8 border-[#2D7A3A] text-[#2D7A3A] px-4 py-2 transform -rotate-12 tracking-widest rounded-lg">
              APPROVED
            </div>
          </div>

          <div className="whitespace-pre overflow-x-hidden text-gray-800 font-bold z-10 relative">
{`SURVIVE THE SHIFT
================================
Employee:     @jsmith94
Customer:     Brenda K.  
Location:     Register 4
Complaint:    Rotisserie chicken refund
Time:         2 min 14 sec
Rage peak:    84%
Manager used: No
Score earned: +340 pts
================================
VERDICT: Professional. Barely.
================================`}
          </div>
        </div>

        <div className="mt-8 space-y-3 z-10 relative">
          <button className="w-full bg-transparent border-2 border-black text-black py-3 font-bold text-sm uppercase tracking-widest hover:bg-gray-100 transition-colors">
            SHARE RECEIPT
          </button>
          <button className="w-full bg-[#A32D2D] text-white border-2 border-[#A32D2D] py-3 font-bold text-sm uppercase tracking-widest shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all">
            NEXT SHIFT &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
