import { useState } from 'react'
import SidebarNav from './components/tradi/SidebarNav'
import TopBar from './components/tradi/TopBar'
import ChartWorkspaceView from './components/tradi/views/ChartWorkspaceView'
import DashboardView from './components/tradi/views/DashboardView'
import MacroView from './components/tradi/views/MacroView'
import CalendarView from './components/tradi/views/CalendarView'
import HeatmapView from './components/tradi/views/HeatmapView'
import NewsView from './components/tradi/views/NewsView'
import FundamentalsView from './components/tradi/views/FundamentalsView'
import { symbolOptions } from './components/tradi/data'

const views = {
  dashboard: DashboardView,
  chart: ChartWorkspaceView,
  macro: MacroView,
  calendar: CalendarView,
  heatmap: HeatmapView,
  news: NewsView,
  fundamentals: FundamentalsView,
}

export default function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [activeContextTab, setActiveContextTab] = useState('flows')
  const [activeSymbolId, setActiveSymbolId] = useState(symbolOptions[0].id)

  const ActiveView = views[activeView] ?? DashboardView
  const activeSymbol = symbolOptions.find((item) => item.id === activeSymbolId) ?? symbolOptions[0]

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100">
      <div className="flex min-h-screen">
        <SidebarNav activeView={activeView} activeSymbol={activeSymbol} onChange={setActiveView} />

        <div className="flex min-h-screen flex-1 flex-col">
          <TopBar
            activeView={activeView}
            activeSymbol={activeSymbol}
            symbols={symbolOptions}
            onSymbolChange={setActiveSymbolId}
          />

          <main className="flex-1 px-4 py-4 xl:px-6">
            {activeView === 'chart' ? (
              <ActiveView
                activeSymbol={activeSymbol}
                activeTab={activeContextTab}
                onTabChange={setActiveContextTab}
              />
            ) : (
              <ActiveView />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
