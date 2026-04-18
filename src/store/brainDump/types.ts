export interface BrainDumpNote {
  id: number;
  content: string;
  createdAt: string;
}

export interface BrainDumpStore {
  notes: BrainDumpNote[];
  addNote: (content: string) => void;
  removeNote: (id: number) => void;
}
