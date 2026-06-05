interface MonthSelectorProps {
  currentMonth: number
  currentYear: number
  onMonthChange: (month: number) => void
  onYearChange: (year: number) => void
}

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

export default function MonthSelector({
  currentMonth,
  currentYear,
  onMonthChange,
  onYearChange,
}: MonthSelectorProps) {
  const handlePreviousMonth = () => {
    if (currentMonth === 1) {
      onMonthChange(12)
      onYearChange(currentYear - 1)
    } else {
      onMonthChange(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      onMonthChange(1)
      onYearChange(currentYear + 1)
    } else {
      onMonthChange(currentMonth + 1)
    }
  }

  return (
    <div className="flex items-center gap-2 mb-8">
      <button
        onClick={handlePreviousMonth}
        className="hover:bg-gray-100 transition text-gray-700 px-2 py-1 rounded text-sm font-medium"
      >
        ←
      </button>
      <select
        value={String(currentMonth).padStart(2, '0')}
        onChange={(e) => onMonthChange(parseInt(e.target.value))}
        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {monthNames.map((month, index) => (
          <option key={index} value={String(index + 1).padStart(2, '0')}>
            {month.substring(0, 3)}
          </option>
        ))}
      </select>
      <select
        value={currentYear}
        onChange={(e) => onYearChange(parseInt(e.target.value))}
        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {[2024, 2025, 2026, 2027].map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <button
        onClick={handleNextMonth}
        className="hover:bg-gray-100 transition text-gray-700 px-2 py-1 rounded text-sm font-medium"
      >
        →
      </button>
      <span className="text-xs text-gray-600 ml-auto">
        {monthNames[currentMonth - 1]} de {currentYear}
      </span>
    </div>
  )
}
