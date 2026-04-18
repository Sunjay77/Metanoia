import { useState, useEffect } from "react";
import type { AppMode } from "@/types";
import { Landing } from "./Landing/Landing";
import { Tasks } from "./Tasks/Tasks";
import { BrainDump } from "./BrainDump/BrainDump";

function App() {
  const [mode, setMode] = useState<AppMode>(() => {
    // Initialize from localStorage
    const saved = localStorage.getItem("appMode");
    if (saved === "tasks" || saved === "brain-dump") {
      return saved;
    }
    return "landing";
  });

  // Save mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("appMode", mode);
  }, [mode]);

  if (mode === "landing") {
    return (
      <Landing
        onTasksSelect={() => setMode("tasks")}
        onBrainDumpSelect={() => setMode("brain-dump")}
      />
    );
  }

  if (mode === "brain-dump") {
    return <BrainDump onTasksClick={() => setMode("tasks")} />;
  }

  return (
    <Tasks
      onBackClick={() => setMode("landing")}
      onBrainDumpClick={() => setMode("brain-dump")}
    />
  );
}

export default App;
