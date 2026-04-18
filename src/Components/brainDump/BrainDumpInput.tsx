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
  const isEmpty = !value.trim();

  return (
    <div className="input-section">
      <textarea
        className="unstructured-input"
        placeholder="Dump your thoughts here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="input-footer">
        <button className="save-note-btn" onClick={onSave} disabled={isEmpty}>
          Save
          <br />
          Note
        </button>
      </div>
    </div>
  );
}
