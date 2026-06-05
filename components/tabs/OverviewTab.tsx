'use client'

import { useState, useEffect } from 'react'
import { Debt, Investment } from '@/lib/types'
import { fetchDataFromEdgeFunction } from '@/lib/supabase'

interface OverviewTabProps {
  month: number
  year: number
}

export default function OverviewTab({ month: _month, year: _year }: OverviewTabProps) {
  const [debts, setDebts] = useState<Debt[]>([])
  const [investments, setInvestments] = useState<Investment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const data = await fetchDataFromEdgeFunction()

      setDebts(data.debts || [])
      setInvestments(data.investments?.filter((i: any) => i.status === 'active') || [])
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Visão Geral Financeira</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm font-medium">Receita Total</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">R$ --,--</h2>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
          <p className="text-gray-600 text-sm font-medium">Despesa Total</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">R$ --,--</h2>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm font-medium">Saldo Líquido</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">R$ --,--</h2>
        </div>
      </div>

      {/* Debts and Investments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Debts */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">💳 Dívidas</h3>
          <div className="space-y-4">
            {debts.length > 0 ? (
              debts.map((debt) => (
                <div
                  key={debt.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 hover:bg-orange-50 transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-gray-900">{debt.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      debt.payment_status === 'in_progress' ? 'bg-orange-100 text-orange-800' :
                      debt.payment_status === 'overdue' ? 'bg-red-100 text-red-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {debt.payment_status === 'in_progress' ? 'Em Andamento' :
                       debt.payment_status === 'overdue' ? 'Atrasado' : 'Pago'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Saldo Devedor</p>
                      <p className="font-semibold text-red-600">R$ {debt.remaining_balance.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Parcela</p>
                      <p className="font-semibold">R$ {debt.monthly_payment.toFixed(2).replace('.', ',')}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 py-8">Nenhuma dívida encontrada</p>
            )}
          </div>
        </div>

        {/* Investments */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📈 Investimentos</h3>
          <div className="space-y-4">
            {investments.length > 0 ? (
              investments.map((investment) => (
                <div
                  key={investment.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-green-300 hover:bg-green-50 transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-gray-900">{investment.name}</h4>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                      Ativo
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Valor Investido</p>
                      <p className="font-semibold text-green-600">R$ {investment.total_invested.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Valor Atual</p>
                      <p className="font-semibold">R$ {investment.current_amount.toFixed(2).replace('.', ',')}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-green-600 font-semibold">
                      Ganho: +R$ {(investment.current_amount - investment.total_invested).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 py-8">Nenhum investimento encontrado</p>
            )}
          </div>
        </div>
      </div>

      {/* Placeholder for projections */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">🔮 Projeção de Fluxo de Caixa</h3>
        <div className="text-center text-gray-600 py-8">
          Projeção será carregada aqui
        </div>
      </div>
    </div>
  )
}
