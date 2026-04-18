"use client";
import React, { useRef, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { PlayState, Phrase } from './types';
import { ChevronRight, ChevronLeft, ImageOff } from 'lucide-react';

interface CardDisplayProps {
  currentPhrase: Phrase;
  nextPhrase: Phrase;
  playState: PlayState;
  countInBeat: number;
  countInBars?: number;
  currentCountInBar?: number;
  onNext: () => void;
  onPrev: () => void;
}

const CardDisplay: React.FC<CardDisplayProps> = ({
  currentPhrase, nextPhrase, playState, countInBeat,
  countInBars = 0, currentCountInBar = 1, onNext, onPrev,
}) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => onNext(),
    onSwipedRight: () => onPrev(),
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  const isCountIn = playState === PlayState.COUNT_IN;
  const [currentImageError, setCurrentImageError] = useState(false);
  const [nextImageError, setNextImageError] = useState(false);

  const currentUrl = `/cards/${currentPhrase.imageUrl}`;
  const nextUrl = `/cards/${nextPhrase.imageUrl}`;

  useEffect(() => { setCurrentImageError(false); }, [currentUrl]);
  useEffect(() => { setNextImageError(false); }, [nextUrl]);

  useEffect(() => {
    const img = new window.Image();
    img.src = nextUrl;
  }, [nextUrl]);

  return (
    <div {...handlers}
      className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 p-[2%] w-full h-full touch-pan-y">

      {/* Current Card */}
      <div className="relative flex-1 flex items-center justify-center min-h-0 min-w-0">
        {!isCountIn && (
          <>
            <button onClick={onPrev}
              className="hidden md:flex absolute left-0 z-20 p-3 lg:p-4 bg-black/20 hover:bg-black/40 text-white/50 hover:text-white rounded-full transition-all -ml-4 lg:-ml-12">
              <ChevronLeft className="w-8 h-8 lg:w-10 lg:h-10" />
            </button>
            <button onClick={onNext}
              className="hidden md:flex absolute right-0 z-20 p-3 lg:p-4 bg-black/20 hover:bg-black/40 text-white/50 hover:text-white rounded-full transition-all -mr-4 lg:-mr-12">
              <ChevronRight className="w-8 h-8 lg:w-10 lg:h-10" />
            </button>
          </>
        )}

        <div className="relative flex flex-col items-center max-w-full max-h-full bg-neutral-800 rounded-xl shadow-2xl border-2 border-ucf-gold overflow-hidden w-full h-full aspect-[4/3] md:aspect-auto">
          {!isCountIn && (
            <div className="absolute top-0 left-0 bg-ucf-gold text-black text-xs font-bold px-3 py-1 rounded-br-lg z-10">
              Current
            </div>
          )}

          {isCountIn && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-[12rem] md:text-[16rem] font-black text-white/90 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] animate-pulse tracking-tighter leading-none">
                {countInBeat}
              </div>
              {countInBars > 1 && (
                <div className="mt-4 px-6 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20">
                  <span className="text-xl md:text-2xl text-white font-bold tracking-widest uppercase">
                    Bar {currentCountInBar} <span className="text-white/50">/</span> {countInBars}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className={`flex flex-col w-full h-full transition-opacity duration-300 ${isCountIn ? 'opacity-30 blur-[2px]' : 'opacity-100'}`}>
            <div className="flex-1 flex items-center justify-center bg-neutral-100 relative min-h-0 w-full overflow-hidden">
              {!currentImageError ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={currentUrl} alt={currentPhrase.name}
                  className="max-w-full max-h-full object-contain"
                  onError={() => setCurrentImageError(true)} />
              ) : (
                <div className="flex flex-col items-center justify-center text-neutral-500 gap-4 p-6 text-center">
                  <ImageOff className="w-12 h-12 text-red-400 opacity-50" />
                  <p className="text-sm text-red-300 font-mono">{currentUrl}</p>
                </div>
              )}
            </div>
            <div className="bg-neutral-50 p-3 text-center border-t border-neutral-200 w-full shrink-0">
              <h2 className="text-lg md:text-2xl font-bold text-neutral-800 tracking-tight">{currentPhrase.name}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Next Card */}
      <div className={`relative w-full md:w-1/3 aspect-video bg-neutral-800 rounded-lg shadow-lg border border-neutral-700 opacity-60 overflow-hidden flex flex-col max-h-full transition-all duration-300 ${isCountIn ? 'opacity-20 blur-sm' : ''}`}>
        <div className="absolute top-0 left-0 bg-neutral-700 text-neutral-300 text-xs font-bold px-3 py-1 rounded-br-lg z-10">Next</div>
        <div className="flex-1 flex items-center justify-center">
          {!nextImageError ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={nextUrl} alt={nextPhrase.name}
              className="w-full h-full object-contain grayscale"
              onError={() => setNextImageError(true)} />
          ) : (
            <div className="flex flex-col items-center justify-center text-neutral-500 gap-1">
              <ImageOff className="w-8 h-8 opacity-30" />
            </div>
          )}
        </div>
        <div className="bg-neutral-900 p-2 text-center border-t border-neutral-800">
          <h2 className="text-sm font-medium text-neutral-400">{nextPhrase.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default CardDisplay;
