// Simple HTML5 Audio Manager - Creates audio elements on demand with crossfade looping
export class AudioManager {
  private currentAudio: HTMLAudioElement | null = null;
  private nextAudio: HTMLAudioElement | null = null;
  private currentType: "brown-noise" | "rain" | null = null;
  private fadeInterval: number | null = null;

  // Get the base path for audio files (works in both web and APK builds)
  private getSoundPath(soundType: "brown-noise" | "rain"): string {
    const soundFile =
      soundType === "brown-noise" ? "brown_noise.mp3" : "rain_sound.mp3";

    // Try multiple paths to support different build environments:
    // 1. Absolute path - works in dev and most web builds
    // 2. Relative path - works in Cordova/APK builds
    // The browser will try each path and the error handler will log if all fail

    // For Cordova APK builds, we need to check if we're in a mobile app
    // and use the correct base URL
    if ((window as any).cordova) {
      // Running in Cordova app - use relative path from root
      return `./sounds/${soundFile}`;
    }

    // Web build - use absolute path
    return `/sounds/${soundFile}`;
  }

  playSound(soundType: "brown-noise" | "rain", volume: number = 0.5): void {
    // Stop the currently playing sound
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.src = "";
    }
    if (this.nextAudio) {
      this.nextAudio.pause();
      this.nextAudio.src = "";
    }
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    // Get the appropriate sound file
    const soundFile = this.getSoundPath(soundType);

    // Create new audio element
    const audio = new Audio();
    audio.src = soundFile;
    audio.loop = false;
    audio.volume = Math.max(0, Math.min(1, volume / 100));

    const normalizedVolume = Math.max(0, Math.min(1, volume / 100));

    // Setup event listeners
    let hasRetried = false;
    audio.addEventListener("error", () => {
      console.error(`✗ Failed to load ${soundType} from ${soundFile}`);

      // If Cordova app and first path failed, try alternative paths
      if ((window as any).cordova && !hasRetried) {
        hasRetried = true;
        console.log(`Retrying with alternative path...`);
        // Try alternative path
        audio.src = `./sounds/${soundType === "brown-noise" ? "brown_noise.mp3" : "rain_sound.mp3"}`;
        audio.play().catch(() => {
          console.error(`All paths failed for ${soundType}`);
        });
      }
    });

    audio.addEventListener("play", () => {
      console.log(`✓ Playing ${soundType}`);
    });

    // Crossfade looping: restart with fade before audio ends
    audio.addEventListener("timeupdate", () => {
      if (
        this.currentType === soundType &&
        this.currentAudio === audio &&
        audio.duration - audio.currentTime < 0.5 // Start fade 500ms before end
      ) {
        // Only create next audio if it doesn't exist yet
        if (!this.nextAudio) {
          const nextAudio = new Audio();
          nextAudio.src = soundFile;
          nextAudio.loop = false;
          nextAudio.volume = 0; // Start at 0 for crossfade
          this.nextAudio = nextAudio;

          // Start playing the next instance
          nextAudio.play().catch(() => {
            // Silently ignore
          });

          // Crossfade: fade out current, fade in next
          let fadeStep = 0;
          this.fadeInterval = setInterval(() => {
            fadeStep++;
            const fadeProgress = Math.min(fadeStep / 10, 1); // 100ms fade

            // Fade out current
            audio.volume = normalizedVolume * (1 - fadeProgress);
            // Fade in next
            nextAudio.volume = normalizedVolume * fadeProgress;

            if (fadeProgress >= 1) {
              // Fade complete
              if (this.fadeInterval) {
                clearInterval(this.fadeInterval);
                this.fadeInterval = null;
              }

              // Pause and reset old audio
              audio.pause();
              audio.src = "";

              // Make next audio the current
              this.currentAudio = nextAudio;
              this.nextAudio = null;
            }
          }, 10); // Update every 10ms for smooth fade
        }
      }
    });

