import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppLayoutContent />
    </SidebarProvider>
  );
}

function AppLayoutContent() {
  const { state: sidebarState } = useSidebar();
  const isCollapsed = sidebarState === "collapsed";
  const sidebarWidth = isCollapsed ? "4rem" : "14rem"; // 16 = 4rem, 56 = 14rem

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header 
          className="fixed top-0 right-0 h-14 flex items-center border-b border-border px-4 bg-card z-40 transition-all duration-300"
          style={{ left: sidebarWidth }}
        >
          <SidebarTrigger className="mr-4" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">Controle Financeiro</h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto pt-14">
          <Outlet />
        </main>
      </div>
    </div>
  );
}