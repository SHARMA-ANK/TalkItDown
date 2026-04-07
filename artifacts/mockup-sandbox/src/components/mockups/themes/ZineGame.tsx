import React from 'react';

export function ZineGame() {
  return (
    <div className="min-h-screen bg-white text-black font-['Impact',sans-serif] p-6 flex flex-col relative">
      {/* Status Bar */}
      <div className="flex justify-between items-start mb-8 border-b-4 border-black pb-2">
        <h1 className="text-4xl tracking-tighter uppercase transform -rotate-1">McDONALD'S</h1>
        <span className="text-3xl text-[#FF3333]">02:14</span>
      </div>

      {/* Rage Meter */}
      <div className="mb-10 relative">
        <div className="flex items-end gap-2 mb-1">
          <span className="text-xs font-mono uppercase font-bold tracking-widest">RAGE</span>
          <span className="text-3xl leading-none">67%</span>
        </div>
        <div className="h-10 border-4 border-black p-1 w-full bg-white relative overflow-hidden">
          <div className="h-full bg-[#FF3333] w-[67%] absolute top-0 left-0" />
        </div>
      </div>

      {/* Customer Avatar */}
      <div className="flex flex-col items-center mb-10 z-10 relative">
        <div className="w-32 h-32 border-8 border-black flex items-center justify-center bg-white transform rotate-3 mb-2">
          <span className="text-8xl">B</span>
        </div>
        <div className="text-center bg-black text-white px-4 py-1 transform -rotate-1">
          <h2 className="text-2xl uppercase tracking-widest">BRENDA K.</h2>
        </div>
        <p className="text-sm font-serif italic mt-2 font-bold">HOA PRESIDENT</p>
      </div>

      {/* Speech Bubble */}
      <div className="border-4 border-black p-6 bg-white relative z-0 -mt-6">
        <p className="text-xl font-serif italic font-bold leading-tight">
          I have shopped here for THIRTY YEARS.
        </p>
      </div>

      {/* Controls */}
      <div className="mt-auto flex justify-between items-end pb-4 pt-12">
        <button className="w-24 h-24 rounded-full border-4 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors bg-white">
          <span className="text-2xl tracking-tighter">REC</span>
        </button>

        <button className="py-4 px-6 text-2xl border-4 border-black bg-[#FF3333] text-black uppercase tracking-tighter hover:bg-black hover:text-white transition-colors transform rotate-2">
          MANAGER /
        </button>
      </div>
    </div>
  );
}
