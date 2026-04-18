interface BrainDumpInputProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
}

export function BrainDumpInput({
  value,
  onChange,
  onSave,
}: BrainDumpInputProps) {
  const isTrimmedEmpty = !value.trim();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !isTrimmedEmpty) {
      e.preventDefault();
      onSave();
    }
  };

  return (
    <div className="input-section">
      <textarea
        className="unstructured-input"
        placeholder="Let Them..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="input-footer">
        <button
          className="save-note-btn"
          onClick={onSave}
          disabled={isTrimmedEmpty}
        >
          Save
          <br />
          Note
        </button>
      </div>
    </div>
  );
}
