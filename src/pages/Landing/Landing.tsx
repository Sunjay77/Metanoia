import { useState } from "react";
import { audioManager } from "@/utils/audioManager";
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
  const [isPlayingBrownNoise, setIsPlayingBrownNoise] = useState(false);

  const handleBrownNoiseToggle = () => {
    if (isPlayingBrownNoise) {
      audioManager.stopBrownNoise();
      setIsPlayingBrownNoise(false);
    } else {
      audioManager.playBrownNoise(40); // 40% volume for better ambient
      setIsPlayingBrownNoise(true);
    }
  };
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

            <button
              className={`mode-card mode-square mode-sound ${isPlayingBrownNoise ? "active" : ""}`}
              onClick={handleBrownNoiseToggle}
              title={isPlayingBrownNoise ? "Stop brown noise" : "Play brown noise"}
            >
              <div className="mode-icon">
                {isPlayingBrownNoise ? "⏸" : "▶"}
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
