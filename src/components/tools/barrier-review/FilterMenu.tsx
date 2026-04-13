"use client";

import React from "react";
import { RouletteItem } from "./types";

interface FilterMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: RouletteItem[];
  excludedIds: string[];
  onToggle: (id: string) => void;
  onToggleAll: (exclude: boolean) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ isOpen, onClose, items, excludedIds, onToggle, onToggleAll }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-neutral-900 border border-neutral-700 w-full max-w-lg max-h-[85vh] flex flex-col rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        <div className="flex justify-between items-center p-6 border-b border-neutral-800 bg-neutral-900 z-10 rounded-t-sm">
          <div>
            <span className="text-ucf-gold text-[10px] font-bold uppercase tracking-[0.2em] block mb-1">Configuration</span>
            <h3 className="text-2xl font-bold text-ucf-white">Edit Draw Pool</h3>
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-ucf-white transition-colors p-2 hover:bg-neutral-800 rounded-full">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/50 flex gap-3 z-10">
          <button onClick={() => onToggleAll(false)} className="flex-1 text-xs font-bold uppercase tracking-wider text-black bg-ucf-gold hover:bg-ucf-gold/90 px-4 py-2 rounded-sm transition-colors">
            Select All
          </button>
          <button onClick={() => onToggleAll(true)} className="flex-1 text-xs font-bold uppercase tracking-wider text-neutral-400 bg-neutral-800 hover:bg-neutral-700 hover:text-ucf-white px-4 py-2 rounded-sm transition-colors">
            Deselect All
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 bg-black/20">
          {items.map((item) => {
            const isSelected = !excludedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => onToggle(item.id)}
                className={`group flex items-center justify-between p-3 mb-1 mx-2 rounded-sm cursor-pointer border transition-all duration-200 select-none ${
                  isSelected
                    ? "bg-neutral-800/80 border-neutral-700 hover:border-ucf-gold/50"
                    : "bg-transparent border-transparent opacity-50 hover:opacity-80 hover:bg-neutral-900"
                }`}
              >
                <div className="flex flex-col">
                  <span className={`text-sm font-bold transition-colors ${isSelected ? "text-ucf-white" : "text-neutral-500"}`}>{item.label}</span>
                  <span className="text-[10px] text-neutral-600 uppercase tracking-wider">{item.source}</span>
                </div>
                <div className={`w-6 h-6 rounded-sm flex items-center justify-center transition-all duration-200 ${isSelected ? "bg-ucf-gold shadow-[0_0_10px_rgba(255,201,4,0.4)]" : "bg-neutral-800 border-2 border-neutral-700 group-hover:border-neutral-500"}`}>
                  {isSelected && (
                    <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-6 border-t border-neutral-800 bg-neutral-900 rounded-b-sm">
          <button onClick={onClose} className="w-full bg-ucf-white hover:bg-neutral-200 text-black font-black uppercase tracking-[0.2em] py-4 transition-colors rounded-sm">
            Done ({items.length - excludedIds.length} Selected)
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
