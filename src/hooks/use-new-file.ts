import { newFile } from "@/service/txt-file";
import { useFileStore } from "@/store/app-file-state.store";

export function useNewFile() {
  const openFile = useFileStore((s) => s.openFile);
  return () => openFile(newFile());
}
