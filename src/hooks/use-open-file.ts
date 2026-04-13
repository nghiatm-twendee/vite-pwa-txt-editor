import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { openFile } from "@/service/txt-file";
import { useFileStore } from "@/store/app-file-state.store";
import { getErrorMessage } from "@/lib/error";

export function useOpenFile() {
  const storeOpenFile = useFileStore((s) => s.openFile);

  return useMutation({
    mutationFn: openFile,
    onSuccess: (file) => {
      storeOpenFile(file);
      toast.success(`"${file.name}" opened`);
    },
    onError: (error) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast.error(getErrorMessage({ error }));
    },
  });
}
