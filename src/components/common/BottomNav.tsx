interface BottomNavProps {
  activeMode: "tasks" | "brain-dump";
  onTasksClick: () => void;
  onBrainDumpClick: () => void;
}

export function BottomNav({
  activeMode,
  onTasksClick,
  onBrainDumpClick,
}: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-actions">
        <button
          className={`nav-item ${activeMode === "tasks" ? "nav-item-active" : ""}`}
          onClick={onTasksClick}
          title="Memory"
        >
          <span className="nav-icon">✓</span>
          <span className="nav-label">MEMORY</span>
        </button>
        <button
          className={`nav-item ${activeMode === "brain-dump" ? "nav-item-active" : ""}`}
          onClick={onBrainDumpClick}
          title="Brain Dump"
        >
          <span className="nav-icon">≡</span>
          <span className="nav-label">BRAIN DUMP</span>
        </button>
      </div>
    </nav>
  );
}
