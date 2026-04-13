import * as Tone from 'tone';
import type { BackingEvent } from './midiLoader';

export type BackingStyle = 'rock-funk' | 'swing';

export class AudioEngine {
  private initialized: boolean = false;
  private nextNoteTime: number = 0.0;
  private timerID: number | null = null;
  private isPlaying: boolean = false;

  public tempo: number = 100;
  public enableBackingTrack: boolean = false;
  public style: BackingStyle = 'rock-funk';
  public onBeat: ((beatNumber: number) => void) | null = null;

  private currentBeatInBar: number = 0;
  private measureCount: number = 0;
  private lookahead: number = 25.0;
  private scheduleAheadTime: number = 0.1;

  private piano: Tone.PolySynth | null = null;
  private bass: Tone.MonoSynth | null = null;
  private clickSynth: Tone.Synth | null = null;

  private activeEvents: BackingEvent[] = [];
  private loopLengthBeats: number = 0;

  private notes: { [key: string]: number } = {
    'C2': 65.41,  'D2': 73.42,  'E2': 82.41,  'F2': 87.31,
    'G2': 98.00,  'A2': 110.00, 'Bb2': 116.54, 'B2': 123.47,
    'C3': 130.81, 'D3': 146.83, 'E3': 164.81,  'F3': 174.61,
    'F#3': 185.00,'G3': 196.00, 'A3': 220.00,  'Bb3': 233.08, 'B3': 246.94,
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63,  'F4': 349.23,
    'G4': 392.00, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
  };

