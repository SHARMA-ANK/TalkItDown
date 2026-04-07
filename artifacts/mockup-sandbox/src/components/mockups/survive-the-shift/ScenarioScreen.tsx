import React from "react";

export function ScenarioScreen() {
  return (
    <div className="min-h-screen bg-[#1a1a18] p-4 flex flex-col items-center justify-center font-['Space_Mono']">
      <div className="w-full max-w-sm bg-[#f9f6ef] text-black p-1 pb-6 shadow-xl relative transform rotate-1">
        {/* Receipt edge top */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-repeat-x bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBhdGggZD0iTTAgMTBMNSAwTDEwIDEwWiIgZmlsbD0iIzFhMWExOCIvPjwvc3ZnPg==')] -mt-1"></div>

        <div className="border-4 border-black m-3 p-4">
          <div className="text-center border-b-4 border-black pb-4 mb-4">
            <h1 className="text-2xl font-bold tracking-tighter uppercase">SHIFT ASSIGNMENT</h1>
            <div className="text-sm font-bold tracking-widest mt-1">#0047</div>
          </div>

          <div className="space-y-4 text-sm">
            <div className="border-b-2 border-dashed border-gray-400 pb-2">
              <span className="text-gray-500 block text-xs uppercase mb-1">LOCATION:</span>
              <span className="font-bold">Register 4 — Mega Mart, Aisle 9</span>
            </div>

            <div className="border-b-2 border-dashed border-gray-400 pb-2">
              <span className="text-gray-500 block text-xs uppercase mb-1">CUSTOMER:</span>
              <span className="font-bold text-lg">Brenda K., 52</span>
              <span className="block text-xs mt-1 bg-black text-white inline-block px-2 py-0.5">HOA President</span>
            </div>

            <div className="border-b-2 border-dashed border-gray-400 pb-2">
              <span className="text-gray-500 block text-xs uppercase mb-1">COMPLAINT:</span>
              <span className="font-bold text-[#A32D2D]">Demanding refund on half-eaten rotisserie chicken</span>
            </div>

            <div className="border-b-2 border-dashed border-gray-400 pb-2">
              <span className="text-gray-500 block text-xs uppercase mb-1 flex justify-between">
                <span>THREAT LEVEL:</span>
                <span className="text-[#A32D2D]">●●●○○</span>
              </span>
              <span className="font-bold text-[#D4870A]">MODERATE</span>
              <span className="block text-xs mt-1 italic">— she has a rewards card and knows your manager's name</span>
            </div>

            <div className="pb-2">
              <span className="text-gray-500 block text-xs uppercase mb-1">TIME ESTIMATE:</span>
              <span className="font-bold">8-12 minutes</span>
            </div>
          </div>
        </div>

        <div className="px-3 mt-4">
          <button className="w-full bg-[#A32D2D] text-white border-4 border-black py-4 font-bold text-xl uppercase tracking-widest hover:bg-[#8B1A1A] active:translate-y-1 transition-all shadow-[4px_4px_0px_black] active:shadow-none">
            BEGIN ENCOUNTER ▶
          </button>
        </div>

        {/* Receipt edge bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-repeat-x bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBhdGggZD0iTTAgMEw1IDEwTDEwIDBaIiBmaWxsPSIjMWExYTE4Ii8+PC9zdmc+')] -mb-1"></div>
      </div>
    </div>
  );
}
