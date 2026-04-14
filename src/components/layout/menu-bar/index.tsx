import { ModeToggle } from "@/components/provider/theme/mode-toggle";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { FileAction, getShortcutDisplay } from "@/hooks/use-shortcuts";
import { useNewFile } from "@/hooks/use-new-file";
import { useOpenFile } from "@/hooks/use-open-file";
import { useSaveFile } from "@/hooks/use-save-file";
import { useSaveFileAs } from "@/hooks/use-save-file-as";
import { useCloseFile } from "@/hooks/use-close-file";
import { useFileStore } from "@/store/app-file-state.store";

const RootMenuBar = () => {
  const newFile = useNewFile();
  const openFileMutation = useOpenFile();
  const saveFileMutation = useSaveFile();
  const saveFileAsMutation = useSaveFileAs();
  const closeFile = useCloseFile();

  const openFiles = useFileStore((s) => s.openFiles);
  const activeFileId = useFileStore((s) => s.activeFileId);
  const activeFile = openFiles.find((f) => f.id === activeFileId) ?? null;

  const handleNew = () => newFile();
  const handleOpen = () => openFileMutation.mutate();
  const handleSave = () => {
    if (!activeFile) return;
    if (activeFile.handle) {
      saveFileMutation.mutate({ id: activeFile.id, handle: activeFile.handle, content: activeFile.content });
    } else {
      saveFileAsMutation.mutate({ id: activeFile.id, content: activeFile.content, suggestedName: activeFile.name });
    }
  };
  const handleSaveAs = () => {
    if (!activeFile) return;
    saveFileAsMutation.mutate({ id: activeFile.id, content: activeFile.content, suggestedName: activeFile.name });
  };
  const handleClose = () => closeFile();

  return (
    <Menubar>
      <SidebarTrigger />
      <ModeToggle />
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent className="min-w-48">
          <MenubarItem onClick={handleNew}>
            New
            <MenubarShortcut>{getShortcutDisplay({ action: FileAction.New }).join("+")}</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled={openFileMutation.isPending} onClick={handleOpen}>
            Open
            <MenubarShortcut>{getShortcutDisplay({ action: FileAction.Open }).join("+")}</MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            disabled={!activeFile || saveFileMutation.isPending || saveFileAsMutation.isPending}
            onClick={handleSave}
          >
            Save
            <MenubarShortcut>{getShortcutDisplay({ action: FileAction.Save }).join("+")}</MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            disabled={!activeFile || saveFileAsMutation.isPending}
            onClick={handleSaveAs}
          >
            Save as
            <MenubarShortcut>{getShortcutDisplay({ action: FileAction.SaveAs }).join("+")}</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled={!activeFile} onClick={handleClose}>
            Close
            <MenubarShortcut>{getShortcutDisplay({ action: FileAction.Close }).join("+")}</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default RootMenuBar;
