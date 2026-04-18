interface BottomNavProps {
  activeMode: "tasks" | "brain-dump";
  onTasksClick: () => void;
}

export function BottomNav({ activeMode, onTasksClick }: BottomNavProps) {
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
      <button className="nav-item nav-item-active" title="Brain Dump" disabled>
        <span className="nav-icon">≡</span>
        <span className="nav-label">BRAIN DUMP</span>
      </button>
    </nav>
  );
}
