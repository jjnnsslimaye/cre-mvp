export const AMOUNT_BUCKETS = [
  { label: 'Under $1M',    min: 0,          max: 999999 },
  { label: '$1M – $5M',    min: 1000000,     max: 4999999 },
  { label: '$5M – $10M',   min: 5000000,     max: 9999999 },
  { label: '$10M – $25M',  min: 10000000,    max: 24999999 },
  { label: '$25M+',        min: 25000000,    max: Infinity },
];
