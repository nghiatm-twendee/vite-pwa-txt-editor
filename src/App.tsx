import NoFileSelected from "./components/common/no-file-selected.tsx";
import { Textarea } from "./components/ui/textarea.tsx";
import PWABadge from "./PWABadge.tsx";
import { useFileStore } from "./store/app-file-state.store.ts";
import { useShortcuts } from "./hooks/use-shortcuts.ts";

function App() {
  useShortcuts();

  const { openFiles, activeFileId, updateContent } = useFileStore();

  const activeFile = openFiles.find((f) => f.id === activeFileId);

  return (
    <>
      {activeFileId && activeFile ? (
        <Textarea
          className="h-[calc(100dvh-var(--spacing)*9)] w-full resize-none"
          value={activeFile.content}
          onChange={(e) => updateContent(activeFile.id, e.target.value)}
        />
      ) : (
        <NoFileSelected />
      )}
      <PWABadge />
    </>
  );
}

export default App;
