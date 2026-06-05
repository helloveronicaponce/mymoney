'use client'

import { useState, useEffect } from 'react'
import { Transaction } from '@/lib/types'

interface LaunchesTabProps {
  month: number
  year: number
}

export default function LaunchesTab({ month, year }: LaunchesTabProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    currentBalance: 0,
    initialBalance: 0,
    projectedBalance: 0,
  })

  useEffect(() => {
    loadTransactions()
  }, [month, year])

  const loadTransactions = async () => {
    try {
      setLoading(true)

      // Import Edge Function fetcher
      const { fetchDataFromEdgeFunction } = await import('@/lib/supabase')
      const data = await fetchDataFromEdgeFunction()

      // Filter transactions by month/year
      const filtered = data.transactions?.filter((t: any) => {
        const date = new Date(t.due_date)
        return date.getMonth() + 1 === month && date.getFullYear() === year
      }) || []

      setTransactions(filtered)
      calculateStats(filtered)
    } catch (error) {
      console.error('Erro ao carregar lançamentos:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (txns: Transaction[]) => {
    const income = txns
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)

    const expense = txns
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)

    setStats({
      currentBalance: income - expense,
      initialBalance: 0, // Será carregado do Supabase depois
      projectedBalance: income - expense,
    })
  }

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>
  }

  return (
    <div>
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm font-medium">Saldo Atual</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            R$ {stats.currentBalance.toFixed(2).replace('.', ',')}
          </h2>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm font-medium">Saldo Inicial</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            R$ {stats.initialBalance.toFixed(2).replace('.', ',')}
          </h2>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm font-medium">Saldo Projetado</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            R$ {stats.projectedBalance.toFixed(2).replace('.', ',')}
          </h2>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Lançamentos do Mês</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Data</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Descrição</th>
                <th className="px-6 py-3 text-right text-gray-700 font-semibold">Valor</th>
                <th className="px-6 py-3 text-center text-gray-700 font-semibold">Tipo</th>
                <th className="px-6 py-3 text-center text-gray-700 font-semibold">Status</th>
                <th className="px-6 py-3 text-center text-gray-700 font-semibold">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      {new Date(transaction.due_date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{transaction.description}</td>
                    <td className="px-6 py-4 text-right font-semibold">
                      <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                        {transaction.type === 'income' ? '+' : '-'}R$ {Math.abs(transaction.amount).toFixed(2).replace('.', ',')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {transaction.recurrence_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        transaction.status === 'paid' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        transaction.status === 'scheduled' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Editar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-600">
                    Nenhum lançamento encontrado para este mês
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
