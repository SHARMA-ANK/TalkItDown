import React from "react";
import { Mic, Cloud, Zap, AlertTriangle, ShieldAlert } from "lucide-react";

export function AirportGame() {
  return (
    <div className="min-h-screen bg-[#1a1a18] text-[#e8e4d9] font-sans flex flex-col max-w-md mx-auto relative">
      
      {/* Status bar */}
      <div className="bg-[#1a1a18] border-b border-[#2e2e2a] px-4 py-3 flex justify-between items-center z-10">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono tracking-widest text-[#8a8578]">FLIGHT STS-047</span>
          <span className="text-xs font-bold tracking-wider uppercase text-[#e8e4d9]">McDONALD'S DRIVE-THRU</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono tracking-widest text-[#8a8578]">GATE R4</span>
            <span className="text-xs font-mono font-bold text-[#e8e4d9]">02:14 ELAPSED</span>
          </div>
          <button className="bg-[#1a1a18] border border-[#D4870A] rounded-full w-8 h-8 flex items-center justify-center relative overflow-hidden group">
            <span className="text-[9px] font-bold text-[#D4870A] tracking-tighter">MGR</span>
            <div className="absolute -top-1 -right-1 bg-[#D4870A] text-[#1a1a18] text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">1×</div>
          </button>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 flex flex-col gap-6">
        
        {/* Flight Conditions Panel */}
        <div className="bg-[#f5f0e8] text-[#1a1a18] p-4 rounded-sm shadow-sm border border-[#e8e4d9]">
          <h3 className="text-[10px] font-mono font-bold tracking-widest text-[#8a8578] mb-3 uppercase border-b border-[#1a1a18]/10 pb-2">Passenger Situation Report</h3>
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <span className="text-xs font-bold uppercase tracking-wider">Turbulence</span>
              <span className="text-[10px] font-mono font-bold text-[#D4870A]">MODERATE-SEVERE (67%)</span>
            </div>
            
            <div className="h-4 bg-[#1a1a18]/10 rounded-sm relative overflow-hidden flex items-center">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#2D7A3A] via-[#D4870A] to-[#D4870A] w-[67%] transition-all duration-500"></div>
              
              {/* Markers */}
              <div className="absolute inset-0 flex justify-between px-2 items-center text-[#1a1a18] mix-blend-overlay">
                <Cloud size={12} />
                <Zap size={12} className="opacity-50" />
                <AlertTriangle size={12} className="opacity-50" />
              </div>
            </div>
          </div>
        </div>

        {/* Passenger Card */}
        <div className="bg-[#f9f6ef] text-[#1a1a18] p-5 rounded-sm shadow-md border-l-4 border-l-[#D4870A] relative flex-1 flex flex-col">
          <div className="absolute top-0 right-0 bg-[#D4870A] text-[#1a1a18] text-[9px] font-bold px-2 py-1 uppercase tracking-widest rounded-bl-sm">
            ELEVATED
          </div>
          
          <span className="text-[10px] font-bold text-[#A32D2D] tracking-widest uppercase mb-4">Passenger</span>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-[#1a1a18] text-[#f9f6ef] flex items-center justify-center text-2xl font-serif font-bold border-2 border-[#D4870A]">
              B
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold uppercase tracking-wide">Brenda K.</h2>
              <span className="text-xs text-[#8a8578] font-mono tracking-wider uppercase">HOA President / Seat 4A</span>
            </div>
          </div>

          <div className="mt-auto border border-[#1a1a18]/20 bg-white p-4 rounded-sm relative">
            <div className="absolute -top-2 left-4 bg-white px-2 text-[8px] font-mono text-[#8a8578] uppercase tracking-widest border border-[#1a1a18]/10">Complaint Form</div>
            <p className="font-mono text-sm leading-relaxed text-[#1a1a18] font-bold">
              "I HAVE SHOPPED HERE FOR THIRTY YEARS!!"
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-[#1a1a18] border-t border-[#2e2e2a] px-4 py-6 flex flex-col items-center gap-6 z-10 relative overflow-hidden">
        
        {/* Ticker text */}
        <div className="absolute top-0 inset-x-0 overflow-hidden bg-[#D4870A]/10 border-b border-[#D4870A]/20">
          <div className="whitespace-nowrap py-1">
            <span className="text-[8px] font-mono text-[#D4870A] tracking-widest uppercase inline-block animate-[spin_10s_linear_infinite]" style={{ animation: "marquee 20s linear infinite" }}>
              FLIGHT ATTENDANT SCRIPT ACTIVE • REMAIN CALM • DO NOT ENGAGE WITH HOSTILITY • FLIGHT ATTENDANT SCRIPT ACTIVE • REMAIN CALM • DO NOT ENGAGE WITH HOSTILITY •
            </span>
          </div>
        </div>

        <button className="w-24 h-24 rounded-full bg-[#1a1a18] border-2 border-[#2e2e2a] flex flex-col items-center justify-center gap-2 mt-4 relative group hover:border-[#D4870A] transition-colors">
          <div className="absolute inset-0 rounded-full border border-[#D4870A] opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
          <Mic size={28} className="text-[#e8e4d9]" />
          <span className="text-[9px] font-bold tracking-widest text-[#8a8578] group-hover:text-[#e8e4d9] uppercase">RESPOND</span>
          
          {/* Waveforms */}
          <div className="absolute -bottom-2 flex gap-1 items-end h-4">
            <div className="w-1 bg-[#D4870A] h-1 rounded-full"></div>
            <div className="w-1 bg-[#D4870A] h-3 rounded-full"></div>
            <div className="w-1 bg-[#D4870A] h-2 rounded-full"></div>
            <div className="w-1 bg-[#D4870A] h-4 rounded-full"></div>
            <div className="w-1 bg-[#D4870A] h-2 rounded-full"></div>
          </div>
        </button>

        <button className="w-full bg-[#1a1a18] border border-[#D4870A] text-[#D4870A] py-3 rounded-sm flex items-center justify-center gap-2 hover:bg-[#D4870A] hover:text-[#1a1a18] transition-colors group">
          <ShieldAlert size={16} />
          <span className="text-xs font-bold tracking-widest uppercase">Call Gate Supervisor — 1 Use</span>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}} />
    </div>
  );
}
