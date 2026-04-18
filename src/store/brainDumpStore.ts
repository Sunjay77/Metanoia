import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BrainDumpNote {
  id: number;
  content: string;
  createdAt: string;
}

interface BrainDumpStore {
  notes: BrainDumpNote[];
  addNote: (content: string) => void;
  removeNote: (id: number) => void;
}

export const useBrainDumpStore = create<BrainDumpStore>()(
  persist(
    (set) => ({
      notes: [],

      addNote: (content: string) =>
        set((state) => {
          if (content.trim()) {
            const newNote: BrainDumpNote = {
              id: Date.now(),
              content,
              createdAt: new Date().toISOString(),
            };
            return {
              notes: [newNote, ...state.notes],
            };
          }
          return state;
        }),

      removeNote: (id: number) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
    }),
    {
      name: "brain-dump-store",
    },
  ),
);
