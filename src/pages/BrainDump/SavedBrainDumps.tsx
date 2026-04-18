import { useBrainDumpStore } from "@/store/brainDump/brainDumpStore";
import { BottomNav } from "@/components/common/BottomNav";
import type { BrainDumpNote } from "@/store/brainDump/types";

interface SavedBrainDumpsProps {
  onBackClick: () => void;
  onTasksClick: () => void;
}

const savedNotesStyles = `
.saved-brain-dump-container {
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
}

.saved-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--outline-variant);
}

.saved-header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
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

.saved-main {
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

.saved-notes-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.saved-note-item {
  padding: 1rem;
  background: var(--surface-container-lowest);
  border-left: 3px solid var(--primary);
  border-radius: var(--radius-sm);
  transition: var(--transition);
}

.saved-note-item:hover {
  background: var(--surface-container-low);
}

.saved-note-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 1rem;
}

.saved-note-time {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
}

.saved-note-delete {
  background: transparent;
  border: none;
  color: var(--danger);
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  flex-shrink: 0;
  transition: var(--transition);
}

.saved-note-delete:hover {
  opacity: 0.7;
}

.saved-note-content {
  color: var(--text-primary);
  font-size: 0.95rem;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
}

.empty-saved-notes {
  text-align: center;
  color: var(--text-muted);
  padding: 3rem 1rem;
  font-size: 0.95rem;
}

@media (max-width: 640px) {
  .saved-main {
    padding: 1rem;
  }

  .saved-header h1 {
    font-size: 1.25rem;
  }

  .saved-note-item {
    padding: 0.75rem;
  }
}
`;

export function SavedBrainDumps({
  onBackClick,
  onTasksClick,
}: SavedBrainDumpsProps) {
  const { notes, removeNote } = useBrainDumpStore();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <>
      <style>{savedNotesStyles}</style>
      <div className="app saved-brain-dump-container">
        <header className="saved-header">
          <button
            className="header-icon-btn"
            onClick={onBackClick}
            title="Back to input"
          >
            ←
          </button>
          <h1>Saved Notes</h1>
        </header>
        <main className="saved-main">
          {notes.length === 0 ? (
            <div className="empty-saved-notes">
              <p>No saved notes yet.</p>
              <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
                Go back and start saving your thoughts!
              </p>
            </div>
          ) : (
            <div className="saved-notes-list">
              {notes.map((note: BrainDumpNote) => (
                <div key={note.id} className="saved-note-item">
                  <div className="saved-note-header">
                    <span className="saved-note-time">
                      {formatDate(note.createdAt)}
                    </span>
                    <button
                      className="saved-note-delete"
                      onClick={() => removeNote(note.id)}
                      title="Delete note"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="saved-note-content">{note.content}</div>
                </div>
              ))}
            </div>
          )}
        </main>
        <BottomNav
          activeMode="brain-dump"
          onTasksClick={onTasksClick}
          onBrainDumpClick={() => {}}
        />
      </div>
    </>
  );
}
