import { TodoInput } from "@/components/tasks/TodoInput";
import { TodoList } from "@/components/tasks/TodoList";
import "./TasksMode.css";

interface TasksModeProps {
  onBackClick: () => void;
}

export function TasksMode({ onBackClick }: TasksModeProps) {
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
        <h1>Metania</h1>
        <p>Organize your intent</p>
      </header>
      <main className="app-main">
        <TodoInput />
        <TodoList />
      </main>
    </div>
  );
}
