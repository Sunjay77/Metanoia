export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface TodoStore {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  clearCompleted: () => void;
}
