import { NoteCard } from "./NoteCard";
import type { BrainDumpNote } from "@/store/brainDump/types";

interface NotesContainerProps {
  notes: BrainDumpNote[];
  onDeleteNote: (id: number) => void;
}

export function NotesContainer({ notes, onDeleteNote }: NotesContainerProps) {
  return (
    <div className="notes-container">
      {notes.length === 0 ? (
        <div className="empty-notes-message">
          Your thoughts will appear here
        </div>
      ) : (
        notes.map((note) => (
          <NoteCard
            key={note.id}
            content={note.content}
            onDelete={() => onDeleteNote(note.id)}
          />
        ))
      )}
    </div>
  );
}
