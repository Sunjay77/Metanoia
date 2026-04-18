interface TopAppBarProps {
  onMenuClick?: () => void;
  onClearClick?: () => void;
}

export function TopAppBar({ onMenuClick, onClearClick }: TopAppBarProps) {
  return (
    <header className="top-app-bar">
      <button className="app-icon-btn" onClick={onMenuClick} title="Menu">
        ☰
      </button>
      <div className="app-title">VOID</div>
      <button className="app-icon-btn" onClick={onClearClick} title="Clear all">
        🗑
      </button>
    </header>
  );
}
