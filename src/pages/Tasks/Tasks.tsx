import { TodoInput } from "@/components/tasks/TodoInput";
import { TodoList } from "@/components/tasks/TodoList";
import { BottomNav } from "@/components/common/BottomNav";
import "./Tasks.css";

interface TasksProps {
  onBackClick: () => void;
  onBrainDumpClick: () => void;
}

export function Tasks({ onBackClick, onBrainDumpClick }: TasksProps) {
  return (
    <div className="app app-tasks-container">
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
      <BottomNav
        activeMode="tasks"
        onTasksClick={() => {}} // Already on tasks, do nothing
        onBrainDumpClick={onBrainDumpClick}
      />
    </div>
  );
}
