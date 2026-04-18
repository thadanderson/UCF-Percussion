"use client";

import React from "react";
import { LevelMap } from "./types";

interface SideMenuProps {
  data: LevelMap;
  selectedLevel: string;
  selectedCategory: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (level: string, category: string) => void;
  onHome: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ data, selectedLevel, selectedCategory, isOpen, onClose, onSelect, onHome }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-neutral-900 border-r border-ucf-gold/30 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8 border-b border-neutral-800 pb-4">
            <h2 className="text-2xl font-black text-ucf-gold">Levels of Study</h2>
            <button onClick={onClose} className="text-neutral-500 hover:text-ucf-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {Object.keys(data).map((level) => (
              <div key={level}>
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3 pl-2 border-l-2 border-ucf-gold/50">
                  {level}
                </h3>
                <div className="space-y-1">
                  {Object.keys(data[level]).map((category) => {
                    const isActive = level === selectedLevel && category === selectedCategory;
                    return (
                      <button
                        key={category}
                        onClick={() => { onSelect(level, category); onClose(); }}
                        className={`w-full text-left px-4 py-3 rounded-sm text-sm font-bold transition-all duration-200 border-l-2 ${
                          isActive
                            ? "bg-ucf-gold text-black border-white shadow-[0_0_15px_rgba(255,201,4,0.2)]"
                            : "bg-neutral-800/50 text-neutral-400 border-transparent hover:bg-neutral-800 hover:text-ucf-gold"
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-neutral-800 flex flex-col gap-4">
            <button
              onClick={() => { onHome(); onClose(); }}
              className="w-full py-3 px-4 border border-neutral-700 hover:border-ucf-gold text-neutral-400 hover:text-ucf-white text-xs font-bold uppercase tracking-widest transition-colors rounded-sm flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Return Home
            </button>
            <button
              onClick={() => { window.opener ? window.close() : (window.location.href = "/dashboard/wiki"); }}
              className="w-full py-3 px-4 border border-neutral-700 hover:border-ucf-gold/60 text-neutral-600 hover:text-ucf-gold text-xs font-bold uppercase tracking-widest transition-colors rounded-sm flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              Studio Dashboard
            </button>
            <p className="text-[10px] uppercase tracking-wider text-neutral-600 text-center">Select Collection</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
