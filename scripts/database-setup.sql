-- MyMoney Database Setup Script
-- Execute este script no SQL Editor do Supabase

-- 1. Transaction Categories
CREATE TABLE IF NOT EXISTS transaction_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  name TEXT NOT NULL UNIQUE,
  color VARCHAR(7) DEFAULT '#6B7280',
  icon TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Transactions (Lançamentos)
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  description TEXT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category TEXT,
  recurrence_type TEXT NOT NULL CHECK (recurrence_type IN ('one_time', 'recurring', 'installment')),
  status TEXT NOT NULL CHECK (status IN ('paid', 'pending', 'scheduled', 'overdue')),
  due_date DATE NOT NULL,
  payment_date DATE,
  installment_number INTEGER,
  total_installments INTEGER,
  credit_card_statement_id UUID,
  debt_id UUID,
  investment_id UUID,
  source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'credit_card', 'debt_payment', 'investment')),
  linked_type TEXT DEFAULT 'none' CHECK (linked_type IN ('credit_card', 'debt', 'investment', 'none')),
  linked_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Credit Cards
CREATE TABLE IF NOT EXISTS credit_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  "limit" DECIMAL(12, 2) NOT NULL,
  closing_day INTEGER NOT NULL CHECK (closing_day >= 1 AND closing_day <= 31),
  due_day INTEGER NOT NULL CHECK (due_day >= 1 AND due_day <= 31),
  color_primary VARCHAR(7) DEFAULT '#3B82F6',
  color_secondary VARCHAR(7) DEFAULT '#1E40AF',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Credit Card Statements (Faturas)
CREATE TABLE IF NOT EXISTS credit_card_statements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  credit_card_id UUID NOT NULL REFERENCES credit_cards(id) ON DELETE CASCADE,
  statement_month DATE NOT NULL,
  total_amount DECIMAL(12, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('open', 'paid')),
  closing_date DATE NOT NULL,
  due_date DATE NOT NULL,
  payment_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(credit_card_id, statement_month)
);

-- 5. Credit Card Transactions
CREATE TABLE IF NOT EXISTS credit_card_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  credit_card_id UUID NOT NULL REFERENCES credit_cards(id) ON DELETE CASCADE,
  statement_id UUID NOT NULL REFERENCES credit_card_statements(id) ON DELETE CASCADE,
  category_id UUID REFERENCES transaction_categories(id),
  description TEXT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  transaction_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Debts (Dívidas)
CREATE TABLE IF NOT EXISTS debts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  name TEXT NOT NULL,
  total_amount DECIMAL(12, 2) NOT NULL,
  remaining_balance DECIMAL(12, 2) NOT NULL,
  monthly_payment DECIMAL(12, 2) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  payment_status TEXT DEFAULT 'in_progress' CHECK (payment_status IN ('in_progress', 'paid_off', 'overdue')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Debt Payments
CREATE TABLE IF NOT EXISTS debt_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  debt_id UUID NOT NULL REFERENCES debts(id) ON DELETE CASCADE,
  transaction_id UUID REFERENCES transactions(id) ON DELETE SET NULL,
  amount DECIMAL(12, 2) NOT NULL,
  payment_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Investments
CREATE TABLE IF NOT EXISTS investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  total_invested DECIMAL(12, 2) NOT NULL,
  current_amount DECIMAL(12, 2) NOT NULL,
  initial_investment_date DATE NOT NULL,
  withdrawal_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'withdrawn', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Investment Contributions
CREATE TABLE IF NOT EXISTS investment_contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investment_id UUID NOT NULL REFERENCES investments(id) ON DELETE CASCADE,
  transaction_id UUID REFERENCES transactions(id) ON DELETE SET NULL,
  amount DECIMAL(12, 2) NOT NULL,
  contribution_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Indexes for Better Performance
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_due_date ON transactions(due_date);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_credit_cards_user_id ON credit_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_card_statements_card_id ON credit_card_statements(credit_card_id);
CREATE INDEX IF NOT EXISTS idx_debts_user_id ON debts(user_id);
CREATE INDEX IF NOT EXISTS idx_investments_user_id ON investments(user_id);

-- Insert Default Categories
INSERT INTO transaction_categories (name, color) VALUES
  ('Mercado', '#22c55e'),
  ('Assinatura', '#a855f7'),
  ('Lazer', '#f97316'),
  ('Transporte', '#3b82f6'),
  ('Saúde', '#ef4444'),
  ('Casa', '#8b5cf6'),
  ('Alimentação', '#ec4899'),
  ('Educação', '#06b6d4'),
  ('Vestuário', '#f59e0b'),
  ('Utilidades', '#64748b')
ON CONFLICT (name) DO NOTHING;

-- Enable RLS (Row Level Security)
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_card_statements ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_card_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE debts ENABLE ROW LEVEL SECURITY;
ALTER TABLE debt_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE investment_contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transaction_categories ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies (Permitir acesso público por enquanto, sem autenticação)
-- Quando implementar autenticação, atualize as policies

CREATE POLICY "Enable read access for all users" ON transactions AS SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON transactions AS INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON transactions AS UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON transactions AS DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON credit_cards AS SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON credit_cards AS INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON credit_cards AS UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON credit_card_statements AS SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON credit_card_statements AS INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON credit_card_statements AS UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON credit_card_transactions AS SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON credit_card_transactions AS INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON debts AS SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON debts AS INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON debts AS UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON debt_payments AS SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON debt_payments AS INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON investments AS SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON investments AS INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON investments AS UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON investment_contributions AS SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON investment_contributions AS INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON transaction_categories AS SELECT USING (true);
