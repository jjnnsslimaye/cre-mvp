'use client';

import { useState } from 'react';
import type { Loan } from '@/lib/types';
import FilterBar, { type FilterState } from './FilterBar';
import LoanTable from './LoanTable';

interface LoansPageClientProps {
  loans: Loan[];
}

export default function LoansPageClient({ loans }: LoansPageClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    borrower: '',
    lender: '',
    minAmount: null,
    maxAmount: null,
    urgency: 'All',
  });

  return (
    <div>
      <FilterBar filters={filters} onFilterChange={setFilters} />
      <LoanTable loans={loans} filters={filters} />
    </div>
  );
}
