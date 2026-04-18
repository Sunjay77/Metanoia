// App configuration
export const APP_CONFIG = {
  name: "Metanoia",
  tagline: "A Change Of Mind",
  version: "1.0.0",
};

// Mode labels
export const MODES = {
  LANDING: "landing",
  TASKS: "tasks",
  BRAIN_DUMP: "brain-dump",
} as const;

// Mode descriptions
export const MODE_DESCRIPTIONS = {
  TASKS: "Radical clarity for your immediate focus",
  BRAIN_DUMP: "Unstructured space. Let ideas breathe",
} as const;

// UI Constants
export const UI = {
  ANIMATION_DURATION: 0.3,
  BORDER_RADIUS: "0.375rem",
} as const;
