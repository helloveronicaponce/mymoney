export interface Transaction {
  id: string;
  user_id?: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category?: string;
  recurrence_type: 'one_time' | 'recurring' | 'installment';
  status: 'paid' | 'pending' | 'scheduled' | 'overdue';
  due_date: string;
  payment_date?: string;
  installment_number?: number;
  total_installments?: number;
  credit_card_statement_id?: string;
  debt_id?: string;
  investment_id?: string;
  source: 'manual' | 'credit_card' | 'debt_payment' | 'investment';
  linked_type?: 'credit_card' | 'debt' | 'investment' | 'none';
  linked_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CreditCard {
  id: string;
  user_id?: string;
  name: string;
  issuer: string;
  limit: number;
  closing_day: number;
  due_day: number;
  color_primary: string;
  color_secondary: string;
  status: 'active' | 'inactive' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface CreditCardStatement {
  id: string;
  credit_card_id: string;
  statement_month: string;
  total_amount: number;
  status: 'open' | 'paid';
  closing_date: string;
  due_date: string;
  payment_date?: string;
  created_at: string;
}

export interface CreditCardTransaction {
  id: string;
  credit_card_id: string;
  statement_id: string;
  category_id: string;
  description: string;
  amount: number;
  transaction_date: string;
  created_at: string;
}

export interface Debt {
  id: string;
  user_id?: string;
  name: string;
  total_amount: number;
  remaining_balance: number;
  monthly_payment: number;
  start_date: string;
  end_date: string;
  payment_status: 'in_progress' | 'paid_off' | 'overdue';
  created_at: string;
  updated_at: string;
}

export interface DebtPayment {
  id: string;
  debt_id: string;
  transaction_id?: string;
  amount: number;
  payment_date: string;
  notes?: string;
  created_at: string;
}

export interface Investment {
  id: string;
  user_id?: string;
  name: string;
  type: string;
  total_invested: number;
  current_amount: number;
  initial_investment_date: string;
  withdrawal_date?: string;
  status: 'active' | 'withdrawn' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface InvestmentContribution {
  id: string;
  investment_id: string;
  transaction_id?: string;
  amount: number;
  contribution_date: string;
  notes?: string;
  created_at: string;
}

export interface TransactionCategory {
  id: string;
  user_id?: string;
  name: string;
  color: string;
  icon?: string;
  description?: string;
  created_at: string;
}
