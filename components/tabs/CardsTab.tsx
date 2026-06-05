'use client'

import { useState, useEffect } from 'react'
import { CreditCard } from '@/lib/types'

interface CardsTabProps {
  month: number
  year: number
}

export default function CardsTab({ month: _month, year: _year }: CardsTabProps) {
  const [cards, setCards] = useState<CreditCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCards()
  }, [])

  const loadCards = async () => {
    try {
      setLoading(true)
      const { fetchDataFromEdgeFunction } = await import('@/lib/supabase')
      const data = await fetchDataFromEdgeFunction()

      const activeCards = data.creditCards?.filter((c: any) => c.status === 'active') || []
      setCards(activeCards)
    } catch (error) {
      console.error('Erro ao carregar cartões:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Meus Cartões de Crédito</h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div
              key={card.id}
              className="rounded-xl shadow-lg p-6 text-white relative overflow-hidden"
              style={{
                background: `linear-gradient(to bottom right, ${card.color_primary}, ${card.color_secondary})`
              }}
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-opacity-80 text-xs font-semibold tracking-wider">CARTÃO DE CRÉDITO</p>
                    <h3 className="text-xl font-bold mt-1">{card.name}</h3>
                  </div>
                  <span className="bg-opacity-30 bg-white px-3 py-1 rounded-full text-xs font-semibold">
                    Ativo
                  </span>
                </div>
                <div className="mb-6">
                  <p className="text-opacity-80 text-sm">Fatura Atual</p>
                  <h2 className="text-3xl font-bold">R$ --,--</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-opacity-80">Fechamento</p>
                    <p className="font-semibold">Dia {card.closing_day}</p>
                  </div>
                  <div>
                    <p className="text-opacity-80">Vencimento</p>
                    <p className="font-semibold">Dia {card.due_day}</p>
                  </div>
                  <div>
                    <p className="text-opacity-80">Limite Total</p>
                    <p className="font-semibold">R$ {card.limit.toFixed(2).replace('.', ',')}</p>
                  </div>
                  <div>
                    <p className="text-opacity-80">Disponível</p>
                    <p className="font-semibold">R$ --,--</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-8 text-gray-600">
            Nenhum cartão encontrado
          </div>
        )}
      </div>

      {/* Placeholder for statements history */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Histórico de Faturas</h3>
        <div className="text-center text-gray-600 py-8">
          Histórico de faturas será carregado aqui
        </div>
      </div>
    </div>
  )
}
