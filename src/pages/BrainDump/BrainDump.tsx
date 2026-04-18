import { useState } from "react";
import { useBrainDumpStore } from "@/store/brainDump/brainDumpStore";
import { BottomNav } from "@/components/common/BottomNav";
import { BrainDumpInput } from "@/components/brainDump/BrainDumpInput";
import { NotesContainer } from "@/components/brainDump/NotesContainer";

interface BrainDumpProps {
  onTasksClick: () => void;
}

const brainDumpStyles = `
/* Brain Dump Page Styles */
.app-brain-dump-container {
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
}

.app-header-subpage {
 display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--outline-variant);
}

.app-header-subpage h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  flex: 1;
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--text-primary);
  transition: var(--transition);
  flex-shrink: 0;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 1.5rem;
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
  padding-bottom: 80px;
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--surface-container-low);
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
  border: 1px solid var(--outline-variant);
}

.input-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.input-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.save-note-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(
    to bottom,
    var(--primary),
    var(--primary-container)
  );
  color: var(--on-primary);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  font-size: 0.875rem;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}

.save-note-btn:hover:not(:disabled) {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.save-note-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.notes-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-notes-message {
  text-align: center;
  color: var(--text-muted);
  padding: 2rem;
  font-size: 0.95rem;
}

.note-card {
  position: relative;
  padding: 1rem;
  background: var(--surface-container-lowest);
  border: 1px solid var(--outline-variant);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.note-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--primary);
}

.note-content {
  padding-right: 2rem;
  word-wrap: break-word;
  color: var(--text-primary);
  font-size: 0.95rem;
  line-height: 1.5;
}

.note-delete-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.5rem;
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  color: var(--danger);
  cursor: pointer;
  font-size: 1.25rem;
  transition: var(--transition);
}

.note-delete-btn:hover {
  background: rgba(186, 26, 26, 0.1);
}

@media (max-width: 640px) {
  .app-main {
    padding: 0.75rem;
  }

  .input-section {
    padding: 0.75rem;
    margin-bottom: 1rem;
  }

  .unstructured-input {
    min-height: 100px;
    font-size: 0.875rem;
  }

  .save-note-btn {
    padding: 0.625rem 1rem;
  }

  .note-card {
    padding: 0.75rem;
  }

  .app-title {
    font-size: 1rem;
  }
}
`;

export function BrainDump({ onTasksClick }: BrainDumpProps) {
  const [inputValue, setInputValue] = useState("");
  const { notes, addNote, removeNote } = useBrainDumpStore();

  const handleSaveNote = () => {
    addNote(inputValue);
    setInputValue("");
  };

  return (
    <>
      <style>{brainDumpStyles}</style>
      <div className="app app-brain-dump-container">
        <header className="app-header app-header-subpage">
          <button
            className="back-button"
            onClick={onTasksClick}
            title="Back to tasks"
          >
            ←
          </button>
          <h1>METANOIA</h1>
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
    </>
  );
}
