export type OpenFile = {
  id: string; // random id you generate, the key for everything
  name: string; // "notes.txt" — for display in the tab
  handle: FileSystemFileHandle | null; // null if new unsaved file
  content: string; // the actual text, lives in memory
  isDirty: boolean; // true if unsaved changes exist
};

export type AppState = {
  openFiles: OpenFile[];
  activeFileId: string | null;
};
