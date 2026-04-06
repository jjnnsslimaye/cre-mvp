'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import type { Loan } from '@/lib/types';
import { AMOUNT_BUCKETS } from '@/lib/constants';

export interface FilterState {
  borrowers: string[];
  lenders: string[];
  amountBuckets: string[];
  urgencies: string[];
  startDate: string;
  endDate: string;
}

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  filters: FilterState;
  loans: Loan[];
}

const colors = {
  white: '#ffffff',
  border: '#e2e8f0',
  primaryText: '#2b333f',
  placeholder: '#92a6c2',
  accentCyan: '#65CCE6',
  navBg: '#123B56',
  secondaryText: '#5e7391',
};

function Tooltip({ content }: { content: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          backgroundColor: '#dae6f1',
          color: '#5e7391',
          fontSize: '11px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'default',
          flexShrink: 0,
          userSelect: 'none',
        }}
      >
        ?
      </div>
      {visible && (
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#2b333f',
          color: '#ffffff',
          borderRadius: '8px',
          padding: '12px 16px',
          width: '320px',
          zIndex: 200,
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          fontSize: '12px',
          lineHeight: '1.6',
          pointerEvents: 'none',
        }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', color: '#f0c811' }}>
            Urgency Definitions
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ whiteSpace: 'nowrap' }}><span style={{ color: '#ef4444', fontWeight: 600 }}>Critical</span> — Expires in under 6 months</div>
            <div style={{ whiteSpace: 'nowrap' }}><span style={{ color: '#f0c811', fontWeight: 600 }}>Near-term</span> — Expires in 6–18 months</div>
            <div style={{ whiteSpace: 'nowrap' }}><span style={{ color: '#7cacdb', fontWeight: 600 }}>Mid-term</span> — Expires in 18 months – 3 years</div>
            <div style={{ whiteSpace: 'nowrap' }}><span style={{ color: '#92a6c2', fontWeight: 600 }}>Long-term</span> — Expires in 3–5 years</div>
          </div>
          {/* Arrow pointing up */}
          <div style={{
            position: 'absolute',
            top: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '12px',
            height: '12px',
            backgroundColor: '#2b333f',
            clipPath: 'polygon(50% 0, 0 100%, 100% 100%)',
          }} />
        </div>
      )}
    </div>
  );
}

function DateInput({
  value,
  onChange,
  placeholder
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}) {
  return (
    <input
      type="date"
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '140px',
        flexShrink: 0,
        padding: '8px 16px',
        backgroundColor: '#ffffff',
        border: `1px solid ${value ? '#123B56' : '#e2e8f0'}`,
        borderRadius: '8px',
        color: value ? '#2b333f' : '#92a6c2',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        outline: 'none',
        cursor: 'pointer',
      }}
      onFocus={e => e.target.style.borderColor = '#65CCE6'}
      onBlur={e => e.target.style.borderColor = value ? '#123B56' : '#e2e8f0'}
    />
  );
}

