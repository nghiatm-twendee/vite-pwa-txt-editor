import { useFileStore } from "@/store/app-file-state.store";
import { focusTextarea } from "@/components/common/focusable-textarea";

export function useCloseFile() {
  const closeFile = useFileStore((s) => s.closeFile);
  const activeFileId = useFileStore((s) => s.activeFileId);

  return () => {
    if (!activeFileId) return;
    closeFile(activeFileId);
    focusTextarea();
  };
}
