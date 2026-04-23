import { create } from "zustand";
import { audioManager } from "@/utils/audioManager";
import { persist } from "zustand/middleware";

export interface SoundState {
  isPlaying: boolean;
  activeSound: "brown-noise" | "rain" | null;
  volume: number;
  togglePlay: (soundType: "brown-noise" | "rain") => void;
  stopAll: () => void;
  setVolume: (volume: number) => void;
}

// Load initial state from localStorage
const loadInitialState = () => {
  try {
    const saved = localStorage.getItem("soundStore");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Resume playing if there was an active sound
      if (parsed.isPlaying && parsed.activeSound) {
        console.log("Resuming sound:", parsed.activeSound);
        audioManager.playSound(parsed.activeSound, parsed.volume);
      }
      return parsed;
    }
  } catch (error) {
    console.log("Error loading sound state:", error);
  }
  return { isPlaying: false, activeSound: null, volume: 70 };
};

const initialState = loadInitialState();

export const useSoundStore = create<SoundState>()(
  persist(
    (set, get) => ({
      isPlaying: initialState.isPlaying,
      activeSound: initialState.activeSound,
      volume: initialState.volume,
      togglePlay: (soundType) => {
        const state = get();
        if (state.activeSound === soundType && state.isPlaying) {
          audioManager.stopSound(soundType);
          set({ isPlaying: false, activeSound: soundType });
        } else {
          if (state.activeSound && state.activeSound !== soundType) {
            audioManager.stopSound(state.activeSound);
          }
          audioManager.playSound(soundType, state.volume);
          set({ isPlaying: true, activeSound: soundType });
        }
      },
      stopAll: () => {
        audioManager.stopAll();
        set({ isPlaying: false, activeSound: null });
      },
      setVolume: (volume) => {
        const newVolume = Math.min(100, Math.max(0, volume));
        const state = get();
        if (state.activeSound) {
          audioManager.setVolume(state.activeSound, newVolume);
        }
        set({ volume: newVolume });
      },
    }),
    {
      name: "soundStore",
      version: 1,
    },
  ),
);
