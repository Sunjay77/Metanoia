import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Category = "work" | "personal" | "health" | "finance";
export type Priority = "high" | "medium" | "low";
export type Filter = "all" | "todo" | "done";

export interface Task {
  id: number;
  text: string;
  cat: Category;
  pri: Priority;
  due: string;
  done: boolean;
}

interface TodoStore {
  tasks: Task[];
  filter: Filter;
  catFilter: Category | "all";
  search: string;

  setFilter: (f: Filter) => void;
  setCatFilter: (c: Category | "all") => void;
  setSearch: (s: string) => void;
  addTask: (task: Omit<Task, "id" | "done">) => void;
  toggle: (id: number) => void;
  remove: (id: number) => void;
  clearDone: () => void;
  visible: Task[];
}

export const useStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      filter: "all",
      catFilter: "all",
      search: "",

      setFilter: (filter) => set({ filter }),
      setCatFilter: (catFilter) => set({ catFilter }),
      setSearch: (search) => set({ search }),

      addTask: (task) =>
        set((s) => ({
          tasks: [...s.tasks, { ...task, id: Date.now(), done: false }],
        })),

      toggle: (id) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t,
          ),
        })),

      remove: (id) =>
        set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),

      clearDone: () => set((s) => ({ tasks: s.tasks.filter((t) => !t.done) })),

      get visible() {
        const { tasks, filter, catFilter, search } = get();
        const po: Record<Priority, number> = { high: 0, medium: 1, low: 2 };
        return tasks
          .filter((t) => {
            if (filter === "done") return t.done;
            if (filter === "todo") return !t.done;
            return true;
          })
          .filter((t) => (catFilter !== "all" ? t.cat === catFilter : true))
          .filter((t) =>
            search ? t.text.toLowerCase().includes(search.toLowerCase()) : true,
          )
          .sort((a, b) => {
            if (a.done !== b.done) return a.done ? 1 : -1;
            return po[a.pri] - po[b.pri];
          });
      },
    }),
    { name: "todo-storage" },
  ),
);
