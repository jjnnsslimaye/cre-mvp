import type { Loan } from '@/lib/types'

export interface EnrichmentScore {
  total: number
  ucc: boolean
  sunbiz: boolean
  skipTrace: boolean
  geocoding: boolean
}

export function getEnrichmentScore(loan: Loan): EnrichmentScore {
  // UCC: at least one borrower has filings
  const ucc = !!(loan.ucc_filings && Object.keys(loan.ucc_filings).length > 0)

  // Sunbiz: at least one entity has a document_number (real hit)
  const sunbiz = !!(
    loan.sunbiz_data &&
    Object.values(loan.sunbiz_data).some(
      (entity) => entity != null && entity.document_number
    )
  )

  // Skip Trace: match_count > 0
  const skipTrace = !!(
    loan.skip_trace_data?.summary?.match_count &&
    loan.skip_trace_data.summary.match_count > 0
  )

  // Geocoding: property address matched OR any sunbiz address matched
  const propertyMatched =
    loan.geocoding_data?.property_address?.matched === true
  const sunbizMatched = !!(
    loan.geocoding_data?.sunbiz_addresses &&
    Object.values(loan.geocoding_data.sunbiz_addresses).some(
      (addr) => addr != null && addr.matched === true
    )
  )
  const geocoding = propertyMatched || sunbizMatched

  const total = [ucc, sunbiz, skipTrace, geocoding].filter(Boolean).length

  return { total, ucc, sunbiz, skipTrace, geocoding }
}
