import { useSoundStore } from "@/store/sounds/soundStore";
import { BottomNav } from "@/components/common/BottomNav";
import "./Sounds.css";

interface SoundsProps {
  onBackClick: () => void;
  onTasksClick: () => void;
  onBrainDumpClick: () => void;
  onPomodoroClick: () => void;
}

export function Sounds({
  onBackClick,
  onTasksClick,
  onBrainDumpClick,
  onPomodoroClick,
}: SoundsProps) {
  const { isPlaying, activeSound, volume, togglePlay, setVolume, stopAll } =
    useSoundStore();

  return (
    <div className="app app-sounds-container">
      <header className="app-header app-header-subpage">
        <button
          className="header-icon-btn"
          onClick={onBackClick}
          title="Back to mode selection"
        >
          ←
        </button>
        <h1>Sounds</h1>
        <div className="header-actions"></div>
      </header>
      <main className="app-main">
        <div className="sounds-grid">
          <div className="sound-card">
            <div className="sound-icon-wrapper">
              <div className="sound-icon">🟤</div>
            </div>
            <h3>Brown Noise</h3>
            <p>Deep, ambient sound for focus</p>
            <button
              className={`sound-play-btn ${activeSound === "brown-noise" && isPlaying ? "playing" : ""}`}
              onClick={() => togglePlay("brown-noise")}
            >
              {activeSound === "brown-noise" && isPlaying ? (
                <>
                  <span className="btn-icon">⏸</span>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <span className="btn-icon">▶</span>
                  <span>Play</span>
                </>
              )}
            </button>
          </div>

          <div className="sound-card">
            <div className="sound-icon-wrapper">
              <div className="sound-icon">🌧️</div>
            </div>
            <h3>Rain Sound</h3>
            <p>Calming rain ambience</p>
            <button
              className={`sound-play-btn ${activeSound === "rain" && isPlaying ? "playing" : ""}`}
              onClick={() => togglePlay("rain")}
            >
              {activeSound === "rain" && isPlaying ? (
                <>
                  <span className="btn-icon">⏸</span>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <span className="btn-icon">▶</span>
                  <span>Play</span>
                </>
              )}
            </button>
          </div>
        </div>

        {isPlaying && (
          <div className="volume-control">
            <div className="volume-header">
              <label htmlFor="volume">Volume</label>
              <span className="volume-value">{volume}%</span>
            </div>
            <input
              id="volume"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="volume-slider"
            />
            <button className="stop-all-btn" onClick={stopAll}>
              ⏹ Stop Sound
            </button>
          </div>
        )}
      </main>
      <BottomNav
        activeMode="brain-dump"
        onTasksClick={onTasksClick}
        onBrainDumpClick={onBrainDumpClick}
        onPomodoroClick={onPomodoroClick}
      />
    </div>
  );
}
