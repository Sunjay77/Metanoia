# Example Refactored Components

## Example 1: TopAppBar.tsx

```typescript
interface TopAppBarProps {
  onMenuClick?: () => void;
  onClearClick?: () => void;
}

export function TopAppBar({ onMenuClick, onClearClick }: TopAppBarProps) {
  return (
    <header className="top-app-bar">
      <button className="app-icon-btn" onClick={onMenuClick} title="Menu">
        ☰
      </button>
      <div className="app-title">VOID</div>
      <button className="app-icon-btn" onClick={onClearClick} title="Clear all">
        🗑
      </button>
    </header>
  );
}
```

## Example 2: BottomNav.tsx

```typescript
interface BottomNavProps {
  activeMode: "tasks" | "brain-dump";
  onTasksClick: () => void;
  onBrainDumpClick: () => void;
}

export function BottomNav({
  activeMode,
  onTasksClick,
  onBrainDumpClick,
}: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      <button
        className="nav-item"
        onClick={onTasksClick}
        title="Tasks"
      >
        <span className="nav-icon">✓</span>
        <span className="nav-label">TASKS</span>
      </button>
      <button
        className={`nav-item ${activeMode === "brain-dump" ? "nav-item-active" : ""}`}
        onClick={onBrainDumpClick}
        title="Brain Dump"
      >
        <span className="nav-icon">≡</span>
        <span className="nav-label">BRAIN DUMP</span>
      </button>
    </nav>
  );
}
```

## Example 3: LandingMode.tsx

```typescript
interface LandingModeProps {
  onTasksSelect: () => void;
  onBrainDumpSelect: () => void;
}

export function LandingMode({
  onTasksSelect,
  onBrainDumpSelect,
}: LandingModeProps) {
  return (
    <div className="app">
      <header className="app-header">
        <h1>ENTER<br />THE VOID.</h1>
      </header>
      <main className="app-main app-main-landing">
        <div className="modes-container">
          <button className="mode-card mode-tasks" onClick={onTasksSelect}>
            <div className="mode-icon">✓</div>
            <div className="mode-content">
              <span className="mode-label">MODE 01</span>
              <h2>Tasks</h2>
              <p>Radical clarity for your immediate focus</p>
            </div>
            <div className="mode-arrow">→</div>
          </button>

          <button
            className="mode-card mode-brain-dump"
            onClick={onBrainDumpSelect}
          >
            <div className="mode-icon">≡</div>
            <div className="mode-content">
              <span className="mode-label">MODE 02</span>
              <h2>Brain Dump</h2>
              <p>Unstructured space. Let ideas breathe</p>
            </div>
            <div className="mode-arrow">→</div>
          </button>
        </div>
      </main>
    </div>
  );
}
```

## Example 4: NoteCard.tsx

```typescript
interface NoteCardProps {
  content: string;
  onDelete: () => void;
}

export function NoteCard({ content, onDelete }: NoteCardProps) {
  return (
    <div className="note-card">
      <div className="note-content">{content}</div>
      <button
        className="note-delete-btn"
        onClick={onDelete}
        title="Delete note"
      >
        ✕
      </button>
    </div>
  );
}
```

## Example 5: BrainDumpInput.tsx

```typescript
interface BrainDumpInputProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  disabled?: boolean;
}

export function BrainDumpInput({
  value,
  onChange,
  onSave,
  disabled,
}: BrainDumpInputProps) {
  return (
    <div className="input-section">
      <textarea
        className="unstructured-input"
        placeholder="Dump your thoughts here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="input-footer">
        <span className="input-label">UNSTRUCTURED INPUT</span>
        <button
          className="save-note-btn"
          onClick={onSave}
          disabled={disabled || !value.trim()}
        >
          Save<br />Note
        </button>
      </div>
    </div>
  );
}
```

## Example 6: NotesContainer.tsx

```typescript
import { NoteCard } from "./NoteCard";

interface Note {
  id: number;
  content: string;
}

interface NotesContainerProps {
  notes: Note[];
  onDeleteNote: (id: number) => void;
}

export function NotesContainer({
  notes,
  onDeleteNote,
}: NotesContainerProps) {
  return (
    <div className="notes-container">
      {notes.length === 0 ? (
        <div className="empty-notes-message">
          Your thoughts will appear here
        </div>
      ) : (
        notes.map((note) => (
          <NoteCard
            key={note.id}
            content={note.content}
            onDelete={() => onDeleteNote(note.id)}
          />
        ))
      )}
    </div>
  );
}
```

## Key Patterns

### Component Props

- Always use TypeScript interfaces for props
- Use destructuring in function parameters
- Prefix event handlers with `on` (onClick, onSave, etc.)

### State Management

- Use Zustand stores via barrel exports
- Keep component state local (UI state)
- Push business logic to stores

### Styling

- Use CSS classes from components.css
- Apply CSS variables for colors/spacing
- Use BEM naming for clarity

### Type Safety

- Export interfaces alongside components
- Use `type` imports for TypeScript definitions
- Avoid `any` type

### Component Composition

- Keep components small and focused
- Pass props explicitly (avoid prop drilling)
- Use composition over inheritance
