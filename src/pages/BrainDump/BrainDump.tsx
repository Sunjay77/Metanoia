import { useState } from "react";
import { useBrainDumpStore } from "@/store/brainDump/brainDumpStore";
import { BottomNav } from "@/components/common/BottomNav";
import { BrainDumpInput } from "@/components/brainDump/BrainDumpInput";
import "./BrainDump.css";

interface BrainDumpProps {
  onBackClick: () => void;
  onSavedNotesClick: () => void;
  onTasksClick: () => void;
}

export function BrainDump({
  onBackClick,
  onSavedNotesClick,
  onTasksClick,
}: BrainDumpProps) {
  const [inputValue, setInputValue] = useState("");
  const { addNote } = useBrainDumpStore();

  const handleSaveNote = () => {
    addNote(inputValue);
    setInputValue("");
  };

  return (
    <div className="app app-brain-dump-container">
      <header className="app-header app-header-subpage">
        <button
          className="header-icon-btn"
          onClick={onBackClick}
          title="Back to landing"
        >
          ←
        </button>
        <h1>Brain Dump</h1>
        <div className="header-actions">
          <button
            className="header-icon-btn"
            onClick={onSavedNotesClick}
            title="View saved notes"
          >
            Dumps
          </button>
        </div>
      </header>
      <main className="app-main">
        <BrainDumpInput
          value={inputValue}
          onChange={setInputValue}
          onSave={handleSaveNote}
        />
      </main>
      <BottomNav
        activeMode="brain-dump"
        onTasksClick={onTasksClick}
        onBrainDumpClick={() => {}}
      />
    </div>
  );
}
