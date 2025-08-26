import { 
  LayoutDashboard, 
  CreditCard, 
  ArrowLeftRight, 
  BarChart3, 
  PiggyBank, 
  Calendar,
  LogOut
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Contas", url: "/accounts", icon: CreditCard },
  { title: "Transações", url: "/transactions", icon: ArrowLeftRight },
  { title: "Relatórios", url: "/reports", icon: BarChart3 },
  { title: "Caixinhas", url: "/savings", icon: PiggyBank },
  { title: "Lembretes", url: "/reminders", icon: Calendar },
];

export function AppSidebar() {
  const { state: sidebarState } = useSidebar();
  const location = useLocation();
  const { state, dispatch } = useAppContext();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium shadow-sm" 
      : "hover:bg-accent hover:text-accent-foreground";

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null });
  };

  const isCollapsed = sidebarState === "collapsed";

  return (
    <Sidebar 
      className={`transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"} border-r border-border`}
      collapsible="icon"
    >
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <PiggyBank className="w-5 h-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-bold text-foreground">FinanceTracker</h2>
              <p className="text-xs text-muted-foreground">Controle Financeiro</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                      title={isCollapsed ? item.title : undefined}
                    >
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {state.user && (
          <div className="space-y-3">
            {!isCollapsed && (
              <div className="px-3 py-2 rounded-lg bg-muted/50">
                <p className="text-sm font-medium">{state.user.name}</p>
                <p className="text-xs text-muted-foreground">{state.user.email}</p>
              </div>
            )}
            <Button
              variant="ghost"
              size={isCollapsed ? "icon" : "sm"}
              onClick={handleLogout}
              className="w-full justify-start text-muted-foreground hover:text-foreground"
              title={isCollapsed ? "Sair" : undefined}
            >
              <LogOut className="w-4 h-4" />
              {!isCollapsed && <span className="ml-2">Sair</span>}
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}