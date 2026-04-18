import { useEffect } from "react";
import { audioManager } from "@/utils/audioManager";
import { useSoundStore } from "@/store/sounds/soundStore";

/**
 * Hook to properly manage audio resource cleanup
 * Ensures memory is released when component unmounts
 * Prevents memory leaks and battery drain
 */
export function useAudioCleanup() {
  const { stopAll } = useSoundStore();

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      stopAll();
      audioManager.release(); // Release all audio resources
    };
  }, [stopAll]);
}
