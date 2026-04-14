import { useFileStore } from "@/store/app-file-state.store";
import { focusTextarea } from "@/components/common/focusable-textarea";

export function useNavigateFile() {
  const openFiles = useFileStore((s) => s.openFiles);
  const activeFileId = useFileStore((s) => s.activeFileId);
  const setActiveFile = useFileStore((s) => s.setActiveFile);

  const navigate = ({ direction }: { direction: "prev" | "next" }) => {
    if (openFiles.length < 2) return;
    const currentIndex = openFiles.findIndex((f) => f.id === activeFileId);
    const lastIndex = openFiles.length - 1;
    const nextIndex =
      direction === "next"
        ? currentIndex === lastIndex
          ? 0
          : currentIndex + 1
        : currentIndex === 0
          ? lastIndex
          : currentIndex - 1;
    setActiveFile(openFiles[nextIndex].id);
    focusTextarea();
  };

  return {
    navigatePrev: () => navigate({ direction: "prev" }),
    navigateNext: () => navigate({ direction: "next" }),
  };
}
