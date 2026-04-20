import { useState, useEffect, useMemo } from "react";
import type { AppMode } from "@/types";
import { useAudioCleanup } from "@/hooks/useAudioCleanup";
import { Landing } from "./Landing/Landing";
import { Tasks } from "./Tasks/Tasks";
import { BrainDump } from "./BrainDump/BrainDump";
import { SavedBrainDumps } from "./BrainDump/SavedBrainDumps";
import { Pomodoro } from "./Pomodoro/Pomodoro";

const STORAGE_KEY = "appMode";
const SESSION_STORAGE_KEY = "appModeSession";
const DEFAULT_MODE = "landing" as const;

// Global fallback for app mode
let lastAppMode: AppMode = DEFAULT_MODE;

function App() {
  const [mode, setMode] = useState<AppMode>(() => {
    // Try to get from localStorage first
    const savedMode = localStorage.getItem(STORAGE_KEY);
    if (savedMode) {
      console.log("Restored from localStorage:", savedMode);
      lastAppMode = savedMode as AppMode;
      return savedMode as AppMode;
    }

    // Try to get from sessionStorage as fallback
    const sessionMode = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (sessionMode) {
      console.log("Restored from sessionStorage:", sessionMode);
      lastAppMode = sessionMode as AppMode;
      return sessionMode as AppMode;
    }

    // Try to get from memory fallback
    if (lastAppMode !== DEFAULT_MODE) {
      console.log("Restored from memory:", lastAppMode);
      return lastAppMode;
    }

    console.log("Defaulting to landing page");
    return DEFAULT_MODE;
  });

  // Enable audio cleanup for memory management
  useAudioCleanup();

  // Save app mode when it changes
  useEffect(() => {
    console.log("App mode changed to:", mode);
    lastAppMode = mode;

    // Save to multiple places for redundancy
    localStorage.setItem(STORAGE_KEY, mode);
    sessionStorage.setItem(SESSION_STORAGE_KEY, mode);

    // Also save to window object for accessibility
    (window as any).__appMode = mode;
  }, [mode]);

  // Handle Cordova app lifecycle events (Android/iOS)
  useEffect(() => {
    const handleDeviceReady = () => {
      console.log("Device ready - checking saved app mode");
      const savedMode = localStorage.getItem(STORAGE_KEY);
      if (savedMode) {
        console.log("Restoring mode after app resumed:", savedMode);
        setMode(savedMode as AppMode);
      }
    };

    const handleResume = () => {
      console.log("App resumed - restoring saved mode");
      const savedMode = localStorage.getItem(STORAGE_KEY);
      if (savedMode && savedMode !== "landing") {
        console.log("Restoring to previous page:", savedMode);
        setMode(savedMode as AppMode);
      }
    };

    // Listen for Cordova events
    if ((window as any).cordova) {
      document.addEventListener("deviceready", handleDeviceReady);
      document.addEventListener("resume", handleResume);

      return () => {
        document.removeEventListener("deviceready", handleDeviceReady);
        document.removeEventListener("resume", handleResume);
      };
    }
  }, []);

  const memoizedMode = useMemo(() => mode, [mode]);

  const modeComponents = useMemo(
    () => ({
      landing: (
        <Landing
          onTasksSelect={() => setMode("tasks")}
          onBrainDumpSelect={() => setMode("brain-dump")}
          onPomodoroSelect={() => setMode("pomodoro")}
        />
      ),
      tasks: (
        <Tasks
          onBackClick={() => setMode("landing")}
          onBrainDumpClick={() => setMode("brain-dump")}
          onPomodoroClick={() => setMode("pomodoro")}
        />
      ),
      "brain-dump": (
        <BrainDump
          onBackClick={() => setMode("landing")}
          onSavedNotesClick={() => setMode("brain-dump-saved")}
          onTasksClick={() => setMode("tasks")}
          onPomodoroClick={() => setMode("pomodoro")}
        />
      ),
      "brain-dump-saved": (
        <SavedBrainDumps
          onBackClick={() => setMode("brain-dump")}
          onTasksClick={() => setMode("tasks")}
          onBrainDumpClick={() => setMode("brain-dump")}
          onPomodoroClick={() => setMode("pomodoro")}
        />
      ),
      pomodoro: (
        <Pomodoro
          onBackClick={() => setMode("landing")}
          onTasksClick={() => setMode("tasks")}
          onBrainDumpClick={() => setMode("brain-dump")}
        />
      ),
    }),
    [],
  );

  return modeComponents[memoizedMode];
}

export default App;
