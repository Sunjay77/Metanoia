interface BrainDumpInputProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  disabled?: boolean;
}

export function BrainDumpInput({
  value,
  onChange,
  onSave,
  disabled,
}: BrainDumpInputProps) {
  return (
    <div className="input-section">
      <textarea
        className="unstructured-input"
        placeholder="Dump your thoughts here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="input-footer">
        <span className="input-label">UNSTRUCTURED INPUT</span>
        <button
          className="save-note-btn"
          onClick={onSave}
          disabled={disabled || !value.trim()}
        >
          Save
          <br />
          Note
        </button>
      </div>
    </div>
  );
}
