import React, { useState, useEffect } from "react";

const FULL_WORD = "SURVIVOR";

export function SplashScreen() {
  const [typed, setTyped] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (typed.length < FULL_WORD.length) {
      const delay = typed.length === 0 ? 600 : 110;
      const t = setTimeout(() => {
        setTyped(FULL_WORD.slice(0, typed.length + 1));
      }, delay);
      return () => clearTimeout(t);
    }
  }, [typed]);

  useEffect(() => {
    const t = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  const doneTyping = typed.length === FULL_WORD.length;

  return (
    <div className="min-h-screen bg-[#1a1a18] text-[#e8e4d9] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 opacity-20"></div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm z-10">
        {/* Nametag Badge */}
        <div className="bg-[#f5f0e8] text-black w-full rounded-xl overflow-hidden shadow-2xl transform -rotate-2">
          <div className="bg-[#A32D2D] text-white text-center py-2 font-bold tracking-widest text-sm border-b-4 border-[#8B1A1A]">
            HELLO
          </div>
          <div className="text-center py-1 text-xs font-['Inter'] text-gray-600 font-bold uppercase tracking-wider">
            my name is:
          </div>
          <div className="py-8 text-center bg-white flex flex-col items-center justify-center min-h-[96px]">
            <h1 className="text-4xl font-['Space_Mono'] font-bold text-black tracking-tighter inline-flex items-center">
              <span>{typed}</span>
              <span
                style={{ opacity: cursorVisible ? 1 : 0 }}
                className="ml-[3px] inline-block w-[3px] h-9 bg-black align-middle transition-opacity duration-75"
              />
            </h1>
          </div>
        </div>

        <div className="mt-12 text-center w-full">
          <p
            className="font-['Space_Mono'] text-lg mb-8 h-8 flex items-center justify-center gap-1 text-[#8a8578] transition-opacity duration-500"
            style={{ opacity: doneTyping ? 1 : 0 }}
          >
            <span>Train for the worst shift of your life.</span>
            <span className="inline-block w-2 h-5 bg-[#D4870A] animate-pulse"></span>
          </p>

          <button
            className="w-full bg-[#f5f0e8] text-black border-4 border-[#A32D2D] shadow-[4px_4px_0px_#A32D2D] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_#A32D2D] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all duration-75 py-4 font-['Space_Mono'] font-bold text-xl uppercase tracking-widest"
            style={{
              opacity: doneTyping ? 1 : 0,
              transform: doneTyping ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s, box-shadow 75ms, translate 75ms",
            }}
          >
            CLOCK IN &rarr;
          </button>
        </div>
      </div>

      <div className="w-full max-w-sm mt-auto pb-8 z-10">
        <div className="font-['Space_Mono'] text-[#8a8578] text-xs space-y-1">
          <p>System initializing...</p>
          <p>Connecting to HR database...</p>
          <p className="text-[#e8e4d9]">Loading Karen... ████████░░</p>
        </div>
      </div>
    </div>
  );
}
