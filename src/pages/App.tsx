import { useState, useMemo } from "react";
import type { AppMode } from "@/types";
import { Landing } from "./Landing/Landing";
import { Tasks } from "./Tasks/Tasks";
import { BrainDump } from "./BrainDump/BrainDump";
import { SavedBrainDumps } from "./BrainDump/SavedBrainDumps";

// Always start on landing page
const DEFAULT_MODE = "landing" as const;

function App() {
  const [mode, setMode] = useState<AppMode>(DEFAULT_MODE);

  const memoizedMode = useMemo(() => mode, [mode]);

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
          onBackClick={() => setMode("landing")}
          onSavedNotesClick={() => setMode("brain-dump-saved")}
          onTasksClick={() => setMode("tasks")}
        />
      ),
      "brain-dump-saved": (
        <SavedBrainDumps
          onBackClick={() => setMode("brain-dump")}
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
