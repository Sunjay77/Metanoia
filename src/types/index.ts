// App modes
export type AppMode =
  | "landing"
  | "tasks"
  | "brain-dump"
  | "brain-dump-saved"
  | "sounds";

// Common types
export interface Config {
  appName: string;
  version: string;
}
