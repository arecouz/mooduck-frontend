// utils/sound.ts
// ---------------------------------------------------------------------
// Audio context
// ---------------------------------------------------------------------
const ctx =
  typeof window !== 'undefined'
    ? new (window.AudioContext || (window as any).webkitAudioContext)()
    : null;

// ---------------------------------------------------------------------
// Utility – create gain envelope
// ---------------------------------------------------------------------
const applyEnvelope = (gainNode: GainNode, attack: number, decay: number, peak: number) => {
  const now = ctx!.currentTime;
  gainNode.gain.cancelScheduledValues(now);
  gainNode.gain.setValueAtTime(0.0001, now);
  gainNode.gain.exponentialRampToValueAtTime(peak, now + attack);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay);
};

// ---------------------------------------------------------------------
// CLEAN UI — soft, subtle, modern
// ---------------------------------------------------------------------
export const playCleanUI = (freq: number) => {
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.value = freq;

  applyEnvelope(gain, 0.01, 0.15, 0.18);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.2);
};

// ---------------------------------------------------------------------
// NINTENDO — triangle wave + alternating pitch + warm LPF
// ---------------------------------------------------------------------
export const playNintendo = (freq: number, index: number) => {
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  const modFreq = index % 2 === 0 ? freq : freq + 60;

  osc.type = 'triangle';
  osc.frequency.value = modFreq;

  filter.type = 'lowpass';
  filter.frequency.value = 2500; // very Nintendo-ish

  applyEnvelope(gain, 0.008, 0.1, 0.25);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.18);
};

// ---------------------------------------------------------------------
// CHIME — harmonic stack + shimmer delay (magical Zelda tone)
// ---------------------------------------------------------------------
export const playChime = (freq: number) => {
  if (!ctx) return;

  const fundamentals = [1, 2, 3];
  const gains = [0.22, 0.08, 0.03];

  fundamentals.forEach((mult, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = freq * mult;

    applyEnvelope(gain, 0.02, 0.45, gains[i]);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + i * 0.01); // slight shimmer
    osc.stop(ctx.currentTime + 0.5);
  });
};

// ---------------------------------------------------------------------
// PIXEL — harsh square wave + no filter (real 8-bit beep)
// ---------------------------------------------------------------------
export const playPixel = (freq: number) => {
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  osc.frequency.value = freq;

  applyEnvelope(gain, 0.003, 0.05, 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.08);
};

// ---------------------------------------------------------------------
// POWER CELL — sweeping “charging” sound (sci-fi)
// ---------------------------------------------------------------------
export const playPowerCell = (freq: number) => {
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Sweep from low → high
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(freq * 0.6, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(freq * 1.4, ctx.currentTime + 0.2);

  applyEnvelope(gain, 0.01, 0.25, 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.25);
};

export const playLevelUp = () => {
  const audio = new Audio('/sounds/level-up.mp3');
  audio.currentTime = 0;
  audio.play().catch(err => {
    console.warn('Could not play level-up sound', err);
  });
};
