import "./App.css";
import { useState } from "react";
import { TodoInput } from "./Components/TodoInput";
import { TodoList } from "./Components/TodoList";
import { useBrainDumpStore } from "./store/brainDumpStore";

type AppMode = "landing" | "tasks" | "brain-dump";

function App() {
  const [mode, setMode] = useState<AppMode>("landing");
  const [inputValue, setInputValue] = useState("");
  const { notes, addNote, removeNote } = useBrainDumpStore();

  if (mode === "landing") {
    return (
      <div className="app">
        <header className="app-header">
          <h1>
            A Change Of Mind
          </h1>
        </header>
        <main className="app-main app-main-landing">
          <div className="modes-container">
            <button
              className="mode-card mode-tasks"
              onClick={() => setMode("tasks")}
            >
              <div className="mode-icon">✓</div>
              <div className="mode-content">
                <span className="mode-label">MODE 01</span>
                <h2>Tasks</h2>
              </div>
              <div className="mode-arrow">→</div>
            </button>

            <button
              className="mode-card mode-brain-dump"
              onClick={() => setMode("brain-dump")}
            >
              <div className="mode-icon">≡</div>x
              <div className="mode-content">
                <span className="mode-label">MODE 02</span>
                <h2>Brain Dump</h2>
              </div>
              <div className="mode-arrow">→</div>
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (mode === "brain-dump") {
    const handleSaveNote = () => {
      addNote(inputValue);
      setInputValue("");
    };

    return (
      <div className="app app-full-screen">
        {/* Top App Bar */}
        <header className="top-app-bar">
          <button className="app-icon-btn" title="Menu">
            ☰
          </button>
          <div className="app-title">VOID</div>
          <button className="app-icon-btn" title="Clear all">
            🗑
          </button>
        </header>

        {/* Main Content */}
        <main className="brain-dump-main">
          {/* Unstructured Input Section */}
          <div className="input-section">
            <textarea
              className="unstructured-input"
              placeholder="Dump your thoughts here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="input-footer">
              <span className="input-label">UNSTRUCTURED INPUT</span>
              <button
                className="save-note-btn"
                onClick={handleSaveNote}
                disabled={!inputValue.trim()}
              >
                Save
                <br />
                Note
              </button>
            </div>
          </div>

          {/* Saved Notes */}
          <div className="notes-container">
            {notes.length === 0 ? (
              <div className="empty-notes-message">
                Your thoughts will appear here
              </div>
            ) : (
              notes.map((note) => (
                <div key={note.id} className="note-card">
                  <div className="note-content">{note.content}</div>
                  <button
                    className="note-delete-btn"
                    onClick={() => removeNote(note.id)}
                    title="Delete note"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          <button
            className="nav-item"
            onClick={() => setMode("tasks")}
            title="Tasks"
          >
            <span className="nav-icon">✓</span>
            <span className="nav-label">TASKS</span>
          </button>
          <button className="nav-item nav-item-active" title="Brain Dump">
            <span className="nav-icon">≡</span>
            <span className="nav-label">BRAIN DUMP</span>
          </button>
        </nav>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header app-header-subpage">
        <button
          className="back-button"
          onClick={() => setMode("landing")}
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

export default App;
