import { ThemeProvider } from "../provider/theme/theme-provider";
import { SidebarProvider } from "../ui/sidebar";
import { TooltipProvider } from "../ui/tooltip";
import RootMenuBar from "./menu-bar";
import RootSideBar from "./side-bar";

interface Props {
  children?: React.ReactNode;
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <TooltipProvider>
          <SidebarProvider>
            <RootSideBar />
            <main className="w-[calc(100%-var(--sidebar-width))]">
              <RootMenuBar />
              {children}
            </main>
          </SidebarProvider>
        </TooltipProvider>
      </ThemeProvider>
    </>
  );
};

export default RootLayout;
