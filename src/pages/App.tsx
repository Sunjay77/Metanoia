import { useState, useMemo } from "react";
import type { AppMode } from "@/types";
import { useAudioCleanup } from "@/hooks/useAudioCleanup";
import { Landing } from "./Landing/Landing";
import { Tasks } from "./Tasks/Tasks";
import { BrainDump } from "./BrainDump/BrainDump";
import { SavedBrainDumps } from "./BrainDump/SavedBrainDumps";
import { Pomodoro } from "./Pomodoro/Pomodoro";

// Always start on landing page
const DEFAULT_MODE = "landing" as const;

function App() {
  const [mode, setMode] = useState<AppMode>(DEFAULT_MODE);

  // Enable audio cleanup for memory management
  useAudioCleanup();

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
