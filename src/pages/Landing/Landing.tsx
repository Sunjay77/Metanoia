interface LandingProps {
  onTasksSelect: () => void;
  onBrainDumpSelect: () => void;
}

const landingStyles = `
/* Landing Page Styles */
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.app-header {
  margin-bottom: 2.5rem;
  text-align: center;
  width: 100%;
}

.app-header h1 {
  font-size: 3.5rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-bottom: 0.5rem;
}

.app-header p {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0;
}

.app-main-landing {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
}

.modes-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.mode-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--surface-container-lowest);
  border: 1px solid var(--outline-variant);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
  animation: slideIn 0.3s ease-out;
}

.mode-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--primary);
  transform: translateY(-2px);
}

.mode-icon {
  min-width: 3rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  background: var(--primary);
  color: var(--on-primary);
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.mode-content {
  flex: 1;
}

.mode-label {
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  display: block;
  margin-bottom: 0.25rem;
}

.mode-card h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0.25rem 0;
}

.mode-card p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0.25rem 0 0 0;
}

.mode-arrow {
  font-size: 1.5rem;
  color: var(--text-muted);
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .app-header h1 {
    font-size: 2.5rem;
  }

  .mode-card {
    padding: 1.25rem;
  }

  .mode-icon {
    min-width: 2.5rem;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.25rem;
  }
}
`;

export function Landing({ onTasksSelect, onBrainDumpSelect }: LandingProps) {
  return (
    <>
      <style>{landingStyles}</style>
      <div className="app">
        <header className="app-header">
          <h1>A Change Of Mind</h1>
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
    </>
  );
}
