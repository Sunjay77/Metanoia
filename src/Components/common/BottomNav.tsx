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
  const isTasksMode = activeMode === "tasks";

  return (
    <nav className="bottom-nav">
      <button
        className={`nav-item ${isTasksMode ? "nav-item-active" : ""}`}
        onClick={onTasksClick}
        title="Tasks"
      >
        <span className="nav-icon">✓</span>
        <span className="nav-label">TASKS</span>
      </button>
      <button
        className={`nav-item ${!isTasksMode ? "nav-item-active" : ""}`}
        onClick={onBrainDumpClick}
        title="Brain Dump"
      >
        <span className="nav-icon">≡</span>
        <span className="nav-label">BRAIN DUMP</span>
      </button>
    </nav>
  );
}
