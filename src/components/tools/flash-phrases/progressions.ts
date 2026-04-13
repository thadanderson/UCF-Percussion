export type ProgressionStyle = 'rock-funk' | 'swing';
export type ProgressionSource = 'builtin' | 'midi';

export interface ProgressionDef {
  id: string;
  name: string;
  style: ProgressionStyle;
  source: ProgressionSource;
  loopBars?: number;
  midiFile?: string;
}

export const BUILTIN_PROGRESSIONS: ProgressionDef[] = [
  { id: 'builtin-rock',  name: 'Basic Rock (I–IV–V)',  style: 'rock-funk', source: 'builtin' },
  { id: 'builtin-swing', name: 'Basic Swing (ii–V–I)', style: 'swing',     source: 'builtin' },
];

export const MIDI_PROGRESSIONS: ProgressionDef[] = [
  { id: 'heres-that-rainy-day', name: "Here's That Rainy Day", style: 'swing', source: 'midi', midiFile: "jazz/Here's-That-Rainy-Day.mid" },
  { id: 'blue-bossa', name: 'Blue Bossa', style: 'swing', source: 'midi', midiFile: 'jazz/Blue-Bossa.mid' },
];

export const ALL_PROGRESSION_DEFS: ProgressionDef[] = [
  ...BUILTIN_PROGRESSIONS,
  ...MIDI_PROGRESSIONS,
];
