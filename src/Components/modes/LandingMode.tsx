interface LandingModeProps {
  onTasksSelect: () => void;
  onBrainDumpSelect: () => void;
}

export function LandingMode({
  onTasksSelect,
  onBrainDumpSelect,
}: LandingModeProps) {
  return (
    <div className="app">
      <header className="app-header">
        <h1>A Change Of Mind</h1>
      </header>
      <main className="app-main app-main-landing">
        <div className="modes-container">
          <button className="mode-card mode-tasks" onClick={onTasksSelect}>
            <div className="mode-icon">✓</div>
            <div className="mode-content">
              <span className="mode-label">MODE 01</span>
              <h2>Tasks</h2>
              <p>Radical clarity for your immediate focus</p>
            </div>
            <div className="mode-arrow">→</div>
          </button>

          <button
            className="mode-card mode-brain-dump"
            onClick={onBrainDumpSelect}
          >
            <div className="mode-icon">≡</div>
            <div className="mode-content">
              <span className="mode-label">MODE 02</span>
              <h2>Brain Dump</h2>
              <p>Unstructured space. Let ideas breathe</p>
            </div>
            <div className="mode-arrow">→</div>
          </button>
        </div>
      </main>
    </div>
  );
}
