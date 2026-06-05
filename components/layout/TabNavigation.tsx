interface TabNavigationProps {
  activeTab: number
  onTabChange: (tab: number) => void
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { label: '📊 Lançamentos', id: 0 },
    { label: '💳 Cartões', id: 1 },
    { label: '📈 Visão Geral', id: 2 },
  ]

  return (
    <div className="flex gap-2 bg-white p-2 rounded-lg shadow-sm">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === tab.id
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
