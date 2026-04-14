import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { saveFileAs } from "@/service/txt-file";
import { useFileStore } from "@/store/app-file-state.store";
import { getErrorMessage } from "@/lib/error";
import { focusTextarea } from "@/components/common/focusable-textarea";

type SaveFileAsVars = {
  id: string;
  content: string;
  suggestedName?: string;
};

export function useSaveFileAs() {
  const updateHandleName = useFileStore((s) => s.updateHandleName);
  const markClean = useFileStore((s) => s.markClean);

  return useMutation({
    mutationFn: ({ content, suggestedName }: SaveFileAsVars) =>
      saveFileAs(content, suggestedName),
    onSuccess: (handle, { id }) => {
      updateHandleName(id, handle, handle.name);
      markClean(id);
      toast.success(`"${handle.name}" saved`);
      focusTextarea();
    },
    onError: (error) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast.error(getErrorMessage({ error }));
    },
  });
}
