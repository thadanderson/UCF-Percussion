"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { RouletteItem, RouletteResult } from "./types";
import { PERCUSSION_DATA, SARCASTIC_QUOTES } from "./constants";
import { soundService } from "./soundService";
import DrawSelector from "./DrawSelector";
import SideMenu from "./SideMenu";
import LandingPage from "./LandingPage";
import FilterMenu from "./FilterMenu";
import ProfessorComment from "./ProfessorComment";

type Mode = "review" | "drawing";

export default function BarrierReviewApp() {
  const [showLanding, setShowLanding] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState("Snare 1");
  const [selectedCategory, setSelectedCategory] = useState("Portraits in Rhythm");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [excludedIds, setExcludedIds] = useState<string[]>([]);
  const [currentResult, setCurrentResult] = useState<RouletteResult | null>(null);
  const [history, setHistory] = useState<RouletteResult[]>([]);
  const [professorQuote, setProfessorQuote] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("review");
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const initAudio = () => {
      soundService.init();
      window.removeEventListener("click", initAudio);
      window.removeEventListener("keydown", initAudio);
    };
    window.addEventListener("click", initAudio);
    window.addEventListener("keydown", initAudio);
    return () => {
      window.removeEventListener("click", initAudio);
      window.removeEventListener("keydown", initAudio);
    };
  }, []);

  const toggleMute = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    soundService.setMute(newState);
    if (!newState) soundService.playClick();
  };

  const handleModeChange = (newMode: Mode) => {
    soundService.playClick();
    setMode(newMode);
    setCurrentResult(null);
    setProfessorQuote(null);
    setIsRevealed(false);
  };

  const rawItems = useMemo(() => PERCUSSION_DATA[selectedLevel]?.[selectedCategory] || [], [selectedLevel, selectedCategory]);
  const activeItems = useMemo(() => rawItems.filter((item) => !excludedIds.includes(item.id)), [rawItems, excludedIds]);

  const handleSpinEnd = useCallback((item: RouletteItem) => {
    soundService.playSuccess();
    setIsRevealed(false);
    const randomQuote = SARCASTIC_QUOTES[Math.floor(Math.random() * SARCASTIC_QUOTES.length)];
    setProfessorQuote(randomQuote);
    const newResult: RouletteResult = { item, timestamp: Date.now() };
    setCurrentResult(newResult);
    setHistory((prev) => [newResult, ...prev].slice(0, 20));
  }, []);

  const handleSelection = (level: string, category: string) => {
    setSelectedLevel(level);
    setSelectedCategory(category);
    setCurrentResult(null);
    setProfessorQuote(null);
    setExcludedIds([]);
    setIsRevealed(false);
  };

  const handleToggleItem = (id: string) => {
    soundService.playClick();
    setExcludedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleToggleAll = (shouldExclude: boolean) => {
    soundService.playClick();
    setExcludedIds(shouldExclude ? rawItems.map((i) => i.id) : []);
  };

  if (showLanding) {
    return (
      <LandingPage onEnter={() => {
        soundService.playClick();
        setShowLanding(false);
        setIsMenuOpen(true);
      }} />
    );
  }

  const showResult = mode === "review" || (mode === "drawing" && isRevealed);

  return (
    <div className="bg-ucf-black text-ucf-white flex flex-col selection:bg-ucf-gold selection:text-black">
      <SideMenu
        data={PERCUSSION_DATA}
        selectedLevel={selectedLevel}
        selectedCategory={selectedCategory}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelect={(l, c) => { soundService.playClick(); handleSelection(l, c); }}
        onHome={() => { soundService.playClick(); setShowLanding(true); }}
      />

      <FilterMenu
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        items={rawItems}
        excludedIds={excludedIds}
        onToggle={handleToggleItem}
        onToggleAll={handleToggleAll}
      />

      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-ucf-black">
        <button
          onClick={() => { soundService.playClick(); setIsMenuOpen(true); }}
          className="p-2 text-ucf-gold hover:text-ucf-white hover:bg-neutral-800 rounded-sm transition-colors"
          aria-label="Open Menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <h2 className="text-lg md:text-xl font-black text-ucf-gold tracking-wider uppercase">
          Barrier Review &amp; Drawing
        </h2>

        <button
          onClick={toggleMute}
          className={`p-2 rounded-sm transition-colors ${isMuted ? "text-neutral-600 hover:text-neutral-400" : "text-ucf-gold hover:text-ucf-white"}`}
          aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
        >
          {isMuted ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
      </div>

      {/* Mode Toggle */}
      <div className="flex justify-center px-6 py-4 border-b border-neutral-800 bg-neutral-950">
        <div className="flex bg-neutral-900 border border-neutral-800 rounded-sm p-1 gap-1">
          <button
            onClick={() => handleModeChange("review")}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-200 ${
              mode === "review"
                ? "bg-ucf-gold text-black shadow-[0_0_10px_rgba(255,201,4,0.3)]"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            Review Mode
          </button>
          <button
            onClick={() => handleModeChange("drawing")}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-200 ${
              mode === "drawing"
                ? "bg-ucf-gold text-black shadow-[0_0_10px_rgba(255,201,4,0.3)]"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            Drawing Mode
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center py-10 px-4 md:px-8">
        {/* Context Header */}
        <header className="text-center mb-10 max-w-4xl w-full">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="h-[1px] w-12 bg-neutral-700" />
            <div className="text-xs font-bold tracking-[0.3em] text-neutral-500 uppercase">{selectedLevel}</div>
            <div className="h-[1px] w-12 bg-neutral-700" />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <h3 className="text-3xl md:text-5xl font-black text-ucf-white tracking-tight">{selectedCategory}</h3>
            <button
              onClick={() => { soundService.playClick(); setIsFilterOpen(true); }}
              className="group relative p-2 text-neutral-500 hover:text-ucf-gold transition-colors"
              title="Configure Pool"
            >
              <div className="absolute inset-0 bg-neutral-800 rounded-full scale-0 group-hover:scale-100 transition-transform" />
              <svg className="relative w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </header>

        {/* Wheel & Result */}
        <main className="w-full max-w-2xl flex flex-col items-center gap-12">
          <DrawSelector items={activeItems} onSpinEnd={handleSpinEnd} hideResult={mode === "drawing"} />

          {/* Result area */}
          <div className={`w-full transition-all duration-700 ${currentResult ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 h-0 overflow-hidden"}`}>
            {currentResult && (
              <div className="relative">
                {professorQuote && <ProfessorComment quote={professorQuote} />}

                {/* Drawing Mode — hidden state */}
                {mode === "drawing" && !isRevealed && (
                  <div className="w-full p-8 rounded-sm border border-dashed border-neutral-700 bg-neutral-900/50 flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <svg className="w-10 h-10 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                      <p className="text-neutral-500 text-sm font-bold uppercase tracking-widest">Result Hidden</p>
                      <p className="text-neutral-600 text-xs">The draw is complete. Reveal when ready.</p>
                    </div>
                    <button
                      onClick={() => { soundService.playSuccess(); setIsRevealed(true); }}
                      className="px-10 py-4 bg-ucf-gold hover:bg-ucf-gold/90 text-black font-black uppercase tracking-[0.2em] rounded-sm transition-all shadow-[0_0_30px_rgba(255,201,4,0.3)] hover:shadow-[0_0_40px_rgba(255,201,4,0.5)]"
                    >
                      Reveal Result
                    </button>
                  </div>
                )}

                {/* Result card — shown in Review Mode always, Drawing Mode after reveal */}
                {showResult && (
                  <div className="w-full p-8 rounded-sm border-l-4 border-ucf-gold shadow-[0_10px_40px_-10px_rgba(255,201,4,0.2)] bg-neutral-900">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div>
                        <span className="text-ucf-gold text-xs font-bold uppercase tracking-widest mb-2 block">Drawing Result</span>
                        <h2 className="text-3xl md:text-4xl font-black text-ucf-white leading-tight">{currentResult.item.label}</h2>
                        {currentResult.item.tempo && (
                          <div className="inline-block mt-3 px-3 py-1 bg-neutral-800 rounded-sm">
                            <p className="text-ucf-gold font-mono text-sm">{currentResult.item.tempo}</p>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-neutral-600 uppercase tracking-widest">{currentResult.item.source}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        {/* Session History */}
        {history.length > 0 && (
          <section className="w-full max-w-6xl mt-24 pt-12 border-t border-neutral-800">
            <h3 className="text-center text-sm font-bold text-neutral-500 mb-8 uppercase tracking-[0.2em]">Session Log</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {history.map((res, index) => (
                <div key={res.timestamp} className="bg-neutral-900/50 border border-neutral-800 hover:border-ucf-gold/50 p-4 rounded-sm transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-neutral-600 font-mono">{new Date(res.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    <span className="text-[10px] text-ucf-gold/50 group-hover:text-ucf-gold font-bold uppercase">#{history.length - index}</span>
                  </div>
                  <p className="text-sm font-bold text-neutral-300 group-hover:text-ucf-white truncate">{res.item.label}</p>
                  <p className="text-[10px] text-neutral-500 mt-1 truncate">{res.item.source}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
