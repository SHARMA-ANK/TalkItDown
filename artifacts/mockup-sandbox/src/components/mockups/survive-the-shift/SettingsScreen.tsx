import React, { useState } from "react";
import { LogOut } from "lucide-react";

export function SettingsScreen() {
  const [haptics, setHaptics] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-[#1a1a18] text-[#e8e4d9] flex flex-col font-['Inter'] pb-24">
      <div className="p-4 pt-8">
        <h1 className="font-['Space_Mono'] text-sm tracking-widest text-[#8a8578] mb-4 uppercase">EMPLOYEE FILE</h1>
        
        {/* Stats Summary - Receipt Paper */}
        <div className="bg-[#f5f0e8] text-black p-4 mb-8 font-['Space_Mono'] text-xs uppercase shadow-md relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-repeat-x bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxwb2x5Z29uIHBvaW50cz0iMCAwLDggMCw0IDgiIGZpbGw9IiMxYTFhMTgiLz48L3N2Zz4=')] -mt-1"></div>
          
          <div className="flex justify-between border-b-2 border-dashed border-gray-400 pb-2 mb-2">
            <span className="text-gray-500">TOTAL SHIFTS:</span>
            <span className="font-bold">47</span>
          </div>
          <div className="flex justify-between border-b-2 border-dashed border-gray-400 pb-2 mb-2">
            <span className="text-gray-500">AVG RAGE HANDLED:</span>
            <span className="font-bold text-[#D4870A]">71%</span>
          </div>
          <div className="flex justify-between border-b-2 border-dashed border-gray-400 pb-2 mb-2">
            <span className="text-gray-500">PERSONAL BEST:</span>
            <span className="font-bold text-[#2D7A3A]">0:52</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">TOTAL KARENS:</span>
            <span className="font-bold text-[#A32D2D]">47</span>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-repeat-x bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxwb2x5Z29uIHBvaW50cz0iMCA4LDggOCw0IDAiIGZpbGw9IiMxYTFhMTgiLz48L3N2Zz4=')] -mb-1"></div>
        </div>

        <h2 className="font-['Space_Mono'] text-sm tracking-widest text-[#8a8578] mb-4 uppercase">PREFERENCES</h2>

        {/* Settings Grid - Shift Schedule Style */}
        <div className="border-2 border-gray-800 bg-[#111110] rounded-sm divide-y divide-gray-800">
          <div className="p-4 flex items-center justify-between">
            <span className="font-bold text-sm">Haptics (Feel the rage)</span>
            <button 
              onClick={() => setHaptics(!haptics)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${haptics ? 'bg-[#D4870A]' : 'bg-gray-700'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${haptics ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between mb-2">
              <span className="font-bold text-sm">Sound Effects</span>
              <span className="text-xs text-gray-500 font-['Space_Mono']">80%</span>
            </div>
            <div className="h-2 bg-black border border-gray-700 rounded-full w-full overflow-hidden">
              <div className="h-full bg-gray-400 w-[80%]"></div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex justify-between mb-2">
              <span className="font-bold text-sm">Karen Voice Volume</span>
              <span className="text-xs text-[#A32D2D] font-['Space_Mono'] text-bold">MAX</span>
            </div>
            <div className="h-2 bg-black border border-gray-700 rounded-full w-full overflow-hidden">
              <div className="h-full bg-[#A32D2D] w-full"></div>
            </div>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-bold text-sm">Daily Boss Alerts</span>
              <span className="text-xs text-gray-500 mt-1">HR will notify you when a boss arrives</span>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications ? 'bg-[#D4870A]' : 'bg-gray-700'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>
        </div>

        <button className="w-full mt-8 flex items-center justify-center gap-2 py-4 border-2 border-dashed border-[#A32D2D] text-[#A32D2D] font-['Space_Mono'] font-bold uppercase tracking-widest hover:bg-[#A32D2D] hover:text-white transition-colors">
          <LogOut className="w-4 h-4" />
          CLOCK OUT
        </button>
      </div>

      {/* Tab Bar - Punch Card Style */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f5f0e8] border-t border-gray-400 p-2 flex justify-between items-center shadow-[0_-4px_10px_rgba(0,0,0,0.5)] z-50">
        <div className="w-full flex justify-between bg-white border-2 border-gray-300 rounded-sm overflow-hidden">
          <button className="flex-1 py-3 flex flex-col items-center border-r-2 border-dashed border-gray-300 hover:bg-gray-50">
            <span className="text-[9px] font-['Space_Mono'] font-bold tracking-tighter text-gray-600">LEADERBOARD</span>
          </button>
          <button className="flex-1 py-3 flex flex-col items-center border-r-2 border-dashed border-gray-300 hover:bg-gray-50">
            <span className="text-[9px] font-['Space_Mono'] font-bold tracking-tighter text-gray-600">MY RECEIPTS</span>
          </button>
          <button className="flex-1 py-3 flex flex-col items-center bg-gray-200">
            <span className="text-[9px] font-['Space_Mono'] font-bold tracking-tighter text-black">SETTINGS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
