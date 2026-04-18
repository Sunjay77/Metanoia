import { create } from "zustand";
import { audioManager } from "@/utils/audioManager";

export interface SoundState {
  isPlaying: boolean;
  activeSound: "brown-noise" | "rain" | null;
  volume: number;
  togglePlay: (soundType: "brown-noise" | "rain") => void;
  stopAll: () => void;
  setVolume: (volume: number) => void;
}

export const useSoundStore = create<SoundState>((set, get) => ({
  isPlaying: false,
  activeSound: null,
  volume: 70,
  togglePlay: (soundType) => {
    const state = get();
    if (state.activeSound === soundType && state.isPlaying) {
      audioManager.stopSound(soundType);
      set({ isPlaying: false, activeSound: null });
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
}));
