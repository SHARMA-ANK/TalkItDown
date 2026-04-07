import React from "react";

export function LoseScreen() {
  return (
    <div className="min-h-screen bg-[#2c1212] p-4 flex flex-col items-center justify-center font-['Space_Mono'] relative">
      {/* Red vignette overlay */}
      <div className="absolute inset-0 bg-[#A32D2D] opacity-10 pointer-events-none"></div>

      <div className="w-full max-w-sm bg-[#f9f6ef] text-black p-6 pb-8 shadow-2xl relative overflow-hidden flex flex-col transform rotate-1">
        {/* Receipt edges */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-repeat-x bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBhdGggZD0iTTAgMTBMNSAwTDEwIDEwWiIgZmlsbD0iIzJjMTIxMiIvPjwvc3ZnPg==')] -mt-1"></div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-repeat-x bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBhdGggZD0iTTAgMEw1IDEwTDEwIDBaIiBmaWxsPSIjMmMxMjEyIi8+PC9zdmc+')] -mb-1"></div>

        {/* TERMINATED Stamp Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="text-4xl font-black border-8 border-[#A32D2D] text-[#A32D2D] px-6 py-2 transform -rotate-15 tracking-tighter bg-white/80 mix-blend-multiply shadow-sm">
            TERMINATED
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col items-center mb-6 pt-4 z-10 relative">
          <h1 className="text-2xl font-bold tracking-tighter uppercase text-center text-[#A32D2D]">INCIDENT REPORT</h1>
        </div>

        {/* Receipt Content */}
        <div className="text-xs leading-relaxed space-y-1 z-10 relative opacity-80">
          <div className="whitespace-pre overflow-x-hidden text-gray-800 font-bold">
{`SURVIVE THE SHIFT
================================
Employee:     @jsmith94
Status:       TERMINATED
Location:     Register 4
Incident:     Customer escalation
Fired for:    "maybe just chill out"
================================
VERDICT: Unacceptable.
================================`}
          </div>
        </div>

        <div className="mt-12 space-y-3 z-30 relative">
          <button className="w-full bg-[#1a1a18] text-white border-2 border-black py-3 font-bold text-sm uppercase tracking-widest hover:bg-black transition-colors shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
            FILE FOR UNEMPLOYMENT
          </button>
          <button className="w-full bg-transparent text-gray-500 py-3 font-bold text-xs uppercase tracking-widest hover:text-black transition-colors underline decoration-dotted">
            ACCEPT DEFEAT
          </button>
        </div>
      </div>
    </div>
  );
}
