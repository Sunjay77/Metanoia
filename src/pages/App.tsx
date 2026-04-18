import { useState } from "react";
import type { AppMode } from "@/types";
import { Landing } from "./Landing/Landing";
import { Tasks } from "./Tasks/Tasks";
import { BrainDump } from "./BrainDump/BrainDump";

function App() {
  const [mode, setMode] = useState<AppMode>("landing");

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

  return <Tasks onBackClick={() => setMode("landing")} />;
}

export default App;
