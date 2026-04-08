import { useEffect, useRef } from 'react'
import { CandlestickSeries, ColorType, createChart } from 'lightweight-charts'

export default function LocalCandlesChart({ data, height = 420 }) {
  const containerRef = useRef(null)
  const chartRef = useRef(null)
  const seriesRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) {
      return undefined
    }

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height,
      layout: {
        background: { type: ColorType.Solid, color: '#09090b' },
        textColor: '#71717a',
      },
      grid: {
        vertLines: { color: 'rgba(39, 39, 42, 0.65)' },
        horzLines: { color: 'rgba(39, 39, 42, 0.65)' },
      },
      rightPriceScale: {
        borderColor: 'rgba(39, 39, 42, 0.9)',
      },
      timeScale: {
        borderColor: 'rgba(39, 39, 42, 0.9)',
        timeVisible: true,
      },
      crosshair: {
        vertLine: { color: 'rgba(34, 211, 238, 0.25)' },
        horzLine: { color: 'rgba(34, 211, 238, 0.25)' },
      },
    })

    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#34d399',
      downColor: '#fb7185',
      wickUpColor: '#34d399',
      wickDownColor: '#fb7185',
      borderVisible: false,
    })

    chartRef.current = chart
    seriesRef.current = series

    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current || !chartRef.current) {
        return
      }

      chartRef.current.applyOptions({ width: containerRef.current.clientWidth })
    })

    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
      chart.remove()
      chartRef.current = null
      seriesRef.current = null
    }
  }, [height])

  useEffect(() => {
    if (!seriesRef.current) {
      return
    }

    seriesRef.current.setData(data)
    chartRef.current?.timeScale().fitContent()
  }, [data])

  return <div ref={containerRef} className="h-full w-full" />
}
