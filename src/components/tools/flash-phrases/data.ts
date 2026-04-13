import { Category, Phrase } from './types';

// Static phrase generators — replaces Vite's import.meta.glob.
// Images live in /public/cards/ and are served at /cards/<filename>.

const makePhrase = (id: string, name: string, filename: string): Phrase => ({
  id,
  name,
  imageUrl: filename,
});

const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

const rockBass: Phrase[] = range(84).map((n) =>
  makePhrase(`rockbass-${n}`, `Rock Bass`, `rockbass${n}.jpeg`)
);

const rockCombined: Phrase[] = range(42).map((n) =>
  makePhrase(`rockcombined-${n}`, `Rock Combined`, `rockcombined${n}.jpeg`)
);

const swingBass: Phrase[] = range(38).map((n) =>
  makePhrase(`swingbass-${n}`, `Swing Bass`, `swingbass${n}.jpeg`)
);

const swingSnare: Phrase[] = range(74).map((n) =>
  makePhrase(`swingsnare-${n}`, `Swing Snare`, `swingsnare${n}.jpeg`)
);

// swingcombined1 and swingcombined2 use a dot separator: swingcombined1.N.jpeg
const swingCombined1: Phrase[] = range(100).map((n) =>
  makePhrase(`swingcombined1-${n}`, `Swing Combined #1`, `swingcombined1.${n}.jpeg`)
);

const swingCombined2: Phrase[] = range(148).map((n) =>
  makePhrase(`swingcombined2-${n}`, `Swing Combined #2`, `swingcombined2.${n}.jpeg`)
);

export const DATA: Category[] = [
  {
    id: 'rock-funk',
    name: 'Rock & Funk',
    subCategories: [
      { id: 'rf-bass',     name: 'Bass Drum Variables', phrases: rockBass },
      { id: 'rf-combined', name: 'Combined Variables',  phrases: rockCombined },
    ],
  },
  {
    id: 'swing',
    name: 'Swing',
    subCategories: [
      { id: 'swing-bass',   name: 'Bass Drum Variables',   phrases: swingBass },
      { id: 'swing-snare',  name: 'Snare Drum Variables',  phrases: swingSnare },
      { id: 'swing-comb1',  name: 'Combined Variables #1', phrases: swingCombined1 },
      { id: 'swing-comb2',  name: 'Combined Variables #2', phrases: swingCombined2 },
    ],
  },
];

export const getFirstSubCategory = () => DATA[0].subCategories[0];
