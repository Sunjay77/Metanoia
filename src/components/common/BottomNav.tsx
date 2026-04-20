interface BottomNavProps {
  activeMode: "tasks" | "brain-dump" | "pomodoro";
  onTasksClick: () => void;
  onBrainDumpClick: () => void;
  onPomodoroClick: () => void;
}

export function BottomNav({
  activeMode,
  onTasksClick,
  onBrainDumpClick,
  onPomodoroClick,
}: BottomNavProps) {
  return (
    <nav className="bottom-nav">
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
      <button
        className={`nav-item ${activeMode === "pomodoro" ? "nav-item-active" : ""}`}
        onClick={onPomodoroClick}
        title="Pomodoro Timer"
      >
        <span className="nav-icon">⏲</span>
        <span className="nav-label">POMODORO</span>
      </button>
    </nav>
  );
}
