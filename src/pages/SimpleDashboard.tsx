import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  AlertTriangle,
  Plus,
  CreditCard,
  PiggyBank,
  Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SimpleDashboard() {
  const { state } = useAppContext();
  const navigate = useNavigate();

  // Cálculos dos dados do mês atual
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const currentMonthTransactions = state.transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate.getMonth() === currentMonth && 
           transactionDate.getFullYear() === currentYear;
  });

  const totalIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Saldo total das contas
  const totalAccountsBalance = state.accounts.reduce((sum, account) => sum + account.balance, 0);

  // Próximos lembretes
  const upcomingReminders = state.reminders
    .filter(reminder => new Date(reminder.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral das suas finanças em {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </p>
        </div>
        <Button onClick={() => navigate('/transactions')} variant="gradient">
          <Plus className="w-4 h-4 mr-2" />
          Nova Transação
        </Button>
      </div>

      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card animate-slide-up">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas do Mês</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% do mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas do Mês</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              +5% do mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo do Mês</CardTitle>
            <Wallet className={`h-4 w-4 ${balance >= 0 ? 'text-success' : 'text-destructive'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${balance >= 0 ? 'text-success' : 'text-destructive'}`}>
              R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Receitas - Despesas
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total em Contas</CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              R$ {totalAccountsBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              {state.accounts.length} contas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Seção de alertas e ações rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Alertas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {totalExpenses > totalIncome * 0.8 && (
              <div className="p-3 rounded-lg bg-warning-light text-sm">
                Gastos estão altos este mês! ({((totalExpenses / totalIncome) * 100).toFixed(0)}% da receita)
              </div>
            )}
            {upcomingReminders.length > 0 && (
              <div className="p-3 rounded-lg bg-primary/5 text-sm">
                {upcomingReminders.length} lembrete(s) próximo(s)
              </div>
            )}
            {totalAccountsBalance < 0 && (
              <div className="p-3 rounded-lg bg-destructive-light text-sm">
                Saldo total negativo nas contas
              </div>
            )}
            {totalExpenses <= totalIncome * 0.5 && totalIncome > 0 && (
              <div className="p-3 rounded-lg bg-success-light text-sm">
                Parabéns! Gastos controlados este mês
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="h-4 w-4 text-success" />
              Metas de Poupança
            </CardTitle>
          </CardHeader>
          <CardContent>
            {state.savingsGoals.length > 0 ? (
              <div className="space-y-3">
                {state.savingsGoals.slice(0, 2).map(goal => (
                  <div key={goal.id} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{goal.name}</span>
                      <span>{((goal.currentAmount / goal.targetAmount) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full" 
                        style={{ width: `${Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => navigate('/savings')}
                >
                  Ver todas
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Nenhuma meta criada ainda
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/savings')}
                >
                  Criar meta
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Próximos Lembretes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingReminders.length > 0 ? (
              <div className="space-y-3">
                {upcomingReminders.map(reminder => (
                  <div key={reminder.id} className="p-3 rounded-lg bg-muted/50 text-sm">
                    <div className="font-medium">{reminder.title}</div>
                    <div className="text-muted-foreground">
                      {new Date(reminder.date).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => navigate('/reminders')}
                >
                  Ver todos
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Nenhum lembrete próximo
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/reminders')}
                >
                  Criar lembrete
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Lista das últimas transações */}
      <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.9s' }}>
        <CardHeader>
          <CardTitle>Últimas Transações</CardTitle>
          <CardDescription>Suas transações mais recentes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {state.transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-success/10' : 'bg-destructive/10'}`}>
                    {transaction.type === 'income' ? (
                      <TrendingUp className="w-4 h-4 text-success" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.category}</p>
                  </div>
                </div>
                <span className={`font-bold ${transaction.type === 'income' ? 'text-success' : 'text-destructive'}`}>
                  {transaction.type === 'income' ? '+' : '-'}R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
            {state.transactions.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                Nenhuma transação registrada ainda
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}