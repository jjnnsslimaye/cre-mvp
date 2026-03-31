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
    borrowers: [],
    lenders: [],
    amountBuckets: [],
    urgencies: [],
    startDate: '',
    endDate: '',
  });

  return (
    <div>
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        loans={loans}
      />
      <LoanTable loans={loans} filters={filters} />
    </div>
  );
}
