import "./App.css";
import { TodoInput } from "./Components/TodoInput";
import { TodoList } from "./Components/TodoList";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Metonia</h1>
      </header>
      <main className="app-main">
        <TodoInput />
        <TodoList />
      </main>
    </div>
  );
}

export default App;