  private ensureContext() {
    if (this.initialized) return;
    Tone.start();

    const compressor = new Tone.Compressor({
      threshold: -18, ratio: 3, knee: 8, attack: 0.005, release: 0.3,
    }).toDestination();

    const reverb = new Tone.JCReverb({ roomSize: 0.25, wet: 0.15 }).connect(compressor);

    this.piano = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle8' },
      envelope: { attack: 0.005, decay: 0.35, sustain: 0.25, release: 1.5 },
      volume: -14,
    }).connect(reverb);

    this.bass = new Tone.MonoSynth({
      oscillator: { type: 'sawtooth' },
      envelope: { attack: 0.02, decay: 0.15, sustain: 0.4, release: 0.5 },
      filter: { type: 'lowpass', frequency: 500, rolloff: -12, Q: 1 },
      filterEnvelope: {
        attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.3,
        baseFrequency: 150, octaves: 2.5,
      },
      volume: -8,
    }).connect(compressor);

    this.clickSynth = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.001, decay: 0.04, sustain: 0, release: 0.01 },
      volume: -2,
    }).connect(compressor);

    this.initialized = true;
  }

  public start(countInBars: number = 1) {
    this.ensureContext();
    this.isPlaying = true;
    this.currentBeatInBar = 0;
    this.measureCount = -countInBars;
    this.nextNoteTime = Tone.now() + 0.1;
    this.scheduler();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerID !== null) { window.clearTimeout(this.timerID); this.timerID = null; }
  }

  public setTempo(bpm: number) { this.tempo = bpm; }
  public setBackingTrack(enabled: boolean) { this.enableBackingTrack = enabled; }
  public setStyle(style: BackingStyle) { this.style = style; }
  public setProgression(events: BackingEvent[], loopBeats: number) {
    this.activeEvents = events; this.loopLengthBeats = loopBeats;
  }
  public clearProgression() { this.activeEvents = []; this.loopLengthBeats = 0; }

  private nextNote() {
    const secondsPerBeat = 60.0 / this.tempo;
    this.nextNoteTime += secondsPerBeat;
    this.currentBeatInBar++;
    if (this.currentBeatInBar === 4) { this.currentBeatInBar = 0; this.measureCount++; }
  }

  private scheduleNote(beatNumber: number, time: number) {
    const beatDuration = 60.0 / this.tempo;
    this.playClick(time, beatNumber);

    if (this.enableBackingTrack && this.measureCount >= 0) {
      if (this.activeEvents.length > 0) {
        const absoluteBeat = this.measureCount * 4 + beatNumber;
        this.scheduleBackingForBeat(absoluteBeat, time, beatDuration);
      } else if (this.style === 'rock-funk') {
        this.scheduleRock(beatNumber, time, beatDuration);
      } else {
        this.scheduleSwing(beatNumber, time, beatDuration);
      }
    }

    const timeUntilNote = (time - Tone.now()) * 1000;
    setTimeout(() => {
      if (this.isPlaying && this.onBeat) this.onBeat(beatNumber);
    }, Math.max(0, timeUntilNote));
  }

  private scheduler() {
    while (this.nextNoteTime < Tone.now() + this.scheduleAheadTime) {
      this.scheduleNote(this.currentBeatInBar, this.nextNoteTime);
      this.nextNote();
    }
    if (this.isPlaying) {
      this.timerID = window.setTimeout(() => this.scheduler(), this.lookahead);
    }
  }

  private playClick(time: number, beatNumber: number) {
    if (!this.clickSynth) return;
    this.clickSynth.triggerAttackRelease(beatNumber === 0 ? 1200 : 800, 0.04, time);
  }

  private playBass(time: number, freq: number, duration: number) {
    if (!this.bass) return;
    this.bass.triggerAttackRelease(freq, duration * 0.75, time);
  }

  private playPiano(time: number, freqs: number[], duration: number) {
    if (!this.piano) return;
    this.piano.triggerAttackRelease(freqs, duration, time);
  }

  private scheduleBackingForBeat(absoluteBeat: number, beatStartTime: number, beatDuration: number) {
    const positionInLoop = absoluteBeat % this.loopLengthBeats;
    const windowEnd = positionInLoop + 1;
    for (const event of this.activeEvents) {
      if (event.beatTime >= positionInLoop && event.beatTime < windowEnd) {
        const offset = (event.beatTime - positionInLoop) * beatDuration;
        const eventTime = beatStartTime + offset;
        if (event.type === 'bass') {
          this.playBass(eventTime, event.freqs[0], event.duration * beatDuration);
        } else {
          this.playPiano(eventTime, event.freqs, event.duration * beatDuration);
        }
      }
    }
  }

  private scheduleRock(beat: number, time: number, duration: number) {
    const progIndex = this.measureCount % 4;
    let root: number, fifth: number, chord: number[];

    if (progIndex === 1) {
      root = this.notes['F2']; fifth = this.notes['C3'];
      chord = [this.notes['F3'], this.notes['A3'], this.notes['C4'], this.notes['E4']];
    } else if (progIndex === 3) {
      root = this.notes['G2']; fifth = this.notes['D3'];
      chord = [this.notes['G3'], this.notes['B3'], this.notes['D4'], this.notes['F4']];
    } else {
      root = this.notes['C2']; fifth = this.notes['G2'];
      chord = [this.notes['C4'], this.notes['E4'], this.notes['G4'], this.notes['B4']];
    }

    this.playBass(time, (beat === 0 || beat === 2) ? root : fifth, duration);
    if (beat === 0 || beat === 2) this.playPiano(time, chord, duration * 1.4);
  }

  private scheduleSwing(beat: number, time: number, duration: number) {
    const progIndex = this.measureCount % 4;
    let bassNote: number, chord: number[];

    if (progIndex === 0) {
      chord = [this.notes['F3'], this.notes['A3'], this.notes['C4']];
      if      (beat === 0) bassNote = this.notes['D3'];
      else if (beat === 1) bassNote = this.notes['E3'];
      else if (beat === 2) bassNote = this.notes['F3'];
      else                 bassNote = this.notes['F#3'];
    } else if (progIndex === 1) {
      chord = [this.notes['F3'], this.notes['B3'], this.notes['D4']];
      if      (beat === 0) bassNote = this.notes['G2'];
      else if (beat === 1) bassNote = this.notes['A2'];
      else if (beat === 2) bassNote = this.notes['B2'];
      else                 bassNote = this.notes['C3'];
    } else {
      chord = [this.notes['E4'], this.notes['G4'], this.notes['B4']];
      if      (beat === 0) bassNote = this.notes['C3'];
      else if (beat === 1) bassNote = this.notes['D3'];
      else if (beat === 2) bassNote = this.notes['E3'];
      else                 bassNote = progIndex === 2 ? this.notes['G3'] : this.notes['F#3'];
    }

    this.playBass(time, bassNote!, duration * 0.75);

    const swingOffset = duration * (2 / 3);
    const compPattern = this.measureCount % 3;

    if (compPattern === 0) {
      if (beat === 0) this.playPiano(time, chord, duration * 0.4);
      if (beat === 1) this.playPiano(time + swingOffset, chord, duration * 0.4);
    } else if (compPattern === 1) {
      if (beat === 0) this.playPiano(time + swingOffset, chord, duration * 0.4);
      if (beat === 2) this.playPiano(time, chord, duration * 0.4);
    } else {
      if (beat === 1 || beat === 3) this.playPiano(time, chord, duration * 0.4);
    }
  }
}

export const audioEngine = new AudioEngine();
