import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'wallet' | 'checking' | 'debit_card' | 'credit_card';
  balance: number;
  creditLimit?: number;
}

export interface Transaction {
  id: string;
  date: string;
  category: string;
  description: string;
  type: 'income' | 'expense';
  amount: number;
  accountId: string;
  paymentMethod: 'cash' | 'debit' | 'credit' | 'pix';
  isRecurring: boolean;
  week: number;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
}

export interface Reminder {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'bill' | 'birthday' | 'goal' | 'other';
}

export interface AppState {
  user: User | null;
  accounts: Account[];
  transactions: Transaction[];
  savingsGoals: SavingsGoal[];
  reminders: Reminder[];
  categories: string[];
}

// Actions
type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_ACCOUNT'; payload: Account }
  | { type: 'UPDATE_ACCOUNT'; payload: Account }
  | { type: 'DELETE_ACCOUNT'; payload: string }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'ADD_SAVINGS_GOAL'; payload: SavingsGoal }
  | { type: 'UPDATE_SAVINGS_GOAL'; payload: SavingsGoal }
  | { type: 'DELETE_SAVINGS_GOAL'; payload: string }
  | { type: 'ADD_REMINDER'; payload: Reminder }
  | { type: 'UPDATE_REMINDER'; payload: Reminder }
  | { type: 'DELETE_REMINDER'; payload: string }
  | { type: 'LOAD_DATA'; payload: AppState };

// Initial state
const initialState: AppState = {
  user: null,
  accounts: [
    {
      id: '1',
      name: 'Carteira',
      type: 'wallet',
      balance: 150.50
    },
    {
      id: '2',
      name: 'Conta Corrente',
      type: 'checking',
      balance: 2500.00
    },
    {
      id: '3',
      name: 'Cartão de Crédito',
      type: 'credit_card',
      balance: -450.30,
      creditLimit: 3000
    }
  ],
  transactions: [
    {
      id: '1',
      date: '2024-01-20',
      category: 'Alimentação',
      description: 'Almoço no restaurante',
      type: 'expense',
      amount: 35.90,
      accountId: '1',
      paymentMethod: 'cash',
      isRecurring: false,
      week: 3
    },
    {
      id: '2',
      date: '2024-01-18',
      category: 'Salário',
      description: 'Salário Janeiro',
      type: 'income',
      amount: 4500.00,
      accountId: '2',
      paymentMethod: 'pix',
      isRecurring: true,
      week: 3
    }
  ],
  savingsGoals: [
    {
      id: '1',
      name: 'Viagem de Férias',
      targetAmount: 5000,
      currentAmount: 1200,
      deadline: '2024-12-31'
    }
  ],
  reminders: [
    {
      id: '1',
      title: 'Vencimento Cartão',
      description: 'Fatura do cartão de crédito vence em 3 dias',
      date: '2024-01-25',
      type: 'bill'
    }
  ],
  categories: [
    'Alimentação',
    'Transporte',
    'Lazer',
    'Saúde',
    'Educação',
    'Casa',
    'Roupas',
    'Salário',
    'Freelances',
    'Investimentos',
    'Outros'
  ]
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'ADD_ACCOUNT':
      return { ...state, accounts: [...state.accounts, action.payload] };
    
    case 'UPDATE_ACCOUNT':
      return {
        ...state,
        accounts: state.accounts.map(account =>
          account.id === action.payload.id ? action.payload : account
        )
      };
    
    case 'DELETE_ACCOUNT':
      return {
        ...state,
        accounts: state.accounts.filter(account => account.id !== action.payload)
      };
    
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [...state.transactions, action.payload] };
    
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction.id === action.payload.id ? action.payload : transaction
        )
      };
    
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
      };
    
    case 'ADD_SAVINGS_GOAL':
      return { ...state, savingsGoals: [...state.savingsGoals, action.payload] };
    
    case 'UPDATE_SAVINGS_GOAL':
      return {
        ...state,
        savingsGoals: state.savingsGoals.map(goal =>
          goal.id === action.payload.id ? action.payload : goal
        )
      };
    
    case 'DELETE_SAVINGS_GOAL':
      return {
        ...state,
        savingsGoals: state.savingsGoals.filter(goal => goal.id !== action.payload)
      };
    
    case 'ADD_REMINDER':
      return { ...state, reminders: [...state.reminders, action.payload] };
    
    case 'UPDATE_REMINDER':
      return {
        ...state,
        reminders: state.reminders.map(reminder =>
          reminder.id === action.payload.id ? action.payload : reminder
        )
      };
    
    case 'DELETE_REMINDER':
      return {
        ...state,
        reminders: state.reminders.filter(reminder => reminder.id !== action.payload)
      };
    
    case 'LOAD_DATA':
      return action.payload;
    
    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('expense-tracker-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', payload: parsedData });
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('expense-tracker-data', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};