interface NoteCardProps {
  content: string;
  onDelete: () => void;
}

export function NoteCard({ content, onDelete }: NoteCardProps) {
  return (
    <div className="note-card">
      <div className="note-content">{content}</div>
      <button
        className="note-delete-btn"
        onClick={onDelete}
        title="Delete note"
      >
        ✕
      </button>
    </div>
  );
}