    // Fallback: if ended event fires, restart
    audio.addEventListener("ended", () => {
      if (this.currentType === soundType && this.currentAudio === audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {
          // Silently ignore
        });
      }
    });

    // Store reference and play
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

  stopSound(soundType: "brown-noise" | "rain"): void {
    if (this.currentType === soundType && this.currentAudio) {
      if (this.fadeInterval) {
        clearInterval(this.fadeInterval);
        this.fadeInterval = null;
      }
      this.currentAudio.pause();
      this.currentAudio.src = "";
      this.currentAudio = null;
      if (this.nextAudio) {
        this.nextAudio.pause();
        this.nextAudio.src = "";
        this.nextAudio = null;
      }
      this.currentType = null;
    }
  }

  setVolume(soundType: "brown-noise" | "rain", volume: number): void {
    if (this.currentType === soundType && this.currentAudio) {
      this.currentAudio.volume = Math.max(0, Math.min(1, volume / 100));
      // Also update nextAudio if it exists and is fading in
      if (this.nextAudio && this.nextAudio.volume > 0) {
        this.nextAudio.volume = Math.max(0, Math.min(1, volume / 100));
      }
    }
  }

  stopAll(): void {
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.src = "";
      this.currentAudio = null;
    }
    if (this.nextAudio) {
      this.nextAudio.pause();
      this.nextAudio.src = "";
      this.nextAudio = null;
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
    try {
      const audioContext = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();

      // Create larger buffer for better brown noise quality
      const bufferSize = 16384;
      const brownNoiseBuffer = audioContext.createBuffer(
        1,
        bufferSize,
        audioContext.sampleRate
      );
      const brownNoiseOutput = brownNoiseBuffer.getChannelData(0);

      // Generate enhanced brown noise with multiple filtering passes
      let lastOut = 0;
      let lastLastOut = 0;
      
      for (let i = 0; i < bufferSize; i++) {
        // White noise
        const white = Math.random() * 2 - 1;
        
        // Apply multiple poles of filtering for smoother brown noise
        // Using cascaded integrators for better smoothing
        const filtered1 = (lastOut + 0.02 * white) / 1.02;
        const filtered2 = (lastLastOut + 0.01 * filtered1) / 1.01;
        
        brownNoiseOutput[i] = filtered2;
        lastLastOut = lastOut;
        lastOut = filtered2;
      }

      // Normalize the signal
      let max = 0;
      for (let i = 0; i < bufferSize; i++) {
        max = Math.max(max, Math.abs(brownNoiseOutput[i]));
      }
      if (max > 0) {
        for (let i = 0; i < bufferSize; i++) {
          brownNoiseOutput[i] = (brownNoiseOutput[i] / max) * 0.85;
        }
      }

      // Create a source from the brown noise buffer and loop it
      const source = audioContext.createBufferSource();
      const gainNode = audioContext.createGain();

      source.buffer = brownNoiseBuffer;
      source.loop = true;
      gainNode.gain.value = Math.max(0, Math.min(1, volume / 100));

      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      source.start(0);

      // Store the source and gain for later control
      (this as any).brownNoiseSource = source;
      (this as any).brownNoiseGain = gainNode;

      console.log("✓ Brown noise playing");
    } catch (error) {
      console.error("Error playing brown noise:", error);
    }
  }

  // Stop brown noise
  stopBrownNoise(): void {
    try {
      const source = (this as any).brownNoiseSource;
      if (source) {
        source.stop();
        (this as any).brownNoiseSource = null;
        (this as any).brownNoiseGain = null;
        console.log("✓ Brown noise stopped");
      }
    } catch (error) {
      console.error("Error stopping brown noise:", error);
    }
  }

  // Set brown noise volume
  setBrownNoiseVolume(volume: number): void {
    const gainNode = (this as any).brownNoiseGain;
    if (gainNode) {
      gainNode.gain.value = Math.max(0, Math.min(1, volume / 100));
    }
  }
}

export const audioManager = new AudioManager();
