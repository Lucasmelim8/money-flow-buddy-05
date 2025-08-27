import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="fixed top-0 right-0 left-0 h-14 flex items-center border-b border-border px-4 bg-card z-40">
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
    </SidebarProvider>
  );
}