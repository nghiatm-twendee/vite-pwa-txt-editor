import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu } from "@/components/ui/sidebar";


const RootSideBar = () => {
  return (
    <Sidebar>
        <SidebarHeader></SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
};

export default RootSideBar;