function MultiSelectDropdown({
  options,
  selected,
  onChange,
  placeholder,
  getLabel
}: {
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
  placeholder: string;
  getLabel?: (val: string) => string;
}) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const formatLabel = getLabel || ((val: string) => val);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset search query when dropdown closes
  useEffect(() => {
    if (!open) {
      setSearchQuery('');
    }
  }, [open]);

  const toggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(s => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  // Filter options by search query
  const filteredOptions = options.filter(o =>
    o.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayValue = selected.length === 0
    ? placeholder
    : selected.map(formatLabel).join(', ');

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          padding: '8px 16px',
          backgroundColor: '#ffffff',
          border: `1px solid ${selected.length > 0 ? '#123B56' : '#e2e8f0'}`,
          borderRadius: '8px',
          color: selected.length > 0 ? '#2b333f' : '#92a6c2',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          overflow: 'hidden',
        }}
      >
        <span style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1,
          marginRight: '8px'
        }}>
          {displayValue}
        </span>
        <span style={{ color: '#5e7391', fontSize: '10px', flexShrink: 0 }}>▼</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          marginTop: '4px',
          zIndex: 100,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          maxHeight: '280px',
          overflowY: 'auto',
        }}>
          {/* Clear link at top */}
          {selected.length > 0 && (
            <div
              onClick={() => onChange([])}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                color: '#1c71af',
                fontSize: '12px',
                fontWeight: 600,
                borderBottom: '1px solid #e2e8f0',
                backgroundColor: '#f5fafc',
              }}
            >
              Clear selection ({selected.length})
            </div>
          )}

          {/* Search input */}
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onClick={e => e.stopPropagation()}
            autoFocus
            style={{
              width: '100%',
              padding: '8px 16px',
              border: 'none',
              borderBottom: '1px solid #e2e8f0',
              outline: 'none',
              fontFamily: 'inherit',
              fontSize: '13px',
              color: '#2b333f',
              backgroundColor: '#ffffff',
            }}
          />

          {/* Options list */}
          {filteredOptions.map(option => (
            <div
              key={option}
              onClick={() => toggle(option)}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: selected.includes(option) ? '#f0f8ff' : '#ffffff',
                color: '#2b333f',
                fontSize: '13px',
              }}
              onMouseEnter={e => {
                if (!selected.includes(option))
                  e.currentTarget.style.backgroundColor = '#f5fafc';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor =
                  selected.includes(option) ? '#f0f8ff' : '#ffffff';
              }}
            >
              {/* Checkmark */}
              <span style={{
                width: '16px',
                height: '16px',
                borderRadius: '4px',
                border: `2px solid ${selected.includes(option) ? '#123B56' : '#e2e8f0'}`,
                backgroundColor: selected.includes(option) ? '#123B56' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '10px',
                color: '#ffffff',
              }}>
                {selected.includes(option) ? '✓' : ''}
              </span>
              <span style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {formatLabel(option)}
              </span>
            </div>
          ))}

          {filteredOptions.length === 0 && (
            <div style={{
              padding: '12px 16px',
              color: '#92a6c2',
              fontSize: '13px'
            }}>
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function FilterBar({ onFilterChange, filters, loans }: FilterBarProps) {
  // Extract all borrowers and lenders from loans
  const allBorrowers = useMemo(() => {
    const set = new Set<string>();
    loans.forEach(loan =>
      loan.borrowers.split(',').map(b => b.trim()).filter(Boolean).forEach(b => set.add(b))
    );
    return Array.from(set).sort();
  }, [loans]);

  const allLenders = useMemo(() => {
    const set = new Set<string>();
    loans.forEach(loan =>
      loan.lenders.split(',').map(l => l.trim()).filter(Boolean).forEach(l => set.add(l))
    );
    return Array.from(set).sort();
  }, [loans]);

  // Dependent filtering: available lenders based on selected borrowers, urgencies, and amount buckets
  const availableLenders = useMemo(() => {
    if (filters.borrowers.length === 0 && filters.urgencies.length === 0 && filters.amountBuckets.length === 0 && !filters.startDate && !filters.endDate) return allLenders;
    const matchingLoans = loans.filter(loan => {
      const borrowerMatch = filters.borrowers.length === 0 ||
        loan.borrowers.split(',').map(b => b.trim())
          .some(b => filters.borrowers.includes(b));
      const urgencyMatch = filters.urgencies.length === 0 ||
        filters.urgencies.includes(loan.loan_urgency);
      const amountMatch = filters.amountBuckets.length === 0 ||
        filters.amountBuckets.some(label => {
          const bucket = AMOUNT_BUCKETS.find(b => b.label === label);
          return bucket
            ? loan.loan_amount >= bucket.min && loan.loan_amount <= bucket.max
            : false;
        });
      const dateMatch = (() => {
        if (!filters.startDate && !filters.endDate) return true;
        const loanDate = new Date(loan.record_date);
        if (filters.startDate && loanDate < new Date(filters.startDate)) return false;
        if (filters.endDate && loanDate > new Date(filters.endDate)) return false;
        return true;
      })();
      return borrowerMatch && urgencyMatch && amountMatch && dateMatch;
    });
    const set = new Set<string>();
    matchingLoans.forEach(loan =>
      loan.lenders.split(',').map(l => l.trim()).filter(Boolean).forEach(l => set.add(l))
    );
    return Array.from(set).sort();
  }, [loans, filters.borrowers, filters.urgencies, filters.amountBuckets, filters.startDate, filters.endDate, allLenders]);

  // Dependent filtering: available borrowers based on selected lenders, urgencies, and amount buckets
  const availableBorrowers = useMemo(() => {
    if (filters.lenders.length === 0 && filters.urgencies.length === 0 && filters.amountBuckets.length === 0 && !filters.startDate && !filters.endDate) return allBorrowers;
    const matchingLoans = loans.filter(loan => {
      const lenderMatch = filters.lenders.length === 0 ||
        loan.lenders.split(',').map(l => l.trim())
          .some(l => filters.lenders.includes(l));
      const urgencyMatch = filters.urgencies.length === 0 ||
        filters.urgencies.includes(loan.loan_urgency);
      const amountMatch = filters.amountBuckets.length === 0 ||
        filters.amountBuckets.some(label => {
          const bucket = AMOUNT_BUCKETS.find(b => b.label === label);
          return bucket
            ? loan.loan_amount >= bucket.min && loan.loan_amount <= bucket.max
            : false;
        });
      const dateMatch = (() => {
        if (!filters.startDate && !filters.endDate) return true;
        const loanDate = new Date(loan.record_date);
        if (filters.startDate && loanDate < new Date(filters.startDate)) return false;
        if (filters.endDate && loanDate > new Date(filters.endDate)) return false;
        return true;
      })();
      return lenderMatch && urgencyMatch && amountMatch && dateMatch;
    });
    const set = new Set<string>();
    matchingLoans.forEach(loan =>
      loan.borrowers.split(',').map(b => b.trim()).filter(Boolean).forEach(b => set.add(b))
    );
    return Array.from(set).sort();
  }, [loans, filters.lenders, filters.urgencies, filters.amountBuckets, filters.startDate, filters.endDate, allBorrowers]);

  // Dependent filtering: available urgencies based on selected borrowers, lenders, and amount buckets
  const availableUrgencies = useMemo(() => {
    const urgencyOptions = ['critical', 'near-term', 'mid-term', 'long-term'];

    // If no borrower, lender, or amount filters active, all urgencies available
    if (filters.borrowers.length === 0 && filters.lenders.length === 0 && filters.amountBuckets.length === 0 && !filters.startDate && !filters.endDate) {
      return urgencyOptions;
    }

    // Find loans matching active borrower, lender, and amount filters
    const matchingLoans = loans.filter(loan => {
      const borrowerMatch = filters.borrowers.length === 0 ||
        loan.borrowers.split(',').map(b => b.trim())
          .some(b => filters.borrowers.includes(b));
      const lenderMatch = filters.lenders.length === 0 ||
        loan.lenders.split(',').map(l => l.trim())
          .some(l => filters.lenders.includes(l));
      const amountMatch = filters.amountBuckets.length === 0 ||
        filters.amountBuckets.some(label => {
          const bucket = AMOUNT_BUCKETS.find(b => b.label === label);
          return bucket
            ? loan.loan_amount >= bucket.min && loan.loan_amount <= bucket.max
            : false;
        });
      const dateMatch = (() => {
        if (!filters.startDate && !filters.endDate) return true;
        const loanDate = new Date(loan.record_date);
        if (filters.startDate && loanDate < new Date(filters.startDate)) return false;
        if (filters.endDate && loanDate > new Date(filters.endDate)) return false;
        return true;
      })();
      return borrowerMatch && lenderMatch && amountMatch && dateMatch;
    });

    const set = new Set<string>();
    matchingLoans.forEach(loan => set.add(loan.loan_urgency));

    // Return in fixed order, only those present in matching loans
    return urgencyOptions.filter(u => set.has(u));
  }, [loans, filters.borrowers, filters.lenders, filters.amountBuckets, filters.startDate, filters.endDate]);

  // Dependent filtering: available amount buckets based on selected borrowers, lenders, and urgencies
  const availableAmountBuckets = useMemo(() => {
    const matchingLoans = loans.filter(loan => {
      const borrowerMatch = filters.borrowers.length === 0 ||
        loan.borrowers.split(',').map(b => b.trim())
          .some(b => filters.borrowers.includes(b));
      const lenderMatch = filters.lenders.length === 0 ||
        loan.lenders.split(',').map(l => l.trim())
          .some(l => filters.lenders.includes(l));
      const urgencyMatch = filters.urgencies.length === 0 ||
        filters.urgencies.includes(loan.loan_urgency);
      const dateMatch = (() => {
        if (!filters.startDate && !filters.endDate) return true;
        const loanDate = new Date(loan.record_date);
        if (filters.startDate && loanDate < new Date(filters.startDate)) return false;
        if (filters.endDate && loanDate > new Date(filters.endDate)) return false;
        return true;
      })();
      return borrowerMatch && lenderMatch && urgencyMatch && dateMatch;
    });

    return AMOUNT_BUCKETS
      .filter(bucket =>
        matchingLoans.some(loan =>
          loan.loan_amount >= bucket.min && loan.loan_amount <= bucket.max
        )
      )
      .map(bucket => bucket.label);
  }, [loans, filters.borrowers, filters.lenders, filters.urgencies, filters.startDate, filters.endDate]);

  const handleChange = (key: keyof FilterState, value: string[] | string | number | null) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const inputStyles = {
    backgroundColor: colors.white,
    border: `1px solid ${colors.lightBlueTint}`,
    color: colors.primaryText,
  };

  return (
    <div
      className="rounded-xl p-6 mb-6 shadow-sm"
      style={{
        backgroundColor: colors.white,
        border: `1px solid ${colors.border}`,
      }}
    >
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        {/* Origination Date Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            height: '20px'
          }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#123B56',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Origination Date
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <DateInput
              value={filters.startDate}
              onChange={(val) => handleChange('startDate', val)}
              placeholder="Start date"
            />
            <span style={{
              color: '#92a6c2',
              fontSize: '12px',
              fontWeight: 500,
              flexShrink: 0,
              paddingTop: '2px'
            }}>
              to
            </span>
            <DateInput
              value={filters.endDate}
              onChange={(val) => handleChange('endDate', val)}
              placeholder="End date"
            />
          </div>
        </div>

        {/* Borrower Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '160px', flex: 1, flexShrink: 0 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            height: '20px'
          }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#123B56',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Borrower
            </span>
          </div>
          <MultiSelectDropdown
            options={availableBorrowers}
            selected={filters.borrowers}
            onChange={(val) => handleChange('borrowers', val)}
            placeholder="Filter by borrower"
          />
        </div>

        {/* Lender Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '160px', flex: 1, flexShrink: 0 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            height: '20px'
          }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#123B56',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Lender
            </span>
          </div>
          <MultiSelectDropdown
            options={availableLenders}
            selected={filters.lenders}
            onChange={(val) => handleChange('lenders', val)}
            placeholder="Filter by lender"
          />
        </div>

        {/* Loan Amount Range */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '160px', flex: 1, flexShrink: 0 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            height: '20px'
          }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#123B56',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Loan Amount
            </span>
          </div>
          <MultiSelectDropdown
            options={availableAmountBuckets}
            selected={filters.amountBuckets}
            onChange={(val) => handleChange('amountBuckets', val)}
            placeholder="Filter by loan amount"
            getLabel={(val) => val}
          />
        </div>

        {/* Urgency Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '160px', flex: 1, flexShrink: 0 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            height: '20px'
          }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#123B56',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Urgency
            </span>
            <Tooltip content={null} />
          </div>
          <MultiSelectDropdown
            options={availableUrgencies}
            selected={filters.urgencies}
            onChange={(val) => handleChange('urgencies', val)}
            placeholder="Filter by urgency"
            getLabel={(val) => val.charAt(0).toUpperCase() + val.slice(1)}
          />
        </div>
      </div>
    </div>
  );
}
