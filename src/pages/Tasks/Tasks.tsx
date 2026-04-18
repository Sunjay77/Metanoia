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
    <div className="app-tasks-container">
      <header className="app-header app-header-subpage">
        <button
          className="header-icon-btn"
          onClick={onBackClick}
          title="Back to mode selection"
        >
          ←
        </button>
        <h1>Tasks</h1>
        <div className="header-actions"></div>
      </header>
      <main className="app-main">
        <TodoInput />
        <TodoList />
      </main>
      <BottomNav
        activeMode="tasks"
        onTasksClick={() => {}}
        onBrainDumpClick={onBrainDumpClick}
      />
    </div>
  );
}
