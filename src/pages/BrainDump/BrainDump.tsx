import { useState } from "react";
import { useBrainDumpStore } from "@/store/brainDump/brainDumpStore";
import { TopAppBar } from "@/components/common/TopAppBar";
import { BottomNav } from "@/components/common/BottomNav";
import { BrainDumpInput } from "@/components/brainDump/BrainDumpInput";
import { NotesContainer } from "@/components/brainDump/NotesContainer";
import "./BrainDump.css";

interface BrainDumpProps {
  onTasksClick: () => void;
}

export function BrainDump({ onTasksClick }: BrainDumpProps) {
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
