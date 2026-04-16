import { LevelMap, RouletteItem } from "./types";

const createItem = (label: string, source: string, tempo?: string): RouletteItem => ({
  id: `${source}-${label}`.replace(/\s+/g, "-").toLowerCase(),
  label,
  source,
  tempo,
});

export const SARCASTIC_QUOTES = [
  "Oooohhhh, tough draw!",
  "The last student who drew this one is still crying.",
  "I thought we removed this option?!",
  "My condolences.",
  "Have you considered switching majors?",
  "This one builds character. And tendonitis.",
  "I hope you practiced your slow tempos.",
  "Don't worry, nobody plays this one perfectly.",
  "Ah, a classic. A terrible, difficult classic.",
  "Better warm up those wrists.",
  "Oh look, the one everyone skips.",
  "This is what we call a 'learning opportunity'.",
  "Good luck. You'll need it.",
  "Technically possible. Musically? We'll see.",
  "RIP your GPA.",
  "I'd offer help, but I can't play this one either.",
  "Maybe it's not too late to fake an illness?",
];

export const PERCUSSION_DATA: LevelMap = {
  "Snare Deficient": {
    "Roll Rudiments": [
      createItem("1. Single Stroke Roll", "Roll Rudiments", "quarter = 80"),
      createItem("2. Single Stroke Four", "Roll Rudiments", "quarter = 114"),
      createItem("3. Single Stroke Seven", "Roll Rudiments", "quarter = 128"),
      createItem("4. Multiple Bounce", "Roll Rudiments", "quarter = 120"),
      createItem("5. Triple Stroke Roll", "Roll Rudiments", "quarter = 100"),
      createItem("6. Double Stroke Open Roll", "Roll Rudiments", "quarter = 100"),
      createItem("7. Five Stroke Roll", "Roll Rudiments", "quarter = 100"),
      createItem("8. Six Stroke Roll", "Roll Rudiments", "quarter = 100"),
      createItem("9. Seven Stroke Roll", "Roll Rudiments", "quarter = 75/100"),
      createItem("10. Nine Stroke Roll", "Roll Rudiments", "quarter = 100"),
      createItem("11. Ten Stroke Roll", "Roll Rudiments", "quarter = 100"),
      createItem("12. Eleven Stroke Roll", "Roll Rudiments", "quarter = 100"),
      createItem("13. Thirteen Stroke Roll", "Roll Rudiments", "quarter = 100"),
      createItem("14. Fifteen Stroke Roll", "Roll Rudiments", "quarter = 100"),
      createItem("15. Seventeen Stroke Roll", "Roll Rudiments", "quarter = 100"),
    ],
    "Diddle Rudiments": [
      createItem("16. Single Paradiddle", "Diddle Rudiments", "quarter = 150"),
      createItem("17. Double Paradiddle", "Diddle Rudiments", "dotted-quarter = 88"),
      createItem("18. Triple Paradiddle", "Diddle Rudiments", "quarter = 130"),
      createItem("19. Single Paradiddle-Diddle", "Diddle Rudiments", "dotted-quarter = 94"),
    ],
    "Flam Rudiments": [
      createItem("20. Flam", "Flam Rudiments", "quarter = 250"),
      createItem("21. Flam Accent", "Flam Rudiments", "dotted-quarter = 112"),
      createItem("22. Flam Tap", "Flam Rudiments", "quarter = 104"),
      createItem("23. Flamacue", "Flam Rudiments", "quarter = 110"),
      createItem("24. Flam Paradiddle", "Flam Rudiments", "quarter = 88"),
      createItem("25. Single Flammed Mill", "Flam Rudiments", "quarter = 88"),
      createItem("26. Flam Paradiddle-diddle", "Flam Rudiments", "dotted-quarter = 60"),
      createItem("27. Pataflafla", "Flam Rudiments", "quarter = 70"),
      createItem("28. Swiss Army Triplet", "Flam Rudiments", "quarter = 78"),
      createItem("29. Inverted Flam Tap", "Flam Rudiments", "quarter = 74"),
      createItem("30. Flam Drag", "Flam Rudiments", "dotted-quarter = 98"),
    ],
    "Drag Rudiments": [
      createItem("31. Drag", "Drag Rudiments", "quarter = 144"),
      createItem("32. Single Drag Tap", "Drag Rudiments", "quarter = 140"),
      createItem("33. Double Drag Tap", "Drag Rudiments", "dotted-quarter = 70"),
      createItem("34. Lesson 25", "Drag Rudiments", "quarter = 100"),
      createItem("35. Single Dragaddidle", "Drag Rudiments", "quarter = 106"),
      createItem("36. Drag Paradiddle #1", "Drag Rudiments", "dotted-quarter = 68"),
      createItem("37. Drag Paradiddle #2", "Drag Rudiments", "dotted-quarter = 90"),
      createItem("38. Single Ratamacue", "Drag Rudiments", "quarter = 90"),
      createItem("39. Double Ratamacue", "Drag Rudiments", "dotted-quarter = 58"),
      createItem("40. Triple Ratamacue", "Drag Rudiments", "quarter = 90"),
    ],
    "Rudimental Workshop": [
      "Relax and Roll With It","S.S. IV","Wormey Singlets","Long Roll Samba","High Five",
      "Six Stroke Sally","Seven","Number Nine","Ten Pin","Eleven",
      "Thirteenth Floor","Funky and Fifteen","The Longest Roll","Buzz Me Up","Stroke3",
      "Back That Diddle Up","Double P","It's a Triple Paradiddle","S.P.D.","Flam the P's",
      "Triple Whip","One Fine Drag (a Diddle)","D.P. #1","D.P. #2","Flam-Bam!",
      "Flam Accent Groove","Flam Taps in Space","'Cue It Up","Pretty Fla","Swiss Army Triplets",
      "A Familiar Mill","Inverted Malf Pat","Year of the Dragon","Etude S.D.I.","Etude D.D.T",
      "This Flam's No Drag","Not Less Than 25","Cool Maque","Double Raton","Triple Ratón",
    ].map((label) => createItem(label, "Rudimental Workshop")),
    "Portraits in Rhythm": [
      createItem("Etude 1", "Portraits in Rhythm"),
      createItem("Etude 2", "Portraits in Rhythm"),
      createItem("Etude 4", "Portraits in Rhythm"),
      createItem("Etude 5", "Portraits in Rhythm"),
      createItem("Etude 8", "Portraits in Rhythm"),
    ],
  },
  "Snare 1": {
    "Roll Rudiments": [
      createItem("1. Single Stroke Roll", "Roll Rudiments", "quarter = 90"),
      createItem("2. Single Stroke Four", "Roll Rudiments", "quarter = 162"),
      createItem("3. Single Stroke Seven", "Roll Rudiments", "quarter = 144"),
      createItem("4. Multiple Bounce", "Roll Rudiments", "quarter = 120"),
      createItem("5. Triple Stroke Roll", "Roll Rudiments", "quarter = 120"),
      createItem("6. Double Stroke Open Roll", "Roll Rudiments", "quarter = 120"),
      createItem("7. Five Stroke Roll", "Roll Rudiments", "quarter = 125"),
      createItem("8. Six Stroke Roll", "Roll Rudiments", "quarter = 120"),
      createItem("9. Seven Stroke Roll", "Roll Rudiments", "quarter = 95/120"),
      createItem("10. Nine Stroke Roll", "Roll Rudiments", "quarter = 120"),
      createItem("11. Ten Stroke Roll", "Roll Rudiments", "quarter = 120"),
      createItem("12. Eleven Stroke Roll", "Roll Rudiments", "quarter = 120"),
      createItem("13. Thirteen Stroke Roll", "Roll Rudiments", "quarter = 120"),
      createItem("14. Fifteen Stroke Roll", "Roll Rudiments", "quarter = 120"),
      createItem("15. Seventeen Stroke Roll", "Roll Rudiments", "quarter = 120"),
    ],
    "Diddle Rudiments": [
      createItem("16. Single Paradiddle", "Diddle Rudiments", "quarter = 180"),
      createItem("17. Double Paradiddle", "Diddle Rudiments", "dotted-quarter = 104"),
      createItem("18. Triple Paradiddle", "Diddle Rudiments", "quarter = 160"),
      createItem("19. Single Paradiddle-Diddle", "Diddle Rudiments", "dotted-quarter = 120"),
    ],
    "Flam Rudiments": [
      createItem("20. Flam", "Flam Rudiments", "quarter = 300"),
      createItem("21. Flam Accent", "Flam Rudiments", "dotted-quarter = 160"),
      createItem("22. Flam Tap", "Flam Rudiments", "quarter = 124"),
      createItem("23. Flamacue", "Flam Rudiments", "quarter = 130"),
      createItem("24. Flam Paradiddle", "Flam Rudiments", "quarter = 108"),
      createItem("25. Single Flammed Mill", "Flam Rudiments", "quarter = 108"),
      createItem("26. Flam Paradiddle-diddle", "Flam Rudiments", "dotted-quarter = 78"),
      createItem("27. Pataflafla", "Flam Rudiments", "quarter = 106"),
      createItem("28. Swiss Army Triplet", "Flam Rudiments", "quarter = 100"),
      createItem("29. Inverted Flam Tap", "Flam Rudiments", "quarter = 100"),
      createItem("30. Flam Drag", "Flam Rudiments", "dotted-quarter = 122"),
    ],
    "Drag Rudiments": [
      createItem("31. Drag", "Drag Rudiments", "quarter = 208"),
      createItem("32. Single Drag Tap", "Drag Rudiments", "quarter = 170"),
      createItem("33. Double Drag Tap", "Drag Rudiments", "dotted-quarter = 86"),
      createItem("34. Lesson 25", "Drag Rudiments", "quarter = 124"),
      createItem("35. Single Dragaddidle", "Drag Rudiments", "quarter = 120"),
      createItem("36. Drag Paradiddle #1", "Drag Rudiments", "dotted-quarter = 82"),
      createItem("37. Drag Paradiddle #2", "Drag Rudiments", "dotted-quarter = 120"),
      createItem("38. Single Ratamacue", "Drag Rudiments", "quarter = 114"),
      createItem("39. Double Ratamacue", "Drag Rudiments", "dotted-quarter = 62"),
      createItem("40. Triple Ratamacue", "Drag Rudiments", "quarter = 112"),
    ],
    "Rudimental Workshop": [
      "Relax and Roll With It","S.S. IV","Wormey Singlets","Long Roll Samba","High Five",
      "Six Stroke Sally","Seven","Number Nine","Ten Pin","Eleven",
      "Thirteenth Floor","Funky and Fifteen","The Longest Roll","Buzz Me Up","Stroke3",
      "Back That Diddle Up","Double P","It's a Triple Paradiddle","S.P.D.","Flam the P's",
      "Triple Whip","One Fine Drag (a Diddle)","D.P. #1","D.P. #2","Flam-Bam!",
      "Flam Accent Groove","Flam Taps in Space","'Cue It Up","Pretty Fla","Swiss Army Triplets",
      "A Familiar Mill","Inverted Malf Pat","Year of the Dragon","Etude S.D.I.","Etude D.D.T",
      "This Flam's No Drag","Not Less Than 25","Cool Maque","Double Raton","Triple Ratón",
    ].map((label) => createItem(label, "Rudimental Workshop")),
    "All-American Drummer": [
      "Etude 127","Etude 128","Etude 129","Etude 132","Etude 133","Etude 134",
      "Etude 135","Etude 136","Etude 137","Etude 138","Etude 139","Etude 141",
      "Etude 142","Etude 143","Etude 144","Etude 145","Etude 146","Etude 149","Etude 150",
    ].map((label) => createItem(label, "All-American Drummer")),
    "Portraits in Rhythm": [
      18,19,20,21,24,25,27,28,29,30,31,34,36,37,38,39,40,50,
    ].map((num) => createItem(`Etude ${num}`, "Portraits in Rhythm")),
  },
  "Snare 2": {
    "Contemporary Studies": [
      1,2,6,9,14,16,17,21,24,28,29,31,32,37,40,43,58,62,
    ].map((num) => createItem(`Etude ${num}`, "Contemporary Studies")),
    "Advanced Snare Drum Studies": [
      1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,25,
    ].map((num) => createItem(`Etude ${num}`, "Advanced Snare Drum Studies")),
  },

  // ── Keyboard Percussion ────────────────────────────────────────────

  "Mallet Deficient": {
    "Instruction Course for Xylophone": [
      "Lesson 1","Lesson 2","Lesson 3","Lesson 4","Lesson 5","Lesson 6",
    ].map((label) => createItem(label, "Instruction Course for Xylophone")),
    "Reading Mallet Percussion": [
      "Pages 5-24","Pages 25-33","Pages 34-40","Pages 41-50","Pages 51-61",
      "Pages 62-73","Pages 74-84","Pages 85-98","Pages 99-114",
      "Pages 115-119","Pages 120-125","Pages 136-139",
    ].map((label) => createItem(label, "Reading Mallet Percussion")),
  },

  "Mallet 1": {
    "Scales": [
      "Ionian (Major)","Aeolian (Natural Minor)","Harmonic Minor","Mixolydian",
      "Dorian","Lydian","Phrygian","Locrian","Whole tone",
      "Major Pentatonic","Minor Pentatonic","Blues",
    ].map((label) => createItem(label, "Scales")),
    "Arpeggios": [
      "Major Triad","Major 6","Minor Triad","Dominant 7","Minor 7",
      "Dominant 13(#11)","Minor 11","Diminished Triad","Augmented Triad",
      "Major 7","Half-Diminished 7","Fully-Diminished 7",
    ].map((label) => createItem(label, "Arpeggios")),
    "Scale & Arpeggio Keys": [
      "C","C#","D","D#","E","F","F#","G","G#","A","Bb","B",
    ].map((label) => createItem(label, "Scale & Arpeggio Keys")),
    "Instruction Course for Xylophone": [
      "Lesson 7","Lesson 8","Lesson 9","Lesson 10","Lesson 11","Lesson 12",
      "Lesson 13","Lesson 14","Lesson 15","Lesson 16","Lesson 17","Lesson 18",
    ].map((label) => createItem(label, "Instruction Course for Xylophone")),
    "Second Book of Practical Studies": [
      75,77,79,82,84,86,93,96,107,115,
    ].map((num) => createItem(`Etude ${num}`, "Second Book of Practical Studies")),
    "Double + Triple Laterals": [
      "Permutation 1","Permutation 2","Permutation 3","Permutation 4",
      "Permutation 5","Permutation 6","Permutation 7","Permutation 8",
    ].map((label) => createItem(label, "Double + Triple Laterals")),
    "Independent + Alternating Coordination": [
      "Permutation 9","Permutation 10","Permutation 11","Permutation 12","Permutation 13",
    ].map((label) => createItem(label, "Independent + Alternating Coordination")),
  },

  "Mallet 2": {
    "Instruction Course for Xylophone": [
      "Lesson 19","Lesson 20","Lesson 21","Lesson 22","Lesson 23","Lesson 24",
      "Lesson 25","Lesson 26","Lesson 27","Lesson 28","Lesson 29","Lesson 30",
    ].map((label) => createItem(label, "Instruction Course for Xylophone")),
    "Modern School": [
      "Page 53","Page 54","Page 55","Page 56","Page 57","Page 59","Page 60","Page 61",
    ].map((label) => createItem(label, "Modern School")),
    "Parallel/Contrary Interval": [
      "Perfect 5th","Tritone","Minor 6th","Perfect 4th","Major 6th",
      "Major 3rd","Minor 7th","Minor 3rd","Major 7th","Minor 2nd","Octaves",
    ].map((label) => createItem(label, "Parallel/Contrary Interval")),
    "Double + Triple Laterals": [
      "Permutation 1","Permutation 2","Permutation 3","Permutation 4",
      "Permutation 5","Permutation 6","Permutation 7","Permutation 8",
    ].map((label) => createItem(label, "Double + Triple Laterals")),
    "Independent + Alternating Coordination": [
      "Permutation 9","Permutation 10","Permutation 11","Permutation 12","Permutation 13",
    ].map((label) => createItem(label, "Independent + Alternating Coordination")),
  },

  "Mallet 3": {
    "Instruction Course for Xylophone": [
      "Lesson 31","Lesson 32","Lesson 33","Lesson 34","Lesson 35","Lesson 36",
      "Lesson 37","Lesson 38","Lesson 39","Lesson 40","Lesson 41","Lesson 42",
    ].map((label) => createItem(label, "Instruction Course for Xylophone")),
    "Guitar Studies": [
      1,2,3,4,5,6,7,8,9,10,
    ].map((num) => createItem(`Etude ${num}`, "Guitar Studies")),
    "Chord Progression Permutations": [
      "Permutation 14","Permutation 15","Permutations 16 + 17",
      "Permutations 18 + 19","Permutations 20 + 21","Permutations 22 + 23",
    ].map((label) => createItem(label, "Chord Progression Permutations")),
    "Chord Progression Keys": [
      "C","C#","D","D#","E","F","F#","G","G#","A","Bb","B",
    ].map((label) => createItem(label, "Chord Progression Keys")),
  },

  "Mallet 4": {
    "Chorale Studies": [
      1,2,3,4,5,6,7,8,9,11,
    ].map((num) => createItem(`Etude ${num}`, "Chorale Studies")),
    "Modern School": [
      "Etude V","Etude VIII","Etude X","Etude XI","Etude XIV","Etude XV",
      "Etude XX","Etude XXV","Etude XXXI","Etude XXXIII","Etude XXXV",
    ].map((label) => createItem(label, "Modern School")),
  },

  // ── Timpani ────────────────────────────────────────────────────────

  "Timpani Deficient": {
    "Pedal to the Kettle": [
      1,2,3,6,7,11,14,16,
    ].map((num) => createItem(`Etude ${num}`, "Pedal to the Kettle")),
    "Excerpts": [
      "Bach: Christmas Cantata",
      "Handel: Hallelujah Chorus",
      "Mozart: Magic Flute",
      "Beethoven: Egmont Overture",
      "Brahms: Academic Festival Overture",
      "Tchaikovsky: Romeo & Juliet",
    ].map((label) => createItem(label, "Excerpts")),
  },

  "Timpani 1": {
    "Pedal to the Kettle": [
      6,9,10,12,18,20,21,22,29,31,
    ].map((num) => createItem(`Etude ${num}`, "Pedal to the Kettle")),
    "Excerpts": [
      "Mozart: Symphony No. 39",
      "Beethoven: Symphony No. 1",
      "Beethoven: Symphony No. 7",
      "Beethoven: Symphony No. 9",
      "Brahms: Symphony No. 1",
      "Tchaikovsky: Symphony No. 4",
      "Strauss: Burleske",
    ].map((label) => createItem(label, "Excerpts")),
  },

  "Timpani 2": {
    "Pedal to the Kettle": [
      13,19,24,25,27,28,30,
    ].map((num) => createItem(`Etude ${num}`, "Pedal to the Kettle")),
    "Excerpts": [
      "Wagner: Götterdämmerung",
      "Mahler: Symphony No. 5",
      "Shostakovich: Symphony No. 1",
      "Elgar: Enigma Variations",
      "Hindemith: Symphonic Metamorphosis",
      "Schuman: New England Triptych",
      "Bartók: Concerto for Orchestra",
      "Barber: Medea's Meditation & Dance",
      "Stravinsky: Rite of Spring",
    ].map((label) => createItem(label, "Excerpts")),
  },

  // ── Vibraphone ─────────────────────────────────────────────────────

  "Vibe 1": {
    "Jazz Mallets: In Session": [
      "Freddie's Cousin",
      "Afro Blue",
      "12 in 6",
      "Now's the Time",
      "Rhythm Changes",
    ].map((label) => createItem(label, "Jazz Mallets: In Session")),
  },

  "Vibe 2": {
    "Voicing & Comping for Jazz Vibraphone": [
      "Ballad (Here's That Rainy Day)",
      "Medium Swing (Days of Wine & Roses)",
      "Fast Swing (All The Things You Are)",
      "Jazz Waltz (Bluesette)",
      "Bossa Nova (Waves)",
      "Samba (Blue Bossa)",
    ].map((label) => createItem(label, "Voicing & Comping for Jazz Vibraphone")),
  },
};
