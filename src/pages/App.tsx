import { useState, useEffect, useMemo } from "react";
import type { AppMode } from "@/types";
import { Landing } from "./Landing/Landing";
import { Tasks } from "./Tasks/Tasks";
import { BrainDump } from "./BrainDump/BrainDump";
import { SavedBrainDumps } from "./BrainDump/SavedBrainDumps";

const STORAGE_KEY = "appMode";
const DEFAULT_MODE = "landing" as const;

function App() {
  const [mode, setMode] = useState<AppMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved as AppMode) || DEFAULT_MODE;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const modeComponents = useMemo(
    () => ({
      landing: (
        <Landing
          onTasksSelect={() => setMode("tasks")}
          onBrainDumpSelect={() => setMode("brain-dump")}
        />
      ),
      tasks: (
        <Tasks
          onBackClick={() => setMode("landing")}
          onBrainDumpClick={() => setMode("brain-dump")}
        />
      ),
      "brain-dump": (
        <BrainDump
          onTasksClick={() => setMode("tasks")}
          onSavedNotesClick={() => setMode("brain-dump-saved")}
        />
      ),
      "brain-dump-saved": (
        <SavedBrainDumps
          onBackClick={() => setMode("brain-dump")}
          onTasksClick={() => setMode("tasks")}
        />
      ),
    }),
    [],
  );

  return modeComponents[mode];
}

export default App;
