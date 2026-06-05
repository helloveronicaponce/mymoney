'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import TabNavigation from '@/components/layout/TabNavigation'
import MonthSelector from '@/components/common/MonthSelector'
import LaunchesTab from '@/components/tabs/LaunchesTab'
import CardsTab from '@/components/tabs/CardsTab'
import OverviewTab from '@/components/tabs/OverviewTab'

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)
  const [currentMonth, setCurrentMonth] = useState(6)
  const [currentYear, setCurrentYear] = useState(2026)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verify Supabase connection
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Month Selector */}
        <MonthSelector
          currentMonth={currentMonth}
          currentYear={currentYear}
          onMonthChange={setCurrentMonth}
          onYearChange={setCurrentYear}
        />

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 0 && <LaunchesTab month={currentMonth} year={currentYear} />}
          {activeTab === 1 && <CardsTab month={currentMonth} year={currentYear} />}
          {activeTab === 2 && <OverviewTab month={currentMonth} year={currentYear} />}
        </div>
      </div>
    </main>
  )
}
