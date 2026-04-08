import { computeSqueezeMomentum } from './squeezeMomentum.js'
import { computeSuperTrend } from './superTrend.js'

export function getPortedIndicatorSnapshot(bars) {
  return {
    superTrend: computeSuperTrend(bars),
    squeezeMomentum: computeSqueezeMomentum(bars),
  }
}
