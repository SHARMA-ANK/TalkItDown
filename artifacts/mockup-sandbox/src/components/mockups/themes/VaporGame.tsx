import React from 'react';

export function VaporGame() {
  return (
    <div className="min-h-screen bg-[#1a0a2e] text-[#C4A8FF] font-sans relative flex flex-col">
      {/* Retro Grid Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-50"
        style={{
          background: `
            linear-gradient(transparent 65%, #1a0a2e 100%),
            linear-gradient(90deg, rgba(255, 105, 180, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(255, 105, 180, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
        }}
      />

      <div className="relative z-10 flex flex-col flex-1 p-6">
        {/* Status Bar */}
        <div className="flex justify-between items-center mb-8 font-['Righteous']">
          <span className="text-[#00CED1] tracking-widest text-sm" style={{ textShadow: '0 0 5px rgba(0, 206, 209, 0.5)' }}>McDONALD'S</span>
          <span className="text-[#FF69B4] tracking-widest text-xl" style={{ textShadow: '0 0 8px rgba(255, 105, 180, 0.8)' }}>02:14</span>
        </div>

        {/* Rage Meter */}
        <div className="mb-8">
          <div className="h-4 rounded-full bg-[#2d1854] border border-[#FF69B4]/30 overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full rounded-full"
              style={{
                width: '67%',
                background: 'linear-gradient(90deg, #00CED1 0%, #FF69B4 70%, #ff3366 100%)',
                boxShadow: '0 0 10px rgba(255, 105, 180, 0.8)'
              }}
            />
          </div>
        </div>

        {/* Customer Avatar & Speech Bubble */}
        <div className="flex-1 flex flex-col justify-center items-center gap-6">
          <div className="bg-[#2d1854] rounded-2xl p-6 w-full max-w-sm border border-[#FF69B4]/40 shadow-[0_0_20px_rgba(255,105,180,0.25)] flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-2 border-[#FF69B4] flex items-center justify-center mb-4 bg-gradient-to-br from-[#2d1854] to-[#1a0a2e] shadow-[0_0_15px_rgba(255,105,180,0.5)]">
              <span className="text-4xl font-['Righteous'] text-[#C0C0C0]" style={{ textShadow: '0 0 10px rgba(192, 192, 192, 0.5)' }}>B</span>
            </div>
            <h3 className="font-['Righteous'] text-2xl text-[#C4A8FF] tracking-wider text-center">BRENDA K.</h3>
            <p className="text-[#00CED1] text-sm tracking-widest mt-1 font-['Righteous'] uppercase">HOA President</p>
          </div>

          <div className="bg-[#381e69] p-5 rounded-2xl w-full max-w-sm border border-[#C4A8FF]/20 relative shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#381e69] rotate-45 border-t border-l border-[#C4A8FF]/20"></div>
            <p className="font-mono text-[#C4A8FF] text-lg leading-relaxed relative z-10">
              "I have shopped here for thirty years and I WILL NOT be spoken to like this."
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-12 mb-6 flex justify-between items-end">
          <button className="bg-transparent border border-[#00CED1] text-[#FF69B4] px-4 py-3 rounded-lg font-['Righteous'] text-sm tracking-widest shadow-[0_0_10px_rgba(0,206,209,0.2)] hover:bg-[#00CED1]/10 transition-colors uppercase">
            Call Manager
          </button>
          
          <button className="w-20 h-20 rounded-full bg-[#FF69B4] flex items-center justify-center shadow-[0_0_30px_rgba(255,105,180,0.8)] border-4 border-[#1a0a2e]">
            <span className="text-white text-3xl">⏺</span>
          </button>
          
          <div className="w-32"></div> {/* Spacer for balance */}
        </div>
      </div>
    </div>
  );
}
