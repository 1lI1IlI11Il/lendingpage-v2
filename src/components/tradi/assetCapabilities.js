export function getAssetCapabilities(asset) {
  const supportsCorporateFundamentals = asset.instrumentType === 'equity'

  return {
    supportsCorporateFundamentals,
    reservedSlots: {
      companyFundamentals: !supportsCorporateFundamentals,
      earningsCalendar: !supportsCorporateFundamentals,
      filingStream: !supportsCorporateFundamentals,
    },
  }
}
