# File Migration Guide

## Step-by-Step Instructions to Reorganize Metanoia

### Phase 1: Move Existing Files

#### Tasks Components

```
Move from: src/Components/
Move to: src/components/tasks/

Files to move:
- TodoInput.tsx
- TodoItem.tsx
- TodoList.tsx
```

#### Store Files

```
Move from: src/store/
Move to: src/store/todos/

File: todoStore.ts
→ src/store/todos/todoStore.ts

File: brainDumpStore.ts
→ src/store/brainDump/brainDumpStore.ts
```

### Phase 2: Update Import Paths

Once files are moved, update imports in:

**App.tsx** (will move to `pages/App.tsx`)

```typescript
// OLD
import { TodoInput } from "./Components/TodoInput";
import { TodoList } from "./Components/TodoList";
import { useBrainDumpStore } from "./store/brainDumpStore";

// NEW
import { TodoInput, TodoList } from "@/components/tasks";
import { useBrainDumpStore } from "@/store";
```

**Update vite.config.ts** to add path aliases:

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

### Phase 3: Split Styles

Create `src/index.css` with:

```css
@import "./styles/variables.css";
@import "./styles/globals.css";
@import "./styles/components.css";
@import "./App.css"; /* Keep App.css as override layer */
```

Then gradually move component styles from `App.css` to `components.css`

### Phase 4: Create Component Files

Create these new component files:

**src/components/common/TopAppBar.tsx**

- Extract top app bar logic from App.tsx

**src/components/common/BottomNav.tsx**

- Extract bottom navigation from App.tsx

**src/components/modes/LandingMode.tsx**

- Extract landing page logic from App.tsx

**src/components/modes/TasksMode.tsx**

- Extract tasks mode logic from App.tsx

**src/components/modes/BrainDumpMode.tsx**

- Extract brain dump mode logic from App.tsx

**src/components/brainDump/BrainDumpInput.tsx**

- Extract input section from App.tsx

**src/components/brainDump/NoteCard.tsx**

- New component for individual note display

**src/components/brainDump/NotesContainer.tsx**

- New component for notes list

### Phase 5: Update Main Entry

Update `src/main.tsx`:

```typescript
// OLD
import "./index.css";
import App from "./App.tsx";

// NEW
import "./index.css";
import App from "@/pages/App.tsx";
```

Move `App.tsx` to `src/pages/App.tsx`

## File Checklist

### Directories Created ✓

- [x] src/components/common
- [x] src/components/modes
- [x] src/components/tasks
- [x] src/components/brainDump
- [x] src/store/todos
- [x] src/store/brainDump
- [x] src/styles
- [x] src/types
- [x] src/utils
- [x] src/pages

### Files to Create/Move

- [ ] Move TodoInput.tsx → src/components/tasks/
- [ ] Move TodoItem.tsx → src/components/tasks/
- [ ] Move TodoList.tsx → src/components/tasks/
- [ ] Move todoStore.ts → src/store/todos/
- [ ] Move brainDumpStore.ts → src/store/brainDump/
- [ ] Move App.tsx → src/pages/
- [ ] Create TopAppBar.tsx
- [ ] Create BottomNav.tsx
- [ ] Create LandingMode.tsx
- [ ] Create TasksMode.tsx
- [ ] Create BrainDumpMode.tsx
- [ ] Create BrainDumpInput.tsx
- [ ] Create NoteCard.tsx
- [ ] Create NotesContainer.tsx

### Files Already Created ✓

- [x] src/types/index.ts
- [x] src/utils/constants.ts
- [x] src/store/todos/types.ts
- [x] src/store/brainDump/types.ts
- [x] src/store/index.ts
- [x] src/components/tasks/index.ts
- [x] src/components/common/index.ts
- [x] src/components/modes/index.ts
- [x] src/components/brainDump/index.ts
- [x] src/styles/variables.css
- [x] src/styles/globals.css
- [x] src/styles/components.css
- [x] STRUCTURE.md (documentation)

## Post-Migration Tasks

1. Update all import paths across project
2. Test that app still runs: `npm run dev`
3. Verify no import errors in console
4. Clean up old directories:
   - Delete old `src/Components/` (uppercase)
   - Delete old `src/store/` structure if fully moved
5. Update tsconfig if needed for path aliases

## Benefits After Migration

✅ Better code organization
✅ Easier to find and modify code
✅ Clearer separation of concerns
✅ Scalable for future features
✅ Professional developer structure
✅ Improved maintainability
✅ Cleaner import statements with aliases

## Need Help?

Refer to `STRUCTURE.md` for:

- Directory organization explanation
- Import patterns
- Development workflow
- Best practices
