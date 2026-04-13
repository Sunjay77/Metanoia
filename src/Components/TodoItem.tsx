import { useTodoStore, type Todo } from "../store/todoStore";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  return (
    <li className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="todo-checkbox"
        />
        <span className={`todo-title ${todo.completed ? "completed" : ""}`}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => removeTodo(todo.id)}
        className="delete-button"
        aria-label="Delete todo"
      >
        ✕
      </button>
    </li>
  );
}
