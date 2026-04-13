"use client";
import React from 'react';
import { BookOpen, Info } from 'lucide-react';
import { FlashLogo } from './FlashLogo';

export const HomeView: React.FC = () => (
  <div className="flex-1 overflow-y-auto p-6 md:p-12 max-w-4xl mx-auto w-full text-gray-300 flex flex-col justify-center items-center text-center h-full">
    <div className="mb-8">
      <div className="bg-ucf-gold/20 p-8 rounded-full inline-block mb-6 shadow-lg shadow-ucf-gold/10">
        <FlashLogo className="w-24 h-24 text-ucf-gold" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Welcome to Flash Phrases</h1>
    </div>
    <div className="max-w-2xl bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-xl backdrop-blur-sm">
      <p className="text-lg md:text-xl leading-relaxed text-gray-300 text-left">
        Flash Phrases is a coordination training tool for drum set players. It features flashcard phrase variations,
        metronome integration, and customizable playback settings. During playback, it will display single-bar flash
        cards of phrase variations for snare drum and/or bass drum voices. These are intended to be combined with
        common ostinatos in the other limbs. To get started, use the sidebar menu on the left to select which
        flash card set you would like to use.
      </p>
    </div>
  </div>
);

export const GuideView: React.FC = () => (
  <div className="flex-1 overflow-y-auto p-6 md:p-12 max-w-4xl mx-auto w-full text-gray-300">
    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-700">
      <Info className="w-8 h-8 text-ucf-gold" />
      <h1 className="text-3xl font-bold text-white">Guide</h1>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      {[
        { title: 'Navigation', body: 'Use the sidebar to select and load a flash card set in either Rock & Funk or Swing feels.' },
        { title: 'Flash Cards', body: 'The left side displays the current phrase. The right side shows a preview of the next phrase.' },
        { title: 'Start and Stop', body: 'Press Start for a count-in before the phrase begins. Press Stop to halt the metronome and phrase progression.' },
        { title: 'Tempo', body: 'Adjust the tempo using the ± buttons in the top controls.' },
        { title: 'Phrase Repetition', body: 'Single-bar phrases can repeat 1×, 2×, 4×, or 8× before advancing to the next.' },
        { title: 'Mode', body: 'Use Linear for sequential phrase order or Random for a shuffled order.' },
      ].map(({ title, body }) => (
        <section key={title} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
            <span className="bg-ucf-gold w-2 h-6 rounded-full" />{title}
          </h3>
          <p>{body}</p>
        </section>
      ))}
      <section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 md:col-span-2">
        <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
          <span className="bg-ucf-gold w-2 h-6 rounded-full" />Phrase Selector
        </h3>
        <p>Use the phrase selector dropdown to jump directly to any specific phrase number.</p>
      </section>
    </div>
  </div>
);

export const SourcesView: React.FC = () => (
  <div className="flex-1 overflow-y-auto p-6 md:p-12 max-w-3xl mx-auto w-full text-gray-300">
    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-700">
      <BookOpen className="w-8 h-8 text-ucf-gold" />
      <h1 className="text-3xl font-bold text-white">Sources</h1>
    </div>
    <div className="space-y-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border-l-4 border-ucf-gold">
        <h2 className="text-xl font-bold text-white mb-2">Rock &amp; Funk</h2>
        <p className="text-gray-400 mb-4 text-sm uppercase tracking-wider">Phrase Variations</p>
        <p className="text-lg">Can be found in: <span className="font-bold text-white italic">It&rsquo;s About Time</span> by Fred Dinkins</p>
      </div>
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border-l-4 border-ucf-gold/50">
        <h2 className="text-xl font-bold text-white mb-2">Swing</h2>
        <p className="text-gray-400 mb-4 text-sm uppercase tracking-wider">Phrase Variations</p>
        <p className="text-lg">Can be found in: <span className="font-bold text-white italic">Studio/Jazz Drum Cookbook</span> by John Pickering</p>
      </div>
    </div>
  </div>
);
