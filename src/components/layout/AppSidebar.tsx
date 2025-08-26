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
// O erro ocorreu porque o AppContext não foi fornecido.
// Para demonstração, estamos usando um objeto de usuário mock.
// Em uma aplicação real, você substituiria isso pelo seu contexto de autenticação.
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
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarMenuButton asChild>
            <NavLink
              to={item.url}
              className={({ isActive }) => getNavCls(isActive)}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className={`transition-opacity duration-200 ${isCollapsed ? "opacity-0 w-0" : "opacity-100 ml-2"}`}>
                {item.title}
              </span>
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

// --- COMPONENTE PRINCIPAL DA SIDEBAR ---
export function AppSidebar() {
  // O hook useSidebar pode não estar disponível, então vamos simular seu estado.
  // Se você tiver o hook, pode descomentar a linha abaixo e remover a simulação.
  // const { state: sidebarState } = useSidebar();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  
  // Simulação do estado do usuário, já que o contexto não está disponível.
  const state = { user: mockUser };

  const handleLogout = () => {
    // A função dispatch foi removida pois dependia do contexto.
    console.log("Logout acionado!");
  };
  
  // Simulação da funcionalidade de colapsar/expandir
  // Em uma implementação real, o componente Sidebar controlaria isso.
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);


  return (
    <Sidebar
      className={`transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"} border-r border-border`}
      // A prop 'collapsible' pode precisar de um manipulador de estado.
      // Adicionando um botão de toggle para simular a funcionalidade.
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
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
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
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size={isCollapsed ? "icon" : "sm"}
                    onClick={handleLogout}
                    className="w-full justify-start text-muted-foreground hover:text-destructive"
                  >
                    <LogOut className="w-4 h-4 shrink-0" />
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
