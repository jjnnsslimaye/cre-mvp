// Loan urgency type
export type LoanUrgency = 'critical' | 'near-term' | 'mid-term' | 'long-term';

// UCC Filing interfaces
export interface UCCParty {
  raw: string;
}

export interface UCCFiling {
  Status: string;
  'Date Filed': string;
  Expires: string;
  'Filings Completed Through': string;
  'Summary For Filing': string;
  secured_parties: UCCParty[];
  debtor_parties: UCCParty[];
  document_number: string;
  _tiff_downloaded: boolean;
  _ocr_error?: string;
  _ocr_success: boolean;
  collateral?: string;
  urgency: LoanUrgency;
  match_score?: number;
  match_confidence?: 'high' | 'medium' | 'low';
  match_reasons?: string[];
  name_similarity?: number;
  date_proximity?: number;
  days_after_mortgage?: number;
  is_primary_match?: boolean;
}

export interface UCCFilingWithBorrower extends UCCFiling {
  borrowerName: string;
}

// Sunbiz interfaces
export interface AuthorizedPerson {
  name: string;
  title: string;
}

export interface SunbizPrincipalAddress {
  street: string;
  suite: string | null;
  city_state_zip: string;
  full_address: string;
}

export interface SunbizEntity {
  corporate_name: string;
  document_number: string;
  status: string;
  principal_address: SunbizPrincipalAddress;
  authorized_persons: AuthorizedPerson[];
}

// Skip trace interfaces
export interface OwnerName {
  first: string;
  last: string;
}

export interface PhoneNumber {
  number: string;
  type: string;
  carrier: string;
  reachable: boolean;
  score: number;
  tcpa: boolean;
}

export interface StandardizedAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  zip_plus4: string;
  formatted: string;
}

export interface SkipTracePerson {
  borrower_name: string;
  corporate_name: string;
  input_address: string;
  matched: boolean;
  error: boolean;
  owner_name: OwnerName;
  emails: string[];
  phone_numbers: PhoneNumber[];
  standardized_address: StandardizedAddress;
  litigator: boolean;
  bankruptcy: boolean;
  dnc: boolean;
  involuntary_lien: boolean;
}

export interface SkipTraceSummary {
  match_count: number;
  no_match_count: number;
  error_count: number;
  cost: number;
  request_id: string;
  api_version: string;
}

export interface SkipTraceResult {
  summary: SkipTraceSummary;
  persons: SkipTracePerson[];
}

// Geocoding interfaces
export interface GeocodingCoordinates {
  latitude: number;
  longitude: number;
}

export interface GeocodingAddressComponents {
  zip: string;
  streetName: string;
  preType: string;
  city: string;
  preDirection: string;
  suffixDirection: string;
  fromAddress: string;
  state: string;
  suffixType: string;
  toAddress: string;
  suffixQualifier: string;
  preQualifier: string;
}

export interface GeocodingStandardizedAddress {
  full: string;
  components: GeocodingAddressComponents;
}

export interface TigerLine {
  id: string;
  side: string;
}

export interface GeocodingResult {
  input_address: string;
  matched: boolean;
  match_quality: string;
  coordinates: GeocodingCoordinates;
  standardized_address: GeocodingStandardizedAddress;
  tiger_line: TigerLine;
  geography: Record<string, any>;
}

export interface GeocodingData {
  property_address: GeocodingResult;
  sunbiz_addresses: Record<string, GeocodingResult>;
}

// Main Loan interface
export interface Loan {
  doc_number: string;
  record_date: string;
  record_time: string;
  doc_type: string;
  loan_amount: number;
  borrowers: string;
  lenders: string;
  parcel_id: string | null;
  legal_description: string | null;
  doc_stamps: number;
  intangible_tax: number;
  page_count: number;
  ucc_filings: Record<string, UCCFiling[]>;
  sunbiz_data: Record<string, SunbizEntity>;
  skip_trace_data: SkipTraceResult;
  geocoding_data: GeocodingData;
  loan_urgency: LoanUrgency;
}
