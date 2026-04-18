# Metanoia - Modern Project Structure

## Directory Organization

```
src/
├── components/                 # All React components
│   ├── common/                # Shared/reusable components
│   │   ├── TopAppBar.tsx      # Brain dump header component
│   │   ├── BottomNav.tsx      # Brain dump footer navigation
│   │   └── index.ts           # Barrel export
│   ├── modes/                 # App mode screens
│   │   ├── LandingMode.tsx    # Mode selection interface
│   │   ├── TasksMode.tsx      # Tasks interface wrapper
│   │   ├── BrainDumpMode.tsx  # Brain dump interface wrapper
│   │   └── index.ts           # Barrel export
│   ├── tasks/                 # Task-related components
│   │   ├── TodoInput.tsx      # Input form
│   │   ├── TodoItem.tsx       # Individual todo item
│   │   ├── TodoList.tsx       # Todo list container
│   │   └── index.ts           # Barrel export
│   └── brainDump/             # Brain dump components
│       ├── BrainDumpInput.tsx # Input textarea section
│       ├── NoteCard.tsx       # Individual note card
│       ├── NotesContainer.tsx # Notes list container
│       └── index.ts           # Barrel export
│
├── store/                      # State management (Zustand)
│   ├── todos/
│   │   ├── todoStore.ts       # Todo store logic
│   │   └── types.ts           # Todo TypeScript interfaces
│   ├── brainDump/
│   │   ├── brainDumpStore.ts  # Brain dump store logic
│   │   └── types.ts           # Brain dump TypeScript interfaces
│   └── index.ts               # Barrel export all stores
│
├── styles/                     # CSS organization
│   ├── variables.css          # CSS custom properties & theme
│   ├── globals.css            # Global styles & resets
│   └── components.css         # Reusable component styles
│
├── types/                      # Shared TypeScript types
│   └── index.ts               # AppMode, Config, etc
│
├── utils/                      # Utility functions & constants
│   └── constants.ts           # App config, UI constants
│
├── pages/                      # Page/layout components
│   └── App.tsx                # Main app router component
│
├── main.tsx                    # React entry point
├── index.css                   # Import all styles
└── vite-env.d.ts             # Vite type definitions
```

## Import Patterns

### Importing Stores

```typescript
// ✓ Good - use barrel export
import { useTodoStore, useBrainDumpStore } from "@/store";

// ✓ Good - specific import
import { useTodoStore } from "@/store/todos/todoStore";
```

### Importing Components

```typescript
// ✓ Good - use barrel export
import { TodoInput, TodoItem, TodoList } from "@/components/tasks";

// ✓ Good - specific import
import { TodoInput } from "@/components/tasks/TodoInput";
```

### Importing Types

```typescript
// ✓ Good
import type { AppMode } from "@/types";
import type { Todo, TodoStore } from "@/store/todos/types";
```

### Importing Utils

```typescript
// ✓ Good
import { APP_CONFIG, MODES } from "@/utils/constants";
```

## Development Workflow

### Adding New Feature

1. Create component in appropriate folder under `components/`
2. Add type definitions in `types/` if needed
3. Use barrel exports (`index.ts`) for clean imports
4. Style using CSS variables from `styles/variables.css`

### Adding New Store

1. Create folder in `store/` (e.g., `store/newFeature/`)
2. Create `newFeature.ts` with Zustand store logic
3. Create `types.ts` with TypeScript interfaces
4. Export from `store/index.ts`

### Styling Components

1. Use CSS variables from `styles/variables.css`
2. Add component-specific styles to `styles/components.css`
3. Use BEM naming convention for clarity
4. Maintain responsive design patterns

## Key Principles

- **Separation of Concerns**: Components, logic, styles, and types are separated
- **Barrel Exports**: Use index.ts files for cleaner imports
- **Type Safety**: Use TypeScript interfaces for store and component props
- **Reusability**: Common components in `components/common/`
- **Scalability**: Structure allows easy addition of new features
- **Developer Experience**: Clear file organization and naming conventions

## Path Aliases (Update in vite.config.ts if needed)

Add to your vite.config.ts:

```typescript
import react from "@vitejs/plugin-react";
import path from "path";

export default {
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
```

Then use `@` prefix in imports:

```typescript
import { useTodoStore } from "@/store";
import { TodoInput } from "@/components/tasks";
import type { AppMode } from "@/types";
```
