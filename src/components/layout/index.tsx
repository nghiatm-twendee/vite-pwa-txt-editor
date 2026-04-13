import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "../provider/theme/theme-provider";
import { SidebarProvider } from "../ui/sidebar";
import { TooltipProvider } from "../ui/tooltip";
import RootMenuBar from "./menu-bar";
import RootSideBar from "./side-bar";
import { Toaster } from "../ui/sonner";

interface Props {
  children?: React.ReactNode;
}

const queryClient = new QueryClient();

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <TooltipProvider>
            <SidebarProvider>
              <RootSideBar />
              <main className="flex-1">
                <RootMenuBar />
                {children}
              </main>
              <Toaster />
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};

export default RootLayout;
