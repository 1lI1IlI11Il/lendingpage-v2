export function getAssetSourceStrategy(asset) {
  switch (asset.id) {
    case 'kospi':
    case 'kosdaq':
      return {
        primaryLabel: 'Primary source',
        primaryValue: 'KRX delayed index data',
        backupLabel: 'Fallback',
        backupValue: 'Third-party delayed display feed',
        implementationLabel: 'Implementation',
        implementationValue: 'official index semantics + delayed public quote',
      }
    case 'nasdaq':
      return {
        primaryLabel: 'Primary source',
        primaryValue: 'Nasdaq official index semantics',
        backupLabel: 'Fallback',
        backupValue: 'licensed delayed or public benchmark proxy',
        implementationLabel: 'Implementation',
        implementationValue: 'index benchmark with explicit feed caveat',
      }
    case 'spot-gold':
      return {
        primaryLabel: 'Primary source',
        primaryValue: 'spot-style XAUUSD feed',
        backupLabel: 'Fallback',
        backupValue: 'GC front-month futures proxy',
        implementationLabel: 'Implementation',
        implementationValue: 'spot semantics + futures-capable backend',
      }
    case 'wti':
      return {
        primaryLabel: 'Primary source',
        primaryValue: 'front-month CL futures quote',
        backupLabel: 'Fallback',
        backupValue: 'EIA spot benchmark for slower reference',
        implementationLabel: 'Implementation',
        implementationValue: 'front-month futures with roll-aware context',
      }
    case 'dxy':
      return {
        primaryLabel: 'Primary source',
        primaryValue: 'licensed ICE/DX-style dollar index quote',
        backupLabel: 'Fallback',
        backupValue: 'explicit proxy path if benchmark feed is unavailable',
        implementationLabel: 'Implementation',
        implementationValue: 'official semantics + proprietary-data caveat',
      }
    default:
      return {
        primaryLabel: 'Primary source',
        primaryValue: 'registry-backed local placeholder',
        backupLabel: 'Fallback',
        backupValue: 'none',
        implementationLabel: 'Implementation',
        implementationValue: 'local-only scaffold',
      }
  }
}
