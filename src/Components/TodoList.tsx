import { useTodoStore } from "../store/todoStore";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="todo-list-container">
      {todos.length === 0 ? (
        <p className="empty-message">No todos yet. Add one to get started!</p>
      ) : (
        <>
          <ul className="todo-list">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
          <div className="todo-footer">
            <span className="todo-count">
              {todos.length - completedCount} of {todos.length} completed
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
