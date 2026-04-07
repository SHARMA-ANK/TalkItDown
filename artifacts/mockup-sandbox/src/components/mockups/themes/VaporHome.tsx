import React from 'react';

export function VaporHome() {
  return (
    <div className="min-h-screen bg-[#1a0a2e] text-[#C4A8FF] font-sans relative overflow-hidden flex flex-col">
      {/* Retro Grid Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(transparent 65%, #1a0a2e 100%),
            linear-gradient(90deg, rgba(255, 105, 180, 0.15) 1px, transparent 1px),
            linear-gradient(rgba(255, 105, 180, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
          transform: 'perspective(500px) rotateX(60deg) translateY(100px) scale(2)',
          transformOrigin: 'bottom'
        }}
      />

      <div className="relative z-10 flex flex-col flex-1 p-6">
        {/* Header */}
        <div className="text-center mt-8 mb-12">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-[#00CED1] text-xl">✦</span>
            <h1 className="font-['Righteous'] text-5xl tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] to-[#C0C0C0]"
                style={{ WebkitTextStroke: '1px #FF69B4', filter: 'drop-shadow(0 0 8px rgba(255, 105, 180, 0.6))' }}>
              SURVIVE
            </h1>
            <span className="text-[#00CED1] text-xl">✦</span>
          </div>
          <h2 className="font-['Righteous'] text-2xl tracking-[0.3em] text-[#00CED1] uppercase"
              style={{ textShadow: '0 0 5px rgba(0, 206, 209, 0.5)' }}>
            The Shift
          </h2>
        </div>

        {/* Player Card */}
        <div className="bg-[#2d1854] rounded-2xl p-6 mb-8 relative border border-[#FF69B4]/30 shadow-[0_0_15px_rgba(255,105,180,0.2)]">
          <div className="text-center">
            <p className="text-[#C4A8FF] tracking-wider mb-2 font-['Righteous']">@NIGHT_CLERK</p>
            <p className="text-5xl font-['Righteous'] text-[#FF69B4]" style={{ textShadow: '0 0 10px rgba(255,105,180,0.5)' }}>4,280</p>
            <p className="text-[#00CED1] text-xs uppercase tracking-widest mt-2">Total Score</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 mt-auto mb-12">
          <div className="text-center mb-2">
            <span className="text-[#C0C0C0] text-sm tracking-widest font-['Righteous'] uppercase"
                  style={{ textShadow: '0 0 5px rgba(192,192,192,0.5)' }}>
              ✦ 3-DAY STREAK ✦
            </span>
          </div>
          
          <button className="w-full bg-[#FF69B4] text-white py-4 rounded-xl font-['Righteous'] text-xl tracking-widest uppercase shadow-[0_0_20px_rgba(255,105,180,0.6)] hover:bg-[#ff85c6] transition-colors">
            Start Shift
          </button>
          
          <button className="w-full bg-transparent border-2 border-[#00CED1] text-[#00CED1] py-4 rounded-xl font-['Righteous'] text-lg tracking-widest uppercase shadow-[inset_0_0_10px_rgba(0,206,209,0.3),0_0_10px_rgba(0,206,209,0.3)] hover:bg-[#00CED1]/10 transition-colors">
            Daily Boss Fight
          </button>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-[#1a0a2e]/90 backdrop-blur border-t border-[#FF69B4]/30 p-4 relative z-10">
        <div className="flex justify-around items-center font-['Righteous'] tracking-wider text-sm">
          <button className="text-[#FF69B4] flex flex-col items-center gap-1">
            <span>SHIFT</span>
            <div className="w-1/2 h-0.5 bg-[#FF69B4] rounded-full shadow-[0_0_5px_rgba(255,105,180,1)]"></div>
          </button>
          <button className="text-[#C4A8FF] hover:text-[#FF69B4] transition-colors">RECORDS</button>
          <button className="text-[#C4A8FF] hover:text-[#FF69B4] transition-colors">GEAR</button>
        </div>
      </div>
    </div>
  );
}
