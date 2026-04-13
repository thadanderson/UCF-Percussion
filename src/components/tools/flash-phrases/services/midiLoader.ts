import { Midi } from '@tonejs/midi';

export interface BackingEvent {
  beatTime: number;
  duration: number;
  freqs: number[];
  type: 'bass' | 'chord';
}

export function midiToHz(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export async function loadMidiProgression(
  url: string
): Promise<{ events: BackingEvent[]; loopBeats: number } | null> {
  let arrayBuffer: ArrayBuffer;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`[midiLoader] Failed to load ${url}: ${response.status}`);
      return null;
    }
    arrayBuffer = await response.arrayBuffer();
  } catch (err) {
    console.warn(`[midiLoader] Network error loading ${url}:`, err);
    return null;
  }

  const midi = new Midi(arrayBuffer);
  const fileBPM = midi.header.tempos[0]?.bpm ?? 120;
  const secondsPerBeat = 60 / fileBPM;
  const events: BackingEvent[] = [];

  const bassTrackIndices: number[] = [];
  const chordTrackIndices: number[] = [];
  for (let i = 0; i < midi.tracks.length; i++) {
    const t = midi.tracks[i];
    if (t.notes.length === 0) continue;
    if (t.name.toLowerCase().includes('bass')) bassTrackIndices.push(i);
    else chordTrackIndices.push(i);
  }
  if (bassTrackIndices.length === 0) {
    bassTrackIndices.push(0);
    for (let i = 1; i < midi.tracks.length; i++) {
      if (midi.tracks[i].notes.length > 0) chordTrackIndices.push(i);
    }
  }

  const maxBassDurationBeats = 8;
  for (const idx of bassTrackIndices) {
    for (const note of midi.tracks[idx].notes) {
      const beatTime = note.time / secondsPerBeat;
      const duration = note.duration / secondsPerBeat;
      if (duration > maxBassDurationBeats) continue;
      events.push({ beatTime, duration, freqs: [midiToHz(note.midi)], type: 'bass' });
    }
  }

  for (const i of chordTrackIndices) {
    const track = midi.tracks[i];
    if (!track || track.notes.length === 0) continue;
    const groups = new Map<number, { notes: typeof track.notes; key: number }>();
    for (const note of track.notes) {
      const bucket = Math.round(note.time / 0.02) * 0.02;
      const roundedKey = Math.round(bucket * 1000);
      if (!groups.has(roundedKey)) groups.set(roundedKey, { notes: [], key: roundedKey });
      groups.get(roundedKey)!.notes.push(note);
    }
    for (const group of groups.values()) {
      const firstNote = group.notes[0];
      const beatTime = firstNote.time / secondsPerBeat;
      const duration = Math.max(...group.notes.map(n => n.duration)) / secondsPerBeat;
      const freqs = group.notes.map(n => midiToHz(n.midi));
      events.push({ beatTime, duration, freqs, type: 'chord' });
    }
  }

  events.sort((a, b) => a.beatTime - b.beatTime);

  const headerDuration = (midi.header as unknown as { duration?: number }).duration ?? 0;
  const lastEventEnd = events.reduce((max, e) => {
    const endBeat = e.beatTime + e.duration;
    return endBeat > max ? endBeat : max;
  }, 0);
  const totalBeats = Math.max(headerDuration / secondsPerBeat, lastEventEnd);
  const beatsPerLoop = 16;
  const loopBeats = Math.max(beatsPerLoop, Math.round(totalBeats / beatsPerLoop) * beatsPerLoop);

  return { events, loopBeats };
}
