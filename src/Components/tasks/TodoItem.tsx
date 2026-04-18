import { useTodoStore, type Todo } from "@/store";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="todo-checkbox"
          aria-label={`Mark "${todo.title}" as ${todo.completed ? "incomplete" : "complete"}`}
        />
        <span className={`todo-title ${todo.completed ? "completed" : ""}`}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => removeTodo(todo.id)}
        className="delete-button"
        aria-label={`Delete "${todo.title}"`}
        title="Delete this task"
      >
        ✕
      </button>
    </li>
  );
}
