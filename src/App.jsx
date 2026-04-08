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
import { assetOptions } from './components/tradi/data'
import { useMarketSnapshots } from './components/tradi/useMarketSnapshots'

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
  const [activeAssetId, setActiveAssetId] = useState(assetOptions[0].id)
  const liveSnapshots = useMarketSnapshots()

  const ActiveView = views[activeView] ?? DashboardView
  const activeAsset = assetOptions.find((item) => item.id === activeAssetId) ?? assetOptions[0]
  const [activeTimeframe, setActiveTimeframe] = useState(activeAsset.defaultTimeframe)

  const handleAssetChange = (assetId) => {
    const nextAsset = assetOptions.find((item) => item.id === assetId) ?? assetOptions[0]

    setActiveAssetId(assetId)
    setActiveTimeframe(nextAsset.defaultTimeframe)
  }

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100">
      <div className="flex min-h-screen">
        <SidebarNav activeView={activeView} activeAsset={activeAsset} liveSnapshots={liveSnapshots} onChange={setActiveView} />

        <div className="flex min-h-screen flex-1 flex-col">
          <TopBar
            activeView={activeView}
            activeAsset={activeAsset}
            assets={assetOptions}
            liveSnapshots={liveSnapshots}
            onAssetChange={handleAssetChange}
          />

          <main className="flex-1 px-4 py-4 xl:px-6">
            {activeView === 'chart' ? (
              <ActiveView
                activeAsset={activeAsset}
                activeTimeframe={activeTimeframe}
                activeTab={activeContextTab}
                onTimeframeChange={setActiveTimeframe}
                onTabChange={setActiveContextTab}
              />
            ) : (
              <ActiveView activeAsset={activeAsset} />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
