import { useState } from "react";
import type { AppMode } from "@/types";
import { LandingMode } from "@/components/modes/LandingMode";
import { TasksMode } from "@/components/modes/TasksMode";
import { BrainDumpMode } from "@/components/modes/BrainDumpMode";

function App() {
  const [mode, setMode] = useState<AppMode>("landing");

  if (mode === "landing") {
    return (
      <LandingMode
        onTasksSelect={() => setMode("tasks")}
        onBrainDumpSelect={() => setMode("brain-dump")}
      />
    );
  }

  if (mode === "brain-dump") {
    return <BrainDumpMode onTasksClick={() => setMode("tasks")} />;
  }

  return <TasksMode onBackClick={() => setMode("landing")} />;
}

export default App;
