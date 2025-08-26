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
} from "@/components/ui/sidebar"; // Supondo que estes componentes existam no seu projeto
import { Button } from "@/components/ui/button"; // Supondo que este componente exista
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Supondo que este componente exista
import React from "react";

// --- DADOS MOCK (SUBSTITUINDO O CONTEXTO AUSENTE) ---
// Para demonstração, estamos usando um objeto de usuário mock.
const mockUser = {
  name: "Usuário Exemplo",
  email: "usuario@exemplo.com",
};


// --- DADOS DE NAVEGAÇÃO ---
const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Contas", url: "/accounts", icon: CreditCard },
  { title: "Transações", url: "/transactions", icon: ArrowLeftRight },
  { title: "Relatórios", url: "/reports", icon: BarChart3 },
  { title: "Caixinhas", url: "/savings", icon: PiggyBank },
  { title: "Lembretes", url: "/reminders", icon: Calendar },
];

// --- FUNÇÃO DE ESTILO HELPER ---
const getNavCls = (isActive) =>
  isActive 
    ? "bg-primary text-primary-foreground font-medium shadow-sm"
    : "text-sidebar-foreground hover:bg-accent hover:text-accent-foreground";

// --- COMPONENTE DE ITEM DE NAVEGAÇÃO REUTILIZÁVEL ---
const NavItem = ({ item, isCollapsed }) => (
  <SidebarMenuItem>
    <Tooltip>
      <TooltipTrigger asChild>
        <SidebarMenuButton asChild>
          <NavLink
            to={item.url}
            className={({ isActive }) =>
              `${getNavCls(isActive)} ${isCollapsed ? "justify-center" : ""}`
            }
          >
            <item.icon className="w-4 h-4 shrink-0" />
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
  </SidebarMenuItem>
);

// --- COMPONENTE PRINCIPAL DA SIDEBAR ---
export function AppSidebar() {
  const { state: sidebarState } = useSidebar();
  const isCollapsed = sidebarState === "collapsed";
  
  const state = { user: mockUser };

  const handleLogout = () => {
    console.log("Logout acionado!");
  };
  
  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar
        className={`transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"} border-r-2 border-border`}
        collapsible="icon"
      >
        {/* --- CABEÇALHO --- */}
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
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

        {/* --- CONTEÚDO PRINCIPAL (NAVEGAÇÃO) --- */}
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

        {/* --- RODAPÉ --- */}
        <SidebarFooter className="p-4">
          {state.user && (
            <div className="space-y-3">
              {!isCollapsed && (
                <div className="px-3 py-2 rounded-lg bg-muted/50 overflow-hidden">
                  <p className="text-sm font-medium truncate">{state.user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{state.user.email}</p>
                </div>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size={isCollapsed ? "icon" : "sm"}
                    onClick={handleLogout}
                    className={`w-full text-muted-foreground hover:text-destructive ${
                      isCollapsed ? "justify-center" : "justify-start"
                    }`}
                  >
                    <LogOut className="w-4 h-4 shrink-0" />
                    {!isCollapsed && <span className="ml-2">Sair</span>}
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" className="ml-2">Sair</TooltipContent>
                )}
              </Tooltip>
            </div>
          )}
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
}
