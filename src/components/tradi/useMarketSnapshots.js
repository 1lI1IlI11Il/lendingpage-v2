import { useEffect, useState } from 'react'
import { getMarketSnapshots } from './marketSnapshotService'

export function useMarketSnapshots() {
  const [snapshots, setSnapshots] = useState([])

  useEffect(() => {
    let active = true

    getMarketSnapshots().then((items) => {
      if (active) {
        setSnapshots(items)
      }
    })

    return () => {
      active = false
    }
  }, [])

  return snapshots
}
