import React from "react";
import { User, Trophy, FileText, Settings, Clock, AlertCircle } from "lucide-react";

export function HomeScreen() {
  return (
    <div className="min-h-screen bg-[#1a1a18] text-[#e8e4d9] flex flex-col p-4 font-['Inter'] relative pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-['Space_Mono'] text-sm tracking-widest text-[#8a8578]">THE BREAK ROOM</h1>
        <Clock className="w-4 h-4 text-[#8a8578]" />
      </div>

      {/* Player Nametag Card */}
      <div className="bg-[#f5f0e8] text-black rounded-lg p-5 mb-8 shadow-lg relative border-t-8 border-[#A32D2D]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-gray-400 flex items-center justify-center">
              <span className="font-bold text-xl">J</span>
            </div>
            <div>
              <div className="font-bold uppercase tracking-wide text-sm">Employee</div>
              <div className="font-['Space_Mono'] text-gray-600 text-xs">@jsmith94</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Survival Score</div>
            <div className="font-['Space_Mono'] text-4xl font-bold text-black -mt-1 tracking-tighter">4,280</div>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t-2 border-dashed border-gray-300">
          <div className="flex items-center gap-2 text-[#A32D2D] font-bold text-xs font-['Space_Mono']">
            <div className="w-2 h-2 rounded-full bg-[#A32D2D] animate-pulse"></div>
            3-DAY STREAK — YOU SHOWED UP
          </div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="flex-1 flex flex-col gap-4">
        <button className="w-full bg-[#f5f0e8] text-black border-4 border-[#A32D2D] shadow-[4px_4px_0px_#A32D2D] py-8 px-6 hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_#A32D2D] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all duration-75 flex flex-col items-center justify-center text-center">
          <span className="font-['Space_Mono'] font-bold text-3xl uppercase tracking-widest text-[#A32D2D] mb-1">
            START SHIFT
          </span>
          <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">
            Another day, another dollar
          </span>
        </button>

        <button className="w-full bg-[#1a1a18] text-[#f5f0e8] border-4 border-[#D4870A] py-6 px-6 hover:bg-[#252522] transition-colors flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#D4870A] text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
            Daily
          </div>
          <div className="flex items-center gap-2 mb-2 text-[#D4870A]">
            <AlertCircle className="w-5 h-5" />
            <span className="font-['Space_Mono'] font-bold text-xl uppercase tracking-widest">
              BOSS FIGHT
            </span>
          </div>
          <span className="text-sm font-['Space_Mono'] text-gray-400">
            TODAY: BRENDA K.
          </span>
          <span className="text-xs font-['Space_Mono'] text-[#D4870A] mt-2 opacity-80">
            resets in 06:42:18
          </span>
        </button>
      </div>

      {/* Tab Bar - Punch Card Style */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f5f0e8] border-t border-gray-400 p-2 flex justify-between items-center shadow-[0_-4px_10px_rgba(0,0,0,0.5)] z-50">
        <div className="w-full flex justify-between bg-white border-2 border-gray-300 rounded-sm overflow-hidden">
          <button className="flex-1 py-3 flex flex-col items-center border-r-2 border-dashed border-gray-300 hover:bg-gray-50">
            <Trophy className="w-5 h-5 mb-1 text-gray-700" />
            <span className="text-[9px] font-['Space_Mono'] font-bold tracking-tighter text-gray-600">LEADERBOARD</span>
          </button>
          <button className="flex-1 py-3 flex flex-col items-center border-r-2 border-dashed border-gray-300 hover:bg-gray-50">
            <FileText className="w-5 h-5 mb-1 text-gray-700" />
            <span className="text-[9px] font-['Space_Mono'] font-bold tracking-tighter text-gray-600">MY RECEIPTS</span>
          </button>
          <button className="flex-1 py-3 flex flex-col items-center hover:bg-gray-50">
            <Settings className="w-5 h-5 mb-1 text-gray-700" />
            <span className="text-[9px] font-['Space_Mono'] font-bold tracking-tighter text-gray-600">SETTINGS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
