import React from "react";
import { Button } from "@/components/ui/button";

export function AuthScreen() {
  return (
    <div className="min-h-screen bg-[#1a1a18] text-[#e8e4d9] flex flex-col items-center justify-center p-6 relative">
      <div className="w-full max-w-sm bg-[#f5f0e8] text-black rounded-lg p-8 shadow-2xl relative">
        {/* Nametag Logomark */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-[#A32D2D] flex items-center justify-center shadow-md">
          <span className="font-bold text-2xl text-[#A32D2D] font-['Space_Mono']">
            S
          </span>
        </div>

        <div className="mt-8 text-center border-b-2 border-dashed border-gray-300 pb-6 mb-6">
          <h1 className="text-2xl font-['Space_Mono'] font-bold uppercase leading-tight tracking-tight mb-2">
            Create Your<br />Employee File
          </h1>
          <p className="font-['Inter'] text-[#8a8578] text-sm">
            Your survival score will be tracked.
          </p>
        </div>

        <div className="space-y-4">
          <button className="w-full bg-white border-2 border-gray-800 text-black py-3 px-4 font-['Inter'] font-bold text-sm flex flex-col items-center justify-center hover:bg-gray-50 active:bg-gray-200 transition-colors">
            <span className="mb-1">Sign in with Google</span>
            <span className="text-xs font-normal text-gray-500 font-['Space_Mono']">
              — HR requires this.
            </span>
          </button>

          <button className="w-full bg-gray-900 border-2 border-gray-900 text-white py-3 px-4 font-['Inter'] font-bold text-sm flex flex-col items-center justify-center hover:bg-gray-800 active:bg-black transition-colors">
            <span className="mb-1">Sign in with GitHub</span>
            <span className="text-xs font-normal text-gray-400 font-['Space_Mono']">
              — IT department prefers this.
            </span>
          </button>
        </div>

        <div className="mt-8 text-center">
          <button className="text-[#8a8578] hover:text-[#A32D2D] text-xs font-['Space_Mono'] transition-colors underline decoration-dotted underline-offset-4">
            or continue without saving your score &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
