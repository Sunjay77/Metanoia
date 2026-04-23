import { useEffect, useRef, useState } from "react";
import { usePomodoro } from "@/store/pomodoro/pomodoroStore";
import { BottomNav } from "@/components/common/BottomNav";
import { audioManager } from "@/utils/audioManager";
import { notificationManager } from "@/utils/notificationManager";
import "./Pomodoro.css";

interface PomodoroProps {
  onBackClick: () => void;
  onTasksClick: () => void;
  onBrainDumpClick: () => void;
}

export function Pomodoro({
  onBackClick,
  onTasksClick,
  onBrainDumpClick,
}: PomodoroProps) {
  const {
    workDuration,
    breakDuration,
    alarmEnabled,
    alarmVolume,
    isRunning,
    timeLeft,
    isWorkSession,
    sessionsCompleted,
    setWorkDuration,
    setBreakDuration,
    setAlarmEnabled,
    setAlarmVolume,
    startSession,
    pauseSession,
    resumeSession,
    resetSession,
    decrementTimeLeft,
    syncTimeLeft,
    startBreak,
  } = usePomodoro();

  const [showSettings, setShowSettings] = useState(false);
  const [showBreakNotice, setShowBreakNotice] = useState(false);
  const [tempWorkDuration, setTempWorkDuration] = useState(workDuration);
  const [tempBreakDuration, setTempBreakDuration] = useState(breakDuration);
  const [tempAlarmEnabled, setTempAlarmEnabled] = useState(alarmEnabled);
  const [tempAlarmVolume, setTempAlarmVolume] = useState(alarmVolume);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const workNotificationId = useRef(3001);
  const breakNotificationId = useRef(3002);
  const prevIsRunning = useRef(isRunning);

  // Initialize notifications on component mount
  useEffect(() => {
    const initializeNotifications = async () => {
      // Always initialize the notification manager
      await notificationManager.initialize();

      // Check current permission status
      const hasPermission = await notificationManager.checkPermissions();
      console.log("Notification permission status:", hasPermission);
      setNotificationsEnabled(hasPermission);

      // On Cordova/Android, automatically request permission if not already granted
      if (!hasPermission) {
        console.log("Requesting notification permissions...");
        const granted = await notificationManager.requestPermissions();
        setNotificationsEnabled(granted);
        console.log("Permission request result:", granted);
      }
    };
    initializeNotifications().catch((err) =>
      console.error("Notification init error:", err),
    );
  }, []);

  const handleRequestNotificationPermission = async () => {
    const hasPermission = await notificationManager.requestPermissions();
    setNotificationsEnabled(hasPermission);
  };

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isRunning) {
      interval = setInterval(decrementTimeLeft, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, decrementTimeLeft]);

  // Schedule background notifications for session completion
  useEffect(() => {
    if (notificationsEnabled) {
      if (isRunning && !prevIsRunning.current && timeLeft > 0) {
        const endTime = new Date(Date.now() + timeLeft * 1000);
        if (isWorkSession) {
          notificationManager.scheduleNotification(
            workNotificationId.current,
            "Work Session Complete! 🎉",
            `Great work! Time for a ${breakDuration} minute break.`,
            endTime,
          );
        } else {
          notificationManager.scheduleNotification(
            breakNotificationId.current,
            "Break Complete! ⏰",
            `Time to get back to work for another ${workDuration} minute session.`,
            endTime,
          );
        }
      }

      if (!isRunning && prevIsRunning.current) {
        notificationManager.cancelNotification(workNotificationId.current);
        notificationManager.cancelNotification(breakNotificationId.current);
      }
    }

    prevIsRunning.current = isRunning;
  }, [
    isRunning,
    timeLeft,
    isWorkSession,
    notificationsEnabled,
    breakDuration,
    workDuration,
  ]);

  // Catch up timer when app returns to foreground (mobile + web)
  useEffect(() => {
    const handleVisibility = () => {
      if (!document.hidden) {
        syncTimeLeft();
      }
    };

    const handleResume = () => {
      syncTimeLeft();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    if ((window as any).cordova) {
      document.addEventListener("resume", handleResume);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      if ((window as any).cordova) {
        document.removeEventListener("resume", handleResume);
      }
    };
  }, [syncTimeLeft]);

  // Update Media Session notification with current timer
  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    if (isRunning && notificationsEnabled) {
      const sessionLabel = isWorkSession ? "Work" : "Break";
      audioManager.updateMediaSession(
        `${sessionLabel} Timer: ${formattedTime}`,
        true,
        `${sessionLabel} Session`,
      );
    } else if (notificationsEnabled && timeLeft > 0) {
      const sessionLabel = isWorkSession ? "Work" : "Break";
      audioManager.updateMediaSession(
        `${sessionLabel} Timer: ${formattedTime}`,
        false,
        `${sessionLabel} Session (Paused)`,
      );
    }
  }, [isRunning, timeLeft, isWorkSession, notificationsEnabled]);

  // Play alarm and show break notice when work session completes
  useEffect(() => {
    if (!isRunning && timeLeft === 0 && isWorkSession) {
      // Play alarm sound when work session completes if enabled
      if (alarmEnabled) {
        audioManager.playAlarmWithVolume(alarmVolume);
      }
      // Show notification on both web and Android APK
      if (notificationsEnabled) {
        notificationManager.showNotification(
          "Work Session Complete! 🎉",
          `Great work! Time for a ${breakDuration} minute break.`,
        );
      }
      // Show break notice instead of auto-starting break
      setShowBreakNotice(true);
    }
  }, [
    isRunning,
    timeLeft,
    isWorkSession,
    alarmEnabled,
    alarmVolume,
    notificationsEnabled,
    breakDuration,
  ]);

  // Play alarm when break ends
  useEffect(() => {
    if (!isRunning && timeLeft === 0 && !isWorkSession) {
      // Play alarm sound when break ends if enabled
      if (alarmEnabled) {
        audioManager.playAlarmWithVolume(alarmVolume);
      }
      // Show notification on both web and Android APK
      if (notificationsEnabled) {
        notificationManager.showNotification(
          "Break Complete! ⏰",
          `Time to get back to work for another ${workDuration} minute session.`,
        );
      }
    }
  }, [
    isRunning,
    timeLeft,
    isWorkSession,
    alarmEnabled,
    alarmVolume,
    notificationsEnabled,
    workDuration,
  ]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const handleStart = () => {
    if (!isRunning) {
      startSession();
    }
  };

  const handlePause = () => {
    if (isRunning) {
      pauseSession();
    }
  };

  const handleResume = () => {
    if (!isRunning && timeLeft > 0) {
      resumeSession();
    }
  };

  const handleReset = () => {
    resetSession();
    setShowSettings(false);
  };

  const handleSaveSettings = () => {
    setWorkDuration(tempWorkDuration);
    setBreakDuration(tempBreakDuration);
    setAlarmEnabled(tempAlarmEnabled);
    setAlarmVolume(tempAlarmVolume);
    setShowSettings(false);
  };

  const handleStartBreak = () => {
    setShowBreakNotice(false);
    startBreak();
  };

  const handleSkipBreak = () => {
    setShowBreakNotice(false);
    resetSession();
  };

  return (
    <div className="app app-pomodoro-container">
      <header className="app-header app-header-subpage">
        <button
          className="header-icon-btn"
          onClick={onBackClick}
          title="Back to mode selection"
        >
          ←
        </button>
        <h1>Pomodoro Timer</h1>
        <div className="header-actions">
          <button
            className="header-icon-btn"
            onClick={() => setShowSettings(!showSettings)}
            title="Settings"
          >
            ⚙
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="pomodoro-content">
          {!showSettings ? (
            <>
              <div className="timer-display">
                <div className="session-type">
                  {isWorkSession ? "Work Time" : "Break Time"}
                </div>
                <div className="timer-circle">
                  <div className="timer-value">{formattedTime}</div>
                </div>
                <div className="session-count">
                  Sessions completed: <span>{sessionsCompleted}</span>
                </div>
              </div>

              <div className="controls">
                {!isRunning &&
                timeLeft ===
                  (isWorkSession ? workDuration * 60 : breakDuration * 60) ? (
                  <button
                    className="control-btn control-btn-primary"
                    onClick={handleStart}
                  >
                    Start
                  </button>
                ) : isRunning ? (
                  <button
                    className="control-btn control-btn-warning"
                    onClick={handlePause}
                  >
                    Pause
                  </button>
                ) : (
                  <button
                    className="control-btn control-btn-primary"
                    onClick={handleResume}
                  >
                    Resume
                  </button>
                )}

                <button
                  className="control-btn control-btn-secondary"
                  onClick={handleReset}
                >
                  Reset
                </button>

                {isWorkSession && !isRunning && timeLeft === 0 && (
                  <button
                    className="control-btn control-btn-success"
                    onClick={startBreak}
                  >
                    Take a Break
                  </button>
                )}
              </div>

              <div className="stats">
                <div className="stat-item">
                  <div className="stat-label">Work Duration</div>
                  <div className="stat-value">{workDuration} min</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Break Duration</div>
                  <div className="stat-value">{breakDuration} min</div>
                </div>
              </div>
            </>
          ) : (
            <div className="settings-panel">
              <h2>Settings</h2>

              <div className="settings-group">
                <label htmlFor="work-duration">Work Duration (minutes)</label>
                <div className="input-group">
                  <button
                    className="duration-btn"
                    onClick={() =>
                      setTempWorkDuration(Math.max(1, tempWorkDuration - 1))
                    }
                  >
                    −
                  </button>
                  <input
                    id="work-duration"
                    type="number"
                    min="1"
                    max="60"
                    value={tempWorkDuration}
                    onChange={(e) =>
                      setTempWorkDuration(Number(e.target.value))
                    }
                    className="duration-input"
                  />
                  <button
                    className="duration-btn"
                    onClick={() =>
                      setTempWorkDuration(Math.min(60, tempWorkDuration + 1))
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="settings-group">
                <label htmlFor="break-duration">Break Duration (minutes)</label>
                <div className="input-group">
                  <button
                    className="duration-btn"
                    onClick={() =>
                      setTempBreakDuration(Math.max(1, tempBreakDuration - 1))
                    }
                  >
                    −
                  </button>
                  <input
                    id="break-duration"
                    type="number"
                    min="1"
                    max="30"
                    value={tempBreakDuration}
                    onChange={(e) =>
                      setTempBreakDuration(Number(e.target.value))
                    }
                    className="duration-input"
                  />
                  <button
                    className="duration-btn"
                    onClick={() =>
                      setTempBreakDuration(Math.min(30, tempBreakDuration + 1))
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="settings-group">
                <label>Alarm Settings</label>
                <div className="alarm-toggle">
                  <input
                    type="checkbox"
                    id="alarm-enabled"
                    checked={tempAlarmEnabled}
                    onChange={(e) => setTempAlarmEnabled(e.target.checked)}
                    className="checkbox-input"
                  />
                  <label htmlFor="alarm-enabled" className="checkbox-label">
                    Enable Alarm
                  </label>
                </div>
              </div>

              {tempAlarmEnabled && (
                <div className="settings-group">
                  <label htmlFor="alarm-volume">
                    Alarm Volume ({tempAlarmVolume}%)
                  </label>
                  <input
                    id="alarm-volume"
                    type="range"
                    min="0"
                    max="100"
                    value={tempAlarmVolume}
                    onChange={(e) => setTempAlarmVolume(Number(e.target.value))}
                    className="volume-slider"
                  />
                </div>
              )}

              <div className="settings-group">
                <label>Notifications</label>
                {notificationsEnabled ? (
                  <div className="alarm-toggle" style={{ opacity: 0.7 }}>
                    <span className="checkbox-label">
                      ✓ Notifications Enabled
                    </span>
                  </div>
                ) : (
                  <div>
                    <button
                      className="control-btn control-btn-primary"
                      onClick={handleRequestNotificationPermission}
                      style={{ width: "100%" }}
                    >
                      📱 Enable Notifications
                    </button>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#999",
                        marginTop: "8px",
                        textAlign: "center",
                      }}
                    >
                      Tap to grant permission for timer alerts
                    </p>
                  </div>
                )}
              </div>

              <div className="settings-actions">
                <button
                  className="control-btn control-btn-secondary"
                  onClick={() => setShowSettings(false)}
                >
                  Cancel
                </button>
                <button
                  className="control-btn control-btn-primary"
                  onClick={handleSaveSettings}
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {showBreakNotice && (
        <div className="break-notice-overlay">
          <div className="break-notice-modal">
            <div className="break-notice-header">
              <h2>🎉 Work Session Complete!</h2>
            </div>
            <div className="break-notice-content">
              <p>Great job! You've completed a work session.</p>
              <p>Time for a break?</p>
              <p className="break-duration">
                Break Duration: <span>{breakDuration} minutes</span>
              </p>
            </div>
            <div className="break-notice-actions">
              <button
                className="control-btn control-btn-secondary"
                onClick={handleSkipBreak}
              >
                Skip Break
              </button>
              <button
                className="control-btn control-btn-success"
                onClick={handleStartBreak}
              >
                Start Break
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav
        activeMode="pomodoro"
        onTasksClick={onTasksClick}
        onBrainDumpClick={onBrainDumpClick}
        onPomodoroClick={() => {}}
      />
    </div>
  );
}
