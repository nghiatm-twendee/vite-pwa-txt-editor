import { useEffect } from "react";
import { useFileStore } from "@/store/app-file-state.store";

export function useBeforeUnload() {
  const openFiles = useFileStore((state) => state.openFiles);

  useEffect(() => {
    const hasDirty = openFiles.some((f) => f.isDirty);
    if (!hasDirty) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [openFiles]);
}
