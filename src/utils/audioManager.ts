// Audio Manager with Web Audio API support for seamless procedural noise
export class AudioManager {
  private currentAudio: HTMLAudioElement | null = null;
  private currentType: "brown-noise" | "rain" | null = null;
  private audioContext: AudioContext | null = null;
  private noiseGainNode: GainNode | null = null;
  private noiseBufferSource: AudioBufferSourceNode | null = null;
  private rainGainNode: GainNode | null = null;

  // Get the base path for audio files (works in both web and APK builds)
  private getSoundPath(soundType: "brown-noise" | "rain"): string {
    const soundFile =
      soundType === "brown-noise" ? "brown_noise.mp3" : "rain_sound.mp3";

    // Try multiple paths to support different build environments:
    // 1. Absolute path - works in dev and most web builds
    // 2. Relative path - works in Cordova/APK builds
    if ((window as any).cordova) {
      return `./sounds/${soundFile}`;
    }
    return `/sounds/${soundFile}`;
  }

  // Generate brown noise using Web Audio API
  private generateBrownNoise(
    audioContext: AudioContext,
    duration: number = 10,
  ): AudioBuffer {
    const sampleRate = audioContext.sampleRate;
    const length = sampleRate * duration;
    const buffer = audioContext.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // Amplify to prevent it being too quiet
    }
    return buffer;
  }

  playSound(soundType: "brown-noise" | "rain", volume: number = 0.5): void {
    // Stop any currently playing sound
    this.stopSound(soundType);

    const normalizedVolume = Math.max(0, Math.min(1, volume / 100));

    if (soundType === "brown-noise") {
      // Use Web Audio API for brown noise - no clicks/pops from looping!
      try {
        this.audioContext =
          this.audioContext ||
          new (window.AudioContext || (window as any).webkitAudioContext)();

        // Create gain node for volume control
        this.noiseGainNode = this.audioContext.createGain();
        this.noiseGainNode.gain.value = normalizedVolume;
        this.noiseGainNode.connect(this.audioContext.destination);

        // Generate brown noise buffer (10 seconds)
        const buffer = this.generateBrownNoise(this.audioContext, 10);

        // Create looping buffer source for seamless playback
        this.noiseBufferSource = this.audioContext.createBufferSource();
        this.noiseBufferSource.buffer = buffer;
        this.noiseBufferSource.loop = true; // Loop the generated buffer
        this.noiseBufferSource.connect(this.noiseGainNode);
        this.noiseBufferSource.start(0);

        this.currentType = soundType;
        console.log("✓ Playing brown noise (procedural, no clicks)");
      } catch (error) {
        console.error("Error playing brown noise:", error);
      }
    } else {
      // Use HTML5 Audio for rain sound
      // Stop the currently playing audio
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio.src = "";
      }

      const soundFile = this.getSoundPath(soundType);
      const audio = new Audio();
      audio.src = soundFile;
      audio.loop = true;
      audio.volume = normalizedVolume;

      // Setup event listeners
      let hasRetried = false;
      audio.addEventListener("error", () => {
        console.error(`✗ Failed to load ${soundType} from ${soundFile}`);

        if ((window as any).cordova && !hasRetried) {
          hasRetried = true;
          console.log(`Retrying with alternative path...`);
          audio.src = `./sounds/rain_sound.mp3`;
          audio.play().catch(() => {
            console.error(`All paths failed for ${soundType}`);
          });
        }
      });

      audio.addEventListener("play", () => {
        console.log(`✓ Playing ${soundType}`);
      });

      this.currentAudio = audio;
      this.currentType = soundType;

      try {
        const playPromise = audio.play();
        if (playPromise) {
          playPromise.catch((err) => {
            console.error(`Error playing ${soundType}:`, err);
          });
        }
      } catch (error) {
        console.error(`Exception playing ${soundType}:`, error);
      }
    }
  }

  stopSound(soundType: "brown-noise" | "rain"): void {
    if (this.currentType === soundType) {
      if (soundType === "brown-noise") {
        // Stop Web Audio API brown noise
        if (this.noiseBufferSource) {
          try {
            this.noiseBufferSource.stop();
          } catch (e) {
            // Already stopped
          }
          this.noiseBufferSource = null;
        }
        if (this.noiseGainNode) {
          this.noiseGainNode.disconnect();
          this.noiseGainNode = null;
        }
      } else {
        // Stop HTML5 audio rain sound
        if (this.currentAudio) {
          this.currentAudio.pause();
          this.currentAudio.src = "";
          this.currentAudio = null;
        }
      }
      this.currentType = null;
    }
  }

  setVolume(soundType: "brown-noise" | "rain", volume: number): void {
    const normalizedVolume = Math.max(0, Math.min(1, volume / 100));

    if (this.currentType === soundType) {
      if (soundType === "brown-noise") {
        // Update Web Audio API brown noise volume
        if (this.noiseGainNode) {
          this.noiseGainNode.gain.setValueAtTime(
            normalizedVolume,
            this.audioContext?.currentTime || 0,
          );
        }
      } else {
        // Update HTML5 audio rain sound volume
        if (this.currentAudio) {
          this.currentAudio.volume = normalizedVolume;
        }
      }
    }
  }

  stopAll(): void {
    // Stop brown noise if playing
    if (this.currentType === "brown-noise") {
      if (this.noiseBufferSource) {
        try {
          this.noiseBufferSource.stop();
        } catch (e) {
          // Already stopped
        }
        this.noiseBufferSource = null;
      }
      if (this.noiseGainNode) {
        this.noiseGainNode.disconnect();
        this.noiseGainNode = null;
      }
    }
    // Stop rain sound if playing
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.src = "";
      this.currentAudio = null;
    }
    this.currentType = null;
  }

  // Play customizable alarm sound using Web Audio API
  playAlarmWithVolume(volume: number = 0.5): void {
    try {
      const audioContext = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
      const now = audioContext.currentTime;
      const volumeGain = Math.max(0, Math.min(1, volume / 100));

      // Create oscillators for a pleasant beep alarm
      const oscillators: OscillatorNode[] = [];
      const gains: GainNode[] = [];

      // Triple beep pattern with frequency sweep for better perception
      for (let beep = 0; beep < 3; beep++) {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        // Varying frequency for each beep
        osc.frequency.value = 800 + beep * 100; // 800Hz, 900Hz, 1000Hz
        osc.type = "sine";

        const beepStart = now + beep * 0.5; // 500ms between beeps
        const beepDuration = 0.3; // 300ms beep duration

        // Fade in
        gain.gain.setValueAtTime(0, beepStart);
        gain.gain.linearRampToValueAtTime(volumeGain, beepStart + 0.08);
        // Hold
        gain.gain.setValueAtTime(volumeGain, beepStart + beepDuration - 0.08);
        // Fade out
        gain.gain.linearRampToValueAtTime(0, beepStart + beepDuration);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start(beepStart);
        osc.stop(beepStart + beepDuration);

        oscillators.push(osc);
        gains.push(gain);
      }

      console.log("✓ Alarm sound played");
    } catch (error) {
      console.error("Error playing alarm:", error);
    }
  }

  release(soundType?: "brown-noise" | "rain"): void {
    if (!soundType || this.currentType === soundType) {
      this.stopAll();
    }
  }

  isAudioPlaying(soundType?: "brown-noise" | "rain"): boolean {
    if (!this.currentAudio) return false;
    if (!soundType) return !this.currentAudio.paused;
    return this.currentType === soundType && !this.currentAudio.paused;
  }

  getCurrentAudio(): "brown-noise" | "rain" | null {
    return this.currentType || null;
  }

  // Generate brown noise using Web Audio API with enhanced smoothness
  playBrownNoise(volume: number = 0.4): void {
    // Use the main playSound method instead
    this.playSound("brown-noise", volume * 100);
  }

  // Stop brown noise
  stopBrownNoise(): void {
    this.stopSound("brown-noise");
  }

  // Set brown noise volume
  setBrownNoiseVolume(volume: number): void {
    this.setVolume("brown-noise", volume);
  }
}

export const audioManager = new AudioManager();
