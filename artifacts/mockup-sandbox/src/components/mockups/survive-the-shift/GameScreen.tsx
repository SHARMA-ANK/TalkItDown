import React, { useEffect, useState } from "react";
import { Mic, ShieldAlert } from "lucide-react";

export function GameScreen() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a18] flex flex-col font-['Inter']">
      {/* A. Status bar strip */}
      <div className="bg-[#2a2a28] border-b border-[#3a3a38] p-3 flex justify-between items-center text-[#e8e4d9]">
        <div className="bg-black px-2 py-1 text-[10px] uppercase font-bold tracking-widest text-gray-400 border border-gray-700">
          DRIVE-THRU — McDONALD'S
        </div>
        <div className="font-['Space_Mono'] font-bold text-xl text-white">
          2:14
        </div>
        <button className={`bg-[#1a1a18] border-2 ${pulse ? 'border-[#D4870A]' : 'border-gray-600'} text-[#D4870A] px-3 py-1 text-xs font-bold font-['Space_Mono'] flex items-center gap-1 transition-colors duration-500`}>
          MGR <span className="bg-[#D4870A] text-black px-1 text-[10px]">1×</span>
        </button>
      </div>

      {/* B. Rage meter */}
      <div className="p-4 bg-[#111110]">
        <div className="flex justify-between font-['Space_Mono'] text-xs font-bold mb-2">
          <span className="text-[#2D7A3A]">CALM</span>
          <span className="text-[#e8e4d9]">RAGE: 67%</span>
          <span className="text-[#A32D2D]">FIRED</span>
        </div>
        <div className="h-6 w-full bg-black border-2 border-gray-700 p-0.5">
          <div className="h-full bg-[#D4870A] w-[67%] relative overflow-hidden">
            {/* Striped overlay */}
            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)]"></div>
          </div>
        </div>
      </div>

      {/* C. Customer avatar zone */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <div className={`w-full max-w-[280px] bg-[#f5f0e8] p-6 border-4 ${pulse ? 'border-[#D4870A]' : 'border-[#b57308]'} shadow-[8px_8px_0px_rgba(212,135,10,0.2)] transition-colors duration-300 relative flex flex-col items-center`}>
          <div className="w-24 h-24 rounded-full bg-[#e8e4d9] border-4 border-black flex items-center justify-center mb-4 shadow-inner">
            <span className="font-bold text-5xl text-[#8B4513] font-['Space_Mono']">B</span>
          </div>
          <h2 className="text-2xl font-bold font-['Space_Mono'] text-black tracking-tighter">BRENDA K.</h2>
          <div className="bg-black text-white text-[10px] uppercase tracking-widest px-2 py-1 mt-2">
            HOA PRESIDENT / COUPON COLLECTOR
          </div>
        </div>

        {/* Speech Bubble */}
        <div className="w-full max-w-[300px] mt-6 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#f9f6ef] transform rotate-45 border-t-2 border-l-2 border-gray-300"></div>
          <div className="bg-[#f9f6ef] border-2 border-gray-300 p-4 text-black font-['Space_Mono'] font-bold text-sm leading-tight uppercase shadow-lg">
            "I HAVE SHOPPED HERE FOR THIRTY YEARS AND I WILL NOT BE SPOKEN TO LIKE THIS!!"
          </div>
        </div>
      </div>

      {/* D. Player controls */}
      <div className="bg-[#111110] border-t border-[#3a3a38] p-6 flex flex-col items-center pb-8">
        <div className="text-center h-6 mb-4">
          <span className="font-['Space_Mono'] text-xs text-gray-500 animate-pulse">Listening...</span>
        </div>
        
        <div className="relative flex items-center justify-center w-full mb-6">
          <div className="absolute flex items-center gap-1 left-4">
            <div className="w-1 h-4 bg-gray-600 animate-[pulse_1s_ease-in-out_infinite]"></div>
            <div className="w-1 h-8 bg-gray-500 animate-[pulse_1.2s_ease-in-out_infinite]"></div>
          </div>
          
          <button className="w-20 h-20 bg-[#A32D2D] rounded-full flex items-center justify-center border-4 border-[#8B1A1A] shadow-[0_0_20px_rgba(163,45,45,0.4)] active:scale-95 transition-transform z-10">
            <Mic className="w-8 h-8 text-white" />
          </button>
          
          <div className="absolute flex items-center gap-1 right-4">
            <div className="w-1 h-6 bg-gray-500 animate-[pulse_0.9s_ease-in-out_infinite]"></div>
            <div className="w-1 h-3 bg-gray-600 animate-[pulse_1.1s_ease-in-out_infinite]"></div>
            <div className="w-1 h-5 bg-gray-500 animate-[pulse_1.3s_ease-in-out_infinite]"></div>
          </div>
        </div>

        <button className="w-full max-w-[280px] bg-transparent border-2 border-[#D4870A] text-[#D4870A] py-3 font-['Space_Mono'] font-bold text-sm uppercase tracking-widest flex justify-center items-center gap-2 hover:bg-[#D4870A] hover:text-black transition-colors">
          <ShieldAlert className="w-4 h-4" />
          CALL MANAGER — 1 USE REMAINING
        </button>
      </div>
    </div>
  );
}
