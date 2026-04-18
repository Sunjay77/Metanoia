import { useState } from "react";
import { useBrainDumpStore } from "@/store";
import { TopAppBar, BottomNav } from "@/components/common";
import { BrainDumpInput, NotesContainer } from "@/components/brainDump";
import "./BrainDumpMode.css";

interface BrainDumpModeProps {
  onTasksClick: () => void;
}

export function BrainDumpMode({ onTasksClick }: BrainDumpModeProps) {
  const [inputValue, setInputValue] = useState("");
  const { notes, addNote, removeNote } = useBrainDumpStore();

  const handleSaveNote = () => {
    addNote(inputValue);
    setInputValue("");
  };

  return (
    <div className="app app-full-screen">
      <TopAppBar />
      <main className="brain-dump-main">
        <BrainDumpInput
          value={inputValue}
          onChange={setInputValue}
          onSave={handleSaveNote}
        />
        <NotesContainer notes={notes} onDeleteNote={removeNote} />
      </main>
      <BottomNav activeMode="brain-dump" onTasksClick={onTasksClick} />
    </div>
  );
}
