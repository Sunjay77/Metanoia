import { useState } from "react";
import { useBrainDumpStore } from "@/store/brainDump/brainDumpStore";
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
    <div className="app app-brain-dump-container">
      <header className="app-header app-header-subpage">
        <button
          className="back-button"
          onClick={onTasksClick}
          title="Back to tasks"
        >
          ←
        </button>
        <h1>Brain Dump</h1>
      </header>
      <main className="app-main">
        <BrainDumpInput
          value={inputValue}
          onChange={setInputValue}
          onSave={handleSaveNote}
        />
        <NotesContainer notes={notes} onDeleteNote={removeNote} />
      </main>
      <BottomNav
        activeMode="brain-dump"
        onTasksClick={onTasksClick}
        onBrainDumpClick={() => {}} // Already on brain dump, do nothing
      />
    </div>
  );
}
