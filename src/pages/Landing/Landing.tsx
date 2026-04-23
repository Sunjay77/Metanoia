import { useEffect} from "react";
import { useSoundStore } from "@/store/sounds/soundStore";
import "./Landing.css";

interface LandingProps {
  onTasksSelect: () => void;
  onBrainDumpSelect: () => void;
  onPomodoroSelect: () => void;
}

export function Landing({
  onTasksSelect,
  onBrainDumpSelect,
  onPomodoroSelect,
}: LandingProps) {
  const { isPlaying, activeSound, volume, togglePlay, setVolume } =
    useSoundStore();

  const brownNoiseSelected = activeSound === "brown-noise";
  const brownNoisePlaying = brownNoiseSelected && isPlaying;

  useEffect(() => {
  }, []);
  return (
    <div className="app">
      <header className="app-header">
        <h1>Metanoia</h1>
        <p>A Change Of Mind</p>
      </header>
      <main className="app-main app-main-landing">
        <div className="modes-container">
          <div className="modes-grid">
            <button className="mode-card mode-square mode-tasks" onClick={onTasksSelect} title="Tasks">
              <div className="mode-icon">✓</div>
            </button>

            <button
              className="mode-card mode-square mode-brain-dump"
              onClick={onBrainDumpSelect}
              title="Brain Dump"
            >
              <div className="mode-icon">≡</div>
            </button>

            <button className="mode-card mode-square mode-pomodoro" onClick={onPomodoroSelect} title="Pomodoro">
              <div className="mode-icon">⏲</div>
            </button>

            <div className="mode-sound-group">
              <button
                className={`mode-card mode-square mode-sound ${brownNoisePlaying ? "active" : ""}`}
                onClick={() => togglePlay("brown-noise")}
                title={brownNoisePlaying ? "Stop brown noise" : "Play brown noise"}
              >
                <div className="mode-icon">
                  {brownNoisePlaying ? "⏸" : "▶"}
                </div>
              </button>
              <div className={`mode-sound-volume ${brownNoiseSelected ? "" : "mode-sound-volume-idle"}`}>
                <input
                  className="mode-sound-slider"
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
                />
                <span className="mode-sound-value">{volume}%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
