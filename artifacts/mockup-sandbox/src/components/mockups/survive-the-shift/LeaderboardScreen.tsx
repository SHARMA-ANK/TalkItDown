import React from "react";
import { FileText } from "lucide-react";

export function LeaderboardScreen() {
  const leaderboardData = [
    { rank: 1, name: "@karenslayer99", score: "5,840 pts", time: "0:58", initial: "K", color: "bg-yellow-500" },
    { rank: 2, name: "@retail_survivor", score: "5,200 pts", time: "1:12", initial: "R", color: "bg-gray-300" },
    { rank: 3, name: "@shiftmanager", score: "4,990 pts", time: "1:31", initial: "S", color: "bg-amber-600" },
    { rank: 4, name: "@just_quit", score: "4,500 pts", time: "1:45", initial: "J", color: "bg-gray-700" },
    { rank: 5, name: "@minimum_wage", score: "4,100 pts", time: "2:05", initial: "M", color: "bg-gray-700" },
    { rank: 6, name: "@cryinginback", score: "3,800 pts", time: "2:15", initial: "C", color: "bg-gray-700" },
    { rank: 7, name: "@closing_shift", score: "3,500 pts", time: "2:40", initial: "C", color: "bg-gray-700" },
    { rank: 8, name: "@need_coffee", score: "3,200 pts", time: "3:10", initial: "N", color: "bg-gray-700" },
    { rank: 9, name: "@please_stop", score: "2,900 pts", time: "3:45", initial: "P", color: "bg-gray-700" },
    { rank: 10, name: "@fired_twice", score: "2,500 pts", time: "4:00", initial: "F", color: "bg-gray-700" },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a18] text-[#e8e4d9] flex flex-col font-['Inter']">
      <div className="bg-[#f5f0e8] border-b-4 border-black">
        <div className="flex font-['Space_Mono'] font-bold text-xs text-black uppercase tracking-widest">
          <button className="flex-1 py-4 border-r-2 border-dashed border-gray-400 bg-black text-white">GLOBAL</button>
          <button className="flex-1 py-4 border-r-2 border-dashed border-gray-400 hover:bg-gray-200">FRIENDS</button>
          <button className="flex-1 py-4 hover:bg-gray-200">MY HISTORY</button>
        </div>
      </div>

      <div className="p-4 bg-black border-b border-gray-800 text-center font-['Space_Mono'] text-xs text-gray-500 uppercase tracking-widest">
        Season 4 — Week 2
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 pb-24">
        {leaderboardData.map((user) => (
          <div key={user.rank} className={`flex items-center p-3 rounded bg-[#252522] border-l-4 ${user.rank === 1 ? 'border-yellow-500' : user.rank === 2 ? 'border-gray-300' : user.rank === 3 ? 'border-amber-600' : 'border-gray-700'}`}>
            <div className="w-8 font-['Space_Mono'] font-bold text-lg text-gray-500 text-center mr-3">
              {user.rank}
            </div>
            
            <div className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-black font-bold font-['Space_Mono'] mr-3 shrink-0`}>
              {user.initial}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="font-bold truncate text-sm">{user.name}</div>
              <div className="text-xs text-gray-500 font-['Space_Mono'] mt-0.5">{user.time}</div>
            </div>
            
            <div className="text-right ml-2 shrink-0">
              <div className="font-['Space_Mono'] font-bold text-white text-sm">{user.score}</div>
              <div className="mt-1 flex justify-end">
                <FileText className="w-3 h-3 text-gray-500" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Bar - Punch Card Style */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f5f0e8] border-t border-gray-400 p-2 flex justify-between items-center shadow-[0_-4px_10px_rgba(0,0,0,0.5)] z-50">
        <div className="w-full flex justify-between bg-white border-2 border-gray-300 rounded-sm overflow-hidden">
          <button className="flex-1 py-3 flex flex-col items-center border-r-2 border-dashed border-gray-300 bg-gray-200">
            <span className="text-[9px] font-['Space_Mono'] font-bold tracking-tighter text-black">LEADERBOARD</span>
          </button>
          <button className="flex-1 py-3 flex flex-col items-center border-r-2 border-dashed border-gray-300 hover:bg-gray-50">
            <span className="text-[9px] font-['Space_Mono'] font-bold tracking-tighter text-gray-600">MY RECEIPTS</span>
          </button>
          <button className="flex-1 py-3 flex flex-col items-center hover:bg-gray-50">
            <span className="text-[9px] font-['Space_Mono'] font-bold tracking-tighter text-gray-600">SETTINGS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
