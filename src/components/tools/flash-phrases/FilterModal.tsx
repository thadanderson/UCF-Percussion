"use client";
import React, { useState, useEffect } from 'react';
import { X, Check, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Phrase } from './types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (excludedIndices: number[]) => void;
  phrases: Phrase[];
  excludedIndices: number[];
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onSave, phrases, excludedIndices }) => {
  const [tempExcluded, setTempExcluded] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) { setTempExcluded(excludedIndices); setError(null); }
  }, [isOpen, excludedIndices]);

  if (!isOpen) return null;

  const handleToggle = (index: number) => {
    setTempExcluded(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index].sort((a, b) => a - b));
    setError(null);
  };

  const handleSave = () => {
    if (tempExcluded.length === phrases.length) { setError("Please select at least one phrase."); return; }
    onSave(tempExcluded);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl w-full max-w-md flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-neutral-800">
          <h2 className="text-lg font-bold text-white tracking-wide">Filter Phrases</h2>
          <button onClick={onClose} className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 p-3 border-b border-neutral-800 bg-neutral-900/50">
          <button onClick={() => { setTempExcluded([]); setError(null); }}
            className="flex-1 py-2 bg-neutral-800 hover:bg-neutral-700 text-ucf-gold text-xs font-bold uppercase tracking-wider rounded border border-neutral-700 transition-all flex items-center justify-center gap-2">
            <Eye className="w-3 h-3" /> Select All
          </button>
          <button onClick={() => setTempExcluded(phrases.map((_, idx) => idx))}
            className="flex-1 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 text-xs font-bold uppercase tracking-wider rounded border border-neutral-700 transition-all flex items-center justify-center gap-2">
            <EyeOff className="w-3 h-3" /> Clear All
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {phrases.map((phrase, idx) => {
            const isIncluded = !tempExcluded.includes(idx);
            return (
              <div key={phrase.id} onClick={() => handleToggle(idx)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors border select-none ${isIncluded
                  ? 'bg-ucf-gold/10 border-ucf-gold/30 hover:bg-ucf-gold/20'
                  : 'bg-neutral-800/50 border-transparent hover:bg-neutral-800 opacity-60'}`}>
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${isIncluded
                  ? 'bg-ucf-gold border-ucf-gold shadow-[0_0_10px_rgba(255,201,4,0.4)]'
                  : 'border-neutral-600 bg-neutral-800'}`}>
                  {isIncluded && <Check className="w-3.5 h-3.5 text-black" />}
                </div>
                <span className={`text-sm font-medium ${isIncluded ? 'text-neutral-200' : 'text-neutral-500 line-through'}`}>
                  {idx + 1}. {phrase.name}
                </span>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-neutral-800 bg-neutral-900/50 rounded-b-xl space-y-3">
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold bg-red-900/20 p-2 rounded border border-red-900/50">
              <AlertCircle className="w-4 h-4 flex-none" />{error}
            </div>
          )}
          <button onClick={handleSave}
            className={`w-full py-3 font-bold rounded-lg transition-colors shadow-lg flex items-center justify-center ${tempExcluded.length === phrases.length
              ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
              : 'bg-ucf-gold hover:bg-ucf-gold/90 text-black'}`}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
