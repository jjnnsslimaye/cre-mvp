'use client';

import { useState } from 'react';
import type { Loan } from '@/lib/types';
import FilterBar, { type FilterState } from './FilterBar';
import LoanTable from './LoanTable';
import UpgradeBanner from './UpgradeBanner';
import EmailCaptureModal from './EmailCaptureModal';
import TermsModal from './TermsModal';

interface LoansPageClientProps {
  loans: Loan[];
  isAuthenticated: boolean;
}

export default function LoansPageClient({ loans, isAuthenticated }: LoansPageClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    borrowers: [],
    lenders: [],
    amountBuckets: [],
    urgencies: [],
    startDate: '',
    endDate: '',
  });
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <TermsModal />
      {!isAuthenticated && <UpgradeBanner onUpgradeClick={() => setModalOpen(true)} />}
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        loans={loans}
      />
      <LoanTable loans={loans} filters={filters} />
      <EmailCaptureModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
