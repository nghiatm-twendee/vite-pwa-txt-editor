import NoFileSelected from "./components/common/no-file-selected.tsx";
import FocusableTextarea from "./components/common/focusable-textarea.tsx";
import PWABadge from "./PWABadge.tsx";
import { useFileStore } from "./store/app-file-state.store.ts";
import { useShortcuts } from "./hooks/use-shortcuts.ts";

function App() {
  useShortcuts();

  const { openFiles, activeFileId, updateContent } = useFileStore();

  const activeFile = openFiles.find((f) => f.id === activeFileId);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (activeFile) updateContent(activeFile.id, e.target.value);
  };

  return (
    <>
      {activeFileId && activeFile ? (
        <FocusableTextarea
          className="h-[calc(100dvh-var(--spacing)*9)] w-full resize-none"
          value={activeFile.content}
          onChange={handleChange}
        />
      ) : (
        <NoFileSelected />
      )}
      <PWABadge />
    </>
  );
}

export default App;
