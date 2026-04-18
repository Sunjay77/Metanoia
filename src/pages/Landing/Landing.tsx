import "./Landing.css";

interface LandingProps {
  onTasksSelect: () => void;
  onBrainDumpSelect: () => void;
}

export function Landing({ onTasksSelect, onBrainDumpSelect }: LandingProps) {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Metanoia</h1>
        <p>A Change Of Mind</p>
      </header>
      <main className="app-main app-main-landing">
        <div className="modes-container">
          <button className="mode-card mode-tasks" onClick={onTasksSelect}>
            <div className="mode-icon">✓</div>
            <div className="mode-content">
              <h2>Tasks</h2>
            </div>
            <div className="mode-arrow">→</div>
          </button>

          <button
            className="mode-card mode-brain-dump"
            onClick={onBrainDumpSelect}
          >
            <div className="mode-icon">≡</div>
            <div className="mode-content">
              <h2>Brain Dump</h2>
            </div>
            <div className="mode-arrow">→</div>
          </button>
        </div>
      </main>
    </div>
  );
}
