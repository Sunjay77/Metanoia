```
Metanoia/
│
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 vite.config.ts              ← Update with path aliases
├── 📄 index.html
│
├── 📁 public/
│   └── icons/
│
├── 📁 src/
│   │
│   ├── 📁 components/             ← All React components
│   │   ├── 📁 common/             ← Reusable components
│   │   │   ├── TopAppBar.tsx      ← [TODO] Create
│   │   │   ├── BottomNav.tsx      ← [TODO] Create
│   │   │   └── index.ts           ✓ Done
│   │   │
│   │   ├── 📁 modes/              ← App mode screens
│   │   │   ├── LandingMode.tsx    ← [TODO] Create
│   │   │   ├── TasksMode.tsx      ← [TODO] Create
│   │   │   ├── BrainDumpMode.tsx  ← [TODO] Create
│   │   │   └── index.ts           ✓ Done
│   │   │
│   │   ├── 📁 tasks/              ← Task components
│   │   │   ├── TodoInput.tsx      ← [TODO] Move here
│   │   │   ├── TodoItem.tsx       ← [TODO] Move here
│   │   │   ├── TodoList.tsx       ← [TODO] Move here
│   │   │   └── index.ts           ✓ Done
│   │   │
│   │   └── 📁 brainDump/          ← Brain dump components
│   │       ├── BrainDumpInput.tsx ← [TODO] Create
│   │       ├── NoteCard.tsx       ← [TODO] Create
│   │       ├── NotesContainer.tsx ← [TODO] Create
│   │       └── index.ts           ✓ Done
│   │
│   ├── 📁 store/                  ← State management (Zustand)
│   │   ├── 📁 todos/
│   │   │   ├── todoStore.ts       ← [TODO] Move here
│   │   │   └── types.ts           ✓ Done
│   │   │
│   │   ├── 📁 brainDump/
│   │   │   ├── brainDumpStore.ts  ← [TODO] Move here
│   │   │   └── types.ts           ✓ Done
│   │   │
│   │   └── index.ts               ✓ Done (barrel export)
│   │
│   ├── 📁 styles/                 ← CSS organization
│   │   ├── variables.css          ✓ Done (CSS custom properties)
│   │   ├── globals.css            ✓ Done (global styles)
│   │   └── components.css         ✓ Done (component styles)
│   │
│   ├── 📁 types/                  ← TypeScript definitions
│   │   └── index.ts               ✓ Done (AppMode, Config)
│   │
│   ├── 📁 utils/                  ← Utilities & constants
│   │   └── constants.ts           ✓ Done (APP_CONFIG, MODES)
│   │
│   ├── 📁 pages/                  ← Page components
│   │   └── App.tsx                ← [TODO] Move here
│   │
│   ├── 📁 assets/                 ← Images, icons, etc.
│   │
│   ├── App.css                    ← [KEEP] Override layer
│   ├── index.css                  ← [TODO] Create (imports all styles)
│   ├── main.tsx                   ← [TODO] Update imports
│   └── vite-env.d.ts
│
├── 📄 STRUCTURE.md                ✓ Done (documentation)
├── 📄 MIGRATION_GUIDE.md          ✓ Done (step-by-step guide)
├── 📄 REFACTORED_EXAMPLES.md      ✓ Done (component templates)
├── 📄 SETUP_SUMMARY.md            ✓ Done (quick reference)
│
└── .gitignore, .eslintrc, etc.


Legend:
✓ Done       = File/folder already created
[TODO]       = Action needed on your part
[KEEP]       = Keep as is
```

## Color Coded Status

### ✓ Complete (Ready to use)

- All directories created
- Type definitions organized
- Store interfaces created
- CSS variables & globals
- Barrel exports set up
- Documentation complete

### [TODO] Your Tasks

- Move existing component files
- Move store files
- Create new component files
- Update import paths
- Update main.tsx
- Update vite.config.ts
- Test the app

### Timeline

- **Phase 1 (File Movement)** - 5 minutes
- **Phase 2 (Import Updates)** - 10 minutes
- **Phase 3 (Component Refactoring)** - 20 minutes
- **Phase 4 (Testing & Cleanup)** - 5 minutes
- **Total** - ~40 minutes

---

## Import Path Examples After Migration

### Before (Old Structure)

```typescript
import { TodoInput } from "./Components/TodoInput";
import { useTodoStore } from "./store/todoStore";
import { useBrainDumpStore } from "./store/brainDumpStore";
import App from "./App";
```

### After (New Structure)

```typescript
import { TodoInput, TodoList } from "@/components/tasks";
import { TopAppBar, BottomNav } from "@/components/common";
import { LandingMode, TasksMode } from "@/components/modes";
import { useTodoStore, useBrainDumpStore } from "@/store";
import type { AppMode } from "@/types";
import { APP_CONFIG, MODES } from "@/utils/constants";
import App from "@/pages/App";
```

Much cleaner! ✨

---

## Next Steps

1. Open MIGRATION_GUIDE.md
2. Follow instructions step by step
3. Refer to REFACTORED_EXAMPLES.md for code templates
4. Test with `npm run dev`
5. All done! 🎉
