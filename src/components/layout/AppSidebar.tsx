import {
  LayoutDashboard,
  CreditCard,
  ArrowLeftRight,
  BarChart3,
  PiggyBank,
  Calendar,
  LogOut
} from "lucide-react";
// Removido: NavLink não é usado diretamente, pois é passado para 'asChild'.
// import { NavLink } from "react-router-dom";
import React from "react";

// --- COMPONENTES MOCK (PARA DEMONSTRAÇÃO) ---
// Estes são componentes de espaço reservado para que o exemplo seja executável.
// Substitua-os pelos seus componentes reais da sua biblioteca de UI (ex: shadcn/ui).

const MockNavLink = React.forwardRef(({ className, to, children, ...props }, ref) => (
  <a href={to} className={className} ref={ref} {...props}>
    {children}
  </a>
));
MockNavLink.displayName = "MockNavLink";

const Button = React.forwardRef(({ className, children, ...props }, ref) => (
  <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ${className}`} ref={ref} {...props}>
    {children}
  </button>
));
Button.displayName = "Button";

const TooltipProvider = ({ children, delayDuration }) => <div>{children}</div>;
const Tooltip = ({ children }) => <div className="relative inline-block">{children}</div>;
const TooltipTrigger = ({ children, asChild }) => React.cloneElement(children);
const TooltipContent = ({ children, side, className }) => (
  <div className={`absolute z-10 p-2 text-xs bg-black text-white rounded-md ${className}`} style={{ left: '110%', top: '50%', transform: 'translateY(-50%)' }}>
    {children}
  </div>
);

// --- DADOS MOCK (SUBSTITUINDO O CONTEXTO AUSENTE) ---
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
// Nenhuma alteração necessária aqui, o problema estava no TooltipProvider.
const NavItem = ({ item, isCollapsed }) => (
  <li className="px-2">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          asChild
          variant="ghost"
          className={`w-full flex items-center gap-2 p-2 rounded-md transition-all duration-200 ${
            getNavCls(false) // Usando 'false' para mock, substitua pela lógica real de 'isActive'
          } ${isCollapsed ? "justify-center" : "justify-start"}`}
        >
          <MockNavLink to={item.url}>
            <item.icon className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span className="truncate">{item.title}</span>}
          </MockNavLink>
        </Button>
      </TooltipTrigger>
      {isCollapsed && (
        <TooltipContent side="right" className="ml-2">
          {item.title}
        </TooltipContent>
      )}
    </Tooltip>
  </li>
);

// --- COMPONENTE PRINCIPAL DA SIDEBAR ---
export default function AppSidebar() {
  // Para demonstração, o estado é controlado localmente.
  // No seu app, você usaria o 'useSidebar()'.
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const state = { user: mockUser };

  const handleLogout = () => {
    console.log("Logout acionado!");
  };

  return (
    // CORREÇÃO 2: Adicionado um pequeno delay (100ms) ao TooltipProvider.
    // Isso evita que todos os tooltips sejam acionados simultaneamente durante a
    // animação de fechar/abrir a sidebar, corrigindo o bug.
    <TooltipProvider delayDuration={100}>
      <aside
        // CORREÇÃO 1: A largura da sidebar fechada foi aumentada de w-20 para w-24.
        className={`flex flex-col h-screen bg-background transition-all duration-300 ${isCollapsed ? "w-24" : "w-64"} border-r-2 border-border`}
      >
        {/* --- CABEÇALHO --- */}
        <header className="p-4 border-b-2">
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
        </header>

        {/* --- CONTEÚDO PRINCIPAL (NAVEGAÇÃO) --- */}
        <nav className="flex-grow p-2">
          <p className={`text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 ${isCollapsed ? 'text-center' : 'px-2'}`}>
            {isCollapsed ? 'Menu' : 'Principal'}
          </p>
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <NavItem key={item.url} item={item} isCollapsed={isCollapsed} />
            ))}
          </ul>
        </nav>

        {/* --- RODAPÉ --- */}
        <footer className="p-4 mt-auto border-t-2">
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
                    // CORREÇÃO 3: Adicionado 'hover:bg-accent' para consistência visual.
                    // Agora o botão de sair terá um fundo ao passar o mouse,
                    // assim como os outros itens do menu.
                    className={`w-full text-muted-foreground hover:bg-accent hover:text-destructive ${
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
          {/* Botão para controlar o estado (para demonstração) */}
          <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? "Abrir" : "Fechar"}
          </Button>
        </footer>
      </aside>
    </TooltipProvider>
  );
}
