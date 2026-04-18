import { useTodoStore } from "@/store";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const remainingCount = todos.length - completedCount;

  return (
    <div className="todo-list-container">
      {todos.length === 0 ? (
        <p className="empty-message">✨ No todos yet. Time to add something!</p>
      ) : (
        <>
          <ul className="todo-list">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
          <div className="todo-footer">
            <span className="todo-count">
              {remainingCount} {remainingCount === 1 ? "task" : "tasks"}{" "}
              remaining
            </span>
            {completedCount > 0 && (
              <button onClick={clearCompleted} className="clear-button">
                Clear completed
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
