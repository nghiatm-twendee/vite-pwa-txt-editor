import { CircleIcon, XIcon } from "lucide-react";
import { useFileStore } from "@/store/app-file-state.store";
import type { OpenFile } from "@/types";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { focusTextarea } from "@/components/common/focusable-textarea";

const RootSideBar = () => {
  const openFiles = useFileStore((s) => s.openFiles);
  const activeFileId = useFileStore((s) => s.activeFileId);
  const setActiveFile = useFileStore((s) => s.setActiveFile);
  const closeFile = useFileStore((s) => s.closeFile);

  const handleSelectFile = (id: string) => () => {
    setActiveFile(id);
    focusTextarea();
  };

  const handleCloseFile = (file: OpenFile) => () => {
    if (file.isDirty) {
      const confirmed = window.confirm(
        `"${file.name}" has unsaved changes. Close anyway?`,
      );
      if (!confirmed) return;
    }
    closeFile(file.id);
    focusTextarea();
  };

  return (
    <Sidebar>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {openFiles.map((file) => (
              <SidebarMenuItem key={file.id}>
                <SidebarMenuButton
                  isActive={file.id === activeFileId}
                  onClick={handleSelectFile(file.id)}
                >
                  {file.name}
                </SidebarMenuButton>
                <SidebarMenuAction showOnHover onClick={handleCloseFile(file)}>
                  <XIcon />
                  <span className="sr-only">Remove</span>
                </SidebarMenuAction>
                {file.isDirty && (
                  <SidebarMenuBadge className="group-hover/menu-item:hidden">
                    <CircleIcon className="size-2 fill-current" />
                    <span className="sr-only">Unsaved changes</span>
                  </SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
};

export default RootSideBar;
