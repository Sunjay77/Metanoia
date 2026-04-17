import { useState } from "react";
import { useTodoStore } from "../store/todoStore";

export function TodoInput() {
  const [input, setInput] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What needs to be done?"
        className="todo-input"
        autoFocus
      />
      <button type="submit" className="add-button">
        + Add
      </button>
    </form>
  );
}
