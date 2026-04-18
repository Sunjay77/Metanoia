import { TodoInput } from "@/components/tasks/TodoInput";
import { TodoList } from "@/components/tasks/TodoList";
import "./Tasks.css";

interface TasksProps {
  onBackClick: () => void;
}

export function Tasks({ onBackClick }: TasksProps) {
  return (
    <div className="app">
      <header className="app-header app-header-subpage">
        <button
          className="back-button"
          onClick={onBackClick}
          title="Back to mode selection"
        >
          ←
        </button>
        <h1>Metanoia</h1>
      </header>
      <main className="app-main">
        <TodoInput />
        <TodoList />
      </main>
    </div>
  );
}
