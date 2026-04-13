import { create } from "zustand";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  clearCompleted: () => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  addTodo: (title: string) =>
    set((state) => {
      const newTodo: Todo = {
        id: Date.now(),
        title,
        completed: false,
        createdAt: new Date(),
      };
      return { todos: [...state.todos, newTodo] };
    }),

  removeTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  toggleTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    })),

  clearCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    })),
}));
