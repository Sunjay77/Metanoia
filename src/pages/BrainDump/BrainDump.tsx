import { useState } from "react";
import { useBrainDumpStore } from "@/store/brainDump/brainDumpStore";
import { BottomNav } from "@/components/common/BottomNav";
import { BrainDumpInput } from "@/components/brainDump/BrainDumpInput";
import { NotesContainer } from "@/components/brainDump/NotesContainer";

interface BrainDumpProps {
  onTasksClick: () => void;
  onSavedNotesClick: () => void;
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
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--outline-variant);
}

.app-header-subpage h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
  letter-spacing: 0.05em;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.header-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 1.25rem;
  color: var(--text-primary);
  transition: var(--transition);
  flex-shrink: 0;
}

.header-icon-btn:hover {
  background: var(--surface-container-low);
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 0 1.5rem 1.5rem 1.5rem;
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
  padding-bottom: 80px;
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0;
  background: transparent;
  border-radius: 0;
  margin-bottom: 0;
  border: none;
}

.unstructured-input {
  width: 100%;
  min-height: 150px;
  padding: 1rem;
  background: var(--surface-container-lowest);
  border: 1px solid var(--outline-variant);
  border-radius: var(--radius-md);
  font-family: "Inter", inherit;
  font-size: 1rem;
  color: var(--text-primary);
  line-height: 1.6;
  resize: vertical;
  transition: var(--transition);
}

.unstructured-input:focus {
  outline: none;
  border-color: var(--primary);
  background: var(--surface-container-low);
}

.unstructured-input::placeholder {
  color: var(--text-muted);
}

.input-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.save-note-btn {
  padding: 0.75rem 1.5rem;
  background: var(--primary);
  color: var(--on-primary);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  font-size: 0.875rem;
  transition: var(--transition);
  min-width: 100px;
}

.save-note-btn:hover:not(:disabled) {
  background: var(--primary-container);
  color: var(--on-primary-container);
}

.save-note-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.notes-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 2rem;
}

.notes-section-header {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.empty-notes-message {
  text-align: center;
  color: var(--text-muted);
  padding: 2rem 1rem;
  font-size: 0.95rem;
}

.note-card {
  position: relative;
  padding: 1rem;
  background: var(--surface-container-lowest);
  border-left: 3px solid var(--primary);
  border-radius: var(--radius-sm);
  transition: var(--transition);
}

.note-card:hover {
  background: var(--surface-container-low);
}

.note-content {
  padding-right: 2.5rem;
  word-wrap: break-word;
  color: var(--text-primary);
  font-size: 0.95rem;
  line-height: 1.5;
  white-space: pre-wrap;
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
  flex-shrink: 0;
}

.note-delete-btn:hover {
  opacity: 0.7;
}

@media (max-width: 640px) {
  .app-main {
    padding: 0 1rem 1rem 1rem;
  }

  .app-header-subpage h1 {
    font-size: 1.25rem;
  }

  .unstructured-input {
    min-height: 120px;
    font-size: 0.95rem;
  }

  .save-note-btn {
    padding: 0.625rem 1rem;
    font-size: 0.8rem;
  }

  .note-card {
    padding: 0.75rem;
  }
}
`;

export function BrainDump({ onTasksClick, onSavedNotesClick }: BrainDumpProps) {
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
            className="header-icon-btn"
            onClick={onTasksClick}
            title="Back to tasks"
          >
            ←
          </button>
          <h1>Brain Dump</h1>
          <div className="header-actions">
            {notes.length > 0 && (
              <button
                className="header-icon-btn"
                onClick={onSavedNotesClick}
                title="View saved notes"
              >
                Dumps
              </button>
            )}
          </div>
        </header>
        <main className="app-main">
          <BrainDumpInput
            value={inputValue}
            onChange={setInputValue}
            onSave={handleSaveNote}
          />
          {notes.length > 0 && (
            <>
              <div className="notes-section-header">Recent Notes</div>
              <NotesContainer
                notes={notes.slice(0, 5)}
                onDeleteNote={removeNote}
              />
            </>
          )}
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
