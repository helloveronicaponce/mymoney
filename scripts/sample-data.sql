-- Sample data for MyMoney
-- Execute este script no SQL Editor do Supabase para inserir dados de teste

-- Insert sample credit cards
INSERT INTO credit_cards (name, issuer, "limit", closing_day, due_day, color_primary, color_secondary, status) VALUES
('Itaú', 'Itaú Unibanco', 5000.00, 15, 25, '#FF6B35', '#FF8C42', 'active'),
('Bradesco', 'Bradesco', 3000.00, 20, 30, '#004E89', '#1B6CA8', 'active');

-- Insert sample transactions for June 2026
INSERT INTO transactions (description, amount, type, category, recurrence_type, status, due_date, payment_date, source, linked_type) VALUES
('Supermercado', 250.50, 'expense', 'Mercado', 'one_time', 'paid', '2026-06-05', '2026-06-05', 'manual', 'none'),
('Salário', 5000.00, 'income', NULL, 'recurring', 'paid', '2026-06-01', '2026-06-01', 'manual', 'none'),
('Aluguel', 1500.00, 'expense', 'Casa', 'recurring', 'pending', '2026-06-10', NULL, 'manual', 'none'),
('Netflix', 29.90, 'expense', 'Assinatura', 'recurring', 'paid', '2026-06-05', '2026-06-05', 'manual', 'none'),
('Gasolina', 180.00, 'expense', 'Transporte', 'one_time', 'paid', '2026-06-08', '2026-06-08', 'manual', 'none'),
('Restaurante', 89.50, 'expense', 'Alimentação', 'one_time', 'paid', '2026-06-12', '2026-06-12', 'manual', 'none');

-- Insert sample debts
INSERT INTO debts (name, total_amount, remaining_balance, monthly_payment, start_date, end_date, payment_status) VALUES
('Empréstimo Pessoal', 10000.00, 7500.00, 500.00, '2025-06-01', '2027-06-01', 'in_progress'),
('Parcelado no cartão', 2000.00, 1200.00, 400.00, '2026-01-01', '2026-08-01', 'in_progress');

-- Insert sample investments
INSERT INTO investments (name, type, total_invested, current_amount, initial_investment_date, status) VALUES
('Fundo de Renda Fixa', 'Renda Fixa', 5000.00, 5250.00, '2025-12-01', 'active'),
('Ações Tecnologia', 'Ações', 3000.00, 3450.00, '2026-01-15', 'active'),
('LCI', 'Tesouro', 2000.00, 2050.00, '2026-03-01', 'active');

-- Insert sample credit card statement
INSERT INTO credit_card_statements (credit_card_id, statement_month, total_amount, status, closing_date, due_date)
SELECT id, '2026-06-01', 1500.00, 'open', '2026-06-15', '2026-06-25' FROM credit_cards WHERE name = 'Itaú' LIMIT 1;

-- Insert sample credit card transactions
INSERT INTO credit_card_transactions (credit_card_id, statement_id, description, amount, transaction_date)
SELECT cc.id, ccs.id, 'Compra no mercado', 250.00, '2026-06-05'
FROM credit_cards cc, credit_card_statements ccs
WHERE cc.name = 'Itaú' AND ccs.credit_card_id = cc.id
LIMIT 1;

INSERT INTO credit_card_transactions (credit_card_id, statement_id, description, amount, transaction_date)
SELECT cc.id, ccs.id, 'Restaurante', 89.50, '2026-06-12'
FROM credit_cards cc, credit_card_statements ccs
WHERE cc.name = 'Itaú' AND ccs.credit_card_id = cc.id
LIMIT 1;
