import { newFile } from "@/service/txt-file";
import { useFileStore } from "@/store/app-file-state.store";
import { focusTextarea } from "@/components/common/focusable-textarea";

export function useNewFile() {
  const openFile = useFileStore((s) => s.openFile);
  return () => {
    openFile(newFile());
    focusTextarea();
  };
}
