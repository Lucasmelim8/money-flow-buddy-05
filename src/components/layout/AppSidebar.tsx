import { 
  LayoutDashboard, 
  CreditCard, 
  ArrowLeftRight, 
  BarChart3, 
  PiggyBank, 
  Calendar,
  LogOut
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import React from "react";

// --- MOCK DE USUÁRIO ---
const mockUser = {
  name: "Usuário Exemplo",
  email: "usuario@exemplo.com",
};

// --- LINKS ---
const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Contas", url: "/accounts", icon: CreditCard },
  { title: "Transações", url: "/transactions", icon: ArrowLeftRight },
  { title: "Relatórios", url: "/reports", icon: BarChart3 },
  { title: "Caixinhas", url: "/savings", icon: PiggyBank },
  { title: "Lembretes", url: "/reminders", icon: Calendar },
];

// --- HELPER DE CLASSE ---
const getNavCls = (isActive) =>
  isActive 
    ? "bg-primary text-primary-foreground font-medium shadow-sm"
    : "text-sidebar-foreground hover:bg-accent hover:text-accent-foreground";

// --- ITEM NAV ---
const NavItem = ({ item, isCollapsed }) => (
  <SidebarMenuItem>
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarMenuButton asChild>
            <NavLink
              to={item.url}
              className={({ isActive }) =>
                `${getNavCls(isActive)} ${isCollapsed ? "w-full flex justify-center items-center px-0" : "flex items-center"}`
              }
            >
              <item.icon className={`shrink-0 ${isCollapsed ? "w-6 h-6" : "w-5 h-5"}`} />
              {!isCollapsed && <span className="ml-2">{item.title}</span>}
            </NavLink>
          </SidebarMenuButton>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right" className="ml-2">
            {item.title}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  </SidebarMenuItem>
);

// --- SIDEBAR PRINCIPAL ---
export function AppSidebar() {
  const { state: sidebarState } = useSidebar();
  const isCollapsed = sidebarState === "collapsed";
  
  const state = { user: mockUser };

  const handleLogout = () => {
    console.log("Logout acionado!");
  };
  
  return (
    <Sidebar
      className={`transition-all duration-300 ${isCollapsed ? "w-16" : "w-56"} border-r-2 border-border`}
      collapsible="icon"
    >
      {/* --- HEADER --- */}
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <PiggyBank className="w-5 h-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h2 className="text-lg font-bold text-foreground whitespace-nowrap">FinanceTracker</h2>
              <p className="text-xs text-muted-foreground whitespace-nowrap">Controle Financeiro</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* --- MENU --- */}
      <SidebarContent className="flex-grow">
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : "px-4"}>
            Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <NavItem key={item.url} item={item} isCollapsed={isCollapsed} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* --- FOOTER --- */}
      <SidebarFooter className="p-4">
        {state.user && (
          <div className="space-y-3">
            {!isCollapsed && (
              <div className="px-3 py-2 rounded-lg bg-muted/50 overflow-hidden">
                <p className="text-sm font-medium truncate">{state.user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{state.user.email}</p>
              </div>
            )}
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size={isCollapsed ? "icon" : "sm"}
                    onClick={handleLogout}
                    className={`w-full text-muted-foreground hover:text-destructive ${
                      isCollapsed 
                        ? "justify-center bg-muted hover:bg-destructive/20" 
                        : "justify-start"
                    }`}
                  >
                    <LogOut className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span className="ml-2">Sair</span>}
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" className="ml-2">Sair</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
