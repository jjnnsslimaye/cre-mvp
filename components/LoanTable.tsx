'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Loan } from '@/lib/types';
import type { FilterState } from './FilterBar';
import { AMOUNT_BUCKETS } from '@/lib/constants';
import { getEnrichmentScore } from '@/lib/enrichment';
import EnrichmentBadge from '@/components/EnrichmentBadge';

interface LoanTableProps {
  loans: Loan[];
  filters: FilterState;
}

type SortField = 'record_date' | 'borrowers' | 'lenders' | 'loan_amount' | 'loan_urgency';
type SortDirection = 'asc' | 'desc';

const colors = {
  background: '#f5fafc',
  white: '#ffffff',
  lightBlueTint: '#dae6f1',
  primaryText: '#2b333f',
  secondaryText: '#5e7391',
  accent: '#f0c811',
  midBlue: '#7cacdb',
  footerText: '#92a6c2',
  pillBorder: '#b9c9e0',
};

const splitEntities = (str: string) => str.split(',').map(s => s.trim()).filter(Boolean);

function EntityList({ entities }: { entities: string[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (entities.length === 0) return null;
  if (entities.length === 1) return <span>{entities[0]}</span>;

  const remainingCount = entities.length - 1;

  return (
    <span style={{ display: 'inline' }}>
      {isExpanded ? (
        <div className="flex flex-col gap-1">
          {entities.map((entity, idx) => (
            <span key={idx}>{entity}</span>
          ))}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsExpanded(false); }}
            className="text-xs mt-1 text-left w-fit"
            style={{ color: colors.secondaryText }}
          >
            show less
          </button>
        </div>
      ) : (
        <span>
          {entities[0]}{' '}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsExpanded(true); }}
            className="text-xs px-2 py-0.5 rounded-full transition-colors whitespace-nowrap inline-flex items-center"
            style={{
              backgroundColor: colors.lightBlueTint,
              color: colors.secondaryText,
              border: `1px solid ${colors.pillBorder}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.pillBorder;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.lightBlueTint;
            }}
          >
            +{remainingCount} more
          </button>
        </span>
      )}
    </span>
  );
}

export default function LoanTable({ loans, filters }: LoanTableProps) {
  const [sortField, setSortField] = useState<SortField>('loan_amount');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Apply filters
  const filteredLoans = loans.filter((loan) => {
    // Borrower filter
    if (filters.borrowers.length > 0) {
      const loanBorrowers = loan.borrowers.split(',').map(b => b.trim());
      if (!loanBorrowers.some(b => filters.borrowers.includes(b))) {
        return false;
      }
    }

    // Lender filter
    if (filters.lenders.length > 0) {
      const loanLenders = loan.lenders.split(',').map(l => l.trim());
      if (!loanLenders.some(l => filters.lenders.includes(l))) {
        return false;
      }
    }

    // Amount bucket filter
    if (filters.amountBuckets.length > 0) {
      const amountMatch = filters.amountBuckets.some(label => {
        const bucket = AMOUNT_BUCKETS.find(b => b.label === label);
        return bucket
          ? loan.loan_amount >= bucket.min && loan.loan_amount <= bucket.max
          : false;
      });
      if (!amountMatch) {
        return false;
      }
    }

    // Urgency filter
    if (filters.urgencies.length > 0 && !filters.urgencies.includes(loan.loan_urgency)) {
      return false;
    }

    // Date range filter
    if (filters.startDate || filters.endDate) {
      const loanDate = new Date(loan.record_date);
      if (filters.startDate && loanDate < new Date(filters.startDate)) {
        return false;
      }
      if (filters.endDate && loanDate > new Date(filters.endDate)) {
        return false;
      }
    }

    return true;
  });

  // Apply sorting
  const sortedLoans = [...filteredLoans].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case 'record_date':
        comparison = new Date(a.record_date).getTime() - new Date(b.record_date).getTime();
        break;
      case 'borrowers':
        comparison = a.borrowers.localeCompare(b.borrowers);
        break;
      case 'lenders':
        comparison = a.lenders.localeCompare(b.lenders);
        break;
      case 'loan_amount':
        comparison = a.loan_amount - b.loan_amount;
        break;
      case 'loan_urgency':
        const urgencyOrder = { 'critical': 0, 'near-term': 1, 'mid-term': 2, 'long-term': 3 };
        comparison = (urgencyOrder[a.loan_urgency as keyof typeof urgencyOrder] ?? 4) -
                     (urgencyOrder[b.loan_urgency as keyof typeof urgencyOrder] ?? 4);
        break;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const getUrgencyBadgeStyle = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return { backgroundColor: '#ef4444', color: '#ffffff' };
      case 'near-term':
        return { backgroundColor: '#65CCE6', color: '#262832' };
      case 'mid-term':
        return { backgroundColor: colors.midBlue, color: '#ffffff' };
      case 'long-term':
        return { backgroundColor: colors.footerText, color: '#ffffff' };
      default:
        return { backgroundColor: '#94a3b8', color: '#ffffff' };
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th
      className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity"
      style={{ color: colors.white }}
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-2">
        {children}
        {sortField === field && (
          <span className="text-xs">
            {sortDirection === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </div>
    </th>
  );

  return (
    <div>
      {/* Count */}
      <div className="mb-4 text-sm" style={{ color: '#585862' }}>
        Showing {sortedLoans.length} of {loans.length} loans
      </div>

      {/* Table */}
      <div
        className="rounded-xl shadow-sm"
        style={{
          backgroundColor: colors.white,
          border: `1px solid ${colors.lightBlueTint}`,
        }}
      >
        <div className="overflow-x-auto">
          <table className="min-w-[900px] table-auto w-full">
            <thead
              style={{
                backgroundColor: colors.primaryText,
                borderBottom: `1px solid ${colors.primaryText}`,
              }}
            >
              <tr>
                <SortableHeader field="record_date">Origination Date</SortableHeader>
                <SortableHeader field="borrowers">Borrower(s)</SortableHeader>
                <SortableHeader field="lenders">Lender(s)</SortableHeader>
                <SortableHeader field="loan_amount">Loan Amount</SortableHeader>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap"
                  style={{ color: colors.white, width: '110px' }}
                >
                  Enrichment
                </th>
                <SortableHeader field="loan_urgency">Urgency</SortableHeader>
              </tr>
            </thead>
            <tbody>
              {sortedLoans.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-sm"
                    style={{ color: colors.secondaryText }}
                  >
                    No loans match the current filters
                  </td>
                </tr>
              ) : (
                sortedLoans.map((loan, index) => (
                  <tr
                    key={loan.doc_number}
                    className="transition-colors cursor-pointer"
                    style={{
                      backgroundColor: index % 2 === 0 ? colors.white : colors.background,
                      borderBottom: `1px solid ${colors.lightBlueTint}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.lightBlueTint;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = index % 2 === 0 ? colors.white : colors.background;
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        href={`/loans/${loan.doc_number}`}
                        className="block"
                        style={{ color: colors.secondaryText }}
                      >
                        {loan.record_date}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Link
                        href={`/loans/${loan.doc_number}`}
                        className="inline"
                        style={{ color: colors.primaryText }}
                      >
                        <EntityList entities={splitEntities(loan.borrowers)} />
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Link
                        href={`/loans/${loan.doc_number}`}
                        className="inline"
                        style={{ color: colors.primaryText }}
                      >
                        <EntityList entities={splitEntities(loan.lenders)} />
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        href={`/loans/${loan.doc_number}`}
                        className="block"
                        style={{ color: colors.secondaryText }}
                      >
                        {formatCurrency(loan.loan_amount)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <EnrichmentBadge score={getEnrichmentScore(loan)} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        href={`/loans/${loan.doc_number}`}
                        className="block"
                      >
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
                          style={getUrgencyBadgeStyle(loan.loan_urgency)}
                        >
                          {loan.loan_urgency}
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
