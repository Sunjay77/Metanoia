import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PomodoroSession {
  id: number;
  duration: number; // in minutes
  completedAt: string;
}

interface PomodoroStore {
  // Settings
  workDuration: number; // in minutes
  breakDuration: number; // in minutes

  // Current session state
  isRunning: boolean;
  timeLeft: number; // in seconds
  isWorkSession: boolean;
  sessionsCompleted: number;

  // Session history
  sessions: PomodoroSession[];

  // Actions
  setWorkDuration: (duration: number) => void;
  setBreakDuration: (duration: number) => void;
  startSession: () => void;
  pauseSession: () => void;
  resumeSession: () => void;
  resetSession: () => void;
  decrementTimeLeft: () => void;
  completeSession: () => void;
  startBreak: () => void;
}

export const usePomodoro = create<PomodoroStore>()(
  persist(
    (set, get) => ({
      workDuration: 25,
      breakDuration: 5,
      isRunning: false,
      timeLeft: 25 * 60, // 25 minutes in seconds
      isWorkSession: true,
      sessionsCompleted: 0,
      sessions: [],

      setWorkDuration: (duration: number) => {
        const state = get();
        if (!state.isRunning) {
          set({
            workDuration: duration,
            timeLeft: duration * 60,
          });
        }
      },

      setBreakDuration: (duration: number) => {
        set({ breakDuration: duration });
      },

      startSession: () => {
        set({ isRunning: true });
      },

      pauseSession: () => {
        set({ isRunning: false });
      },

      resumeSession: () => {
        set({ isRunning: true });
      },

      resetSession: () => {
        const { workDuration } = get();
        set({
          isRunning: false,
          timeLeft: workDuration * 60,
          isWorkSession: true,
        });
      },

      decrementTimeLeft: () => {
        const state = get();
        if (state.isRunning) {
          const newTimeLeft = state.timeLeft - 1;

          if (newTimeLeft <= 0) {
            // Session completed
            set({
              isRunning: false,
              timeLeft: 0,
            });

            if (state.isWorkSession) {
              set({
                sessionsCompleted: state.sessionsCompleted + 1,
                sessions: [
                  ...state.sessions,
                  {
                    id: Date.now(),
                    duration: state.workDuration,
                    completedAt: new Date().toISOString(),
                  },
                ],
              });
            }
          } else {
            set({ timeLeft: newTimeLeft });
          }
        }
      },

      completeSession: () => {
        const state = get();
        if (state.isWorkSession) {
          set({
            sessionsCompleted: state.sessionsCompleted + 1,
            sessions: [
              ...state.sessions,
              {
                id: Date.now(),
                duration: state.workDuration,
                completedAt: new Date().toISOString(),
              },
            ],
          });
        }
        set({ isRunning: false });
      },

      startBreak: () => {
        const { breakDuration } = get();
        set({
          isWorkSession: false,
          timeLeft: breakDuration * 60,
          isRunning: true,
        });
      },
    }),
    {
      name: "pomodoro-store",
    },
  ),
);
