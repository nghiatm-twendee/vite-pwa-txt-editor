import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { saveFile } from "@/service/txt-file";
import { useFileStore } from "@/store/app-file-state.store";
import { getErrorMessage } from "@/lib/error";
import { focusTextarea } from "@/components/common/focusable-textarea";

type SaveFileVars = {
  id: string;
  handle: FileSystemFileHandle;
  content: string;
};

export function useSaveFile() {
  const markClean = useFileStore((s) => s.markClean);

  return useMutation({
    mutationFn: ({ handle, content }: SaveFileVars) => saveFile(handle, content),
    onSuccess: (_, { id, handle }) => {
      markClean(id);
      toast.success(`"${handle.name}" saved`);
      focusTextarea();
    },
    onError: (error) => {
      toast.error(getErrorMessage({ error }));
    },
  });
}
