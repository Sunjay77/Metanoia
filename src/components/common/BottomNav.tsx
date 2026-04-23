import { useSoundStore } from "@/store/sounds/soundStore";

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
  const { activeSound, volume, setVolume } = useSoundStore();

  const showBrownNoiseVolume = activeSound === "brown-noise";

  return (
    <nav className="bottom-nav">
      {showBrownNoiseVolume && (
        <div className="bottom-nav-audio">
          <span className="audio-label">Brown Noise</span>
          <input
            className="audio-slider"
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
          />
          <span className="audio-value">{volume}%</span>
        </div>
      )}
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
        <button
          className={`nav-item ${activeMode === "pomodoro" ? "nav-item-active" : ""}`}
          onClick={onPomodoroClick}
          title="Pomodoro Timer"
        >
          <span className="nav-icon">⏲</span>
          <span className="nav-label">POMODORO</span>
        </button>
      </div>
    </nav>
  );
}
