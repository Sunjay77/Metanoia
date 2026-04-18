import { useBrainDumpStore } from "@/store/brainDump/brainDumpStore";
import { BottomNav } from "@/components/common/BottomNav";
import type { BrainDumpNote } from "@/store/brainDump/types";
import "./SavedBrainDumps.css";

interface SavedBrainDumpsProps {
  onBackClick: () => void;
  onTasksClick: () => void;
  onBrainDumpClick: () => void;
  onPomodoroClick: () => void;
}

export function SavedBrainDumps({
  onBackClick,
  onTasksClick,
  onBrainDumpClick,
  onPomodoroClick,
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
        onBrainDumpClick={onBrainDumpClick}
        onPomodoroClick={onPomodoroClick}
      />
    </div>
  );
}
