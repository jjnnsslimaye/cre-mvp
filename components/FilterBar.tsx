'use client';

import { useState, useEffect, useRef } from 'react';

export interface FilterState {
  borrower: string;
  lender: string;
  minAmount: number | null;
  maxAmount: number | null;
  urgency: string;
}

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  filters: FilterState;
}

const colors = {
  white: '#ffffff',
  lightBlueTint: '#dae6f1',
  primaryText: '#2b333f',
  placeholder: '#92a6c2',
  accent: '#f0c811',
  background: '#f5fafc',
  secondaryText: '#5e7391',
};

function UrgencyDropdown({ value, onChange }: {
  value: string,
  onChange: (val: string) => void
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const options = ['All urgencies', 'Critical', 'Near-term', 'Mid-term', 'Long-term'];
  const values = ['All', 'critical', 'near-term', 'mid-term', 'long-term'];
  const selectedLabel = options[values.indexOf(value)] ?? 'All urgencies';

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          padding: '0.5rem 1rem',
          backgroundColor: colors.white,
          border: `1px solid ${colors.lightBlueTint}`,
          borderRadius: '0.375rem',
          color: value === 'All' ? colors.placeholder : colors.primaryText,
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: '1.5',
          boxSizing: 'border-box',
        }}
      >
        <span>{selectedLabel}</span>
        <span style={{ color: colors.secondaryText, fontSize: '10px' }}>▼</span>
      </button>
      {open && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: colors.white,
          border: `1px solid ${colors.lightBlueTint}`,
          borderRadius: '8px',
          marginTop: '4px',
          zIndex: 50,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          overflow: 'hidden',
        }}>
          {options.map((label, i) => (
            <div
              key={label}
              onClick={() => { onChange(values[i]); setOpen(false); }}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                color: value === values[i] ? colors.primaryText : colors.secondaryText,
                backgroundColor: value === values[i] ? colors.lightBlueTint : colors.white,
                fontWeight: value === values[i] ? 600 : 400,
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = colors.background)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = value === values[i] ? colors.lightBlueTint : colors.white)}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FilterBar({ onFilterChange, filters }: FilterBarProps) {
  const handleChange = (key: keyof FilterState, value: string | number | null) => {
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
        border: `1px solid ${colors.lightBlueTint}`,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Borrower Filter */}
        <div>
          <input
            type="text"
            placeholder="Filter by borrower"
            value={filters.borrower}
            onChange={(e) => handleChange('borrower', e.target.value)}
            className="w-full px-4 py-2 rounded-md focus:outline-none transition-all"
            style={inputStyles}
            onFocus={(e) => {
              e.target.style.borderColor = colors.accent;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = colors.lightBlueTint;
            }}
          />
        </div>

        {/* Lender Filter */}
        <div>
          <input
            type="text"
            placeholder="Filter by lender"
            value={filters.lender}
            onChange={(e) => handleChange('lender', e.target.value)}
            className="w-full px-4 py-2 rounded-md focus:outline-none transition-all"
            style={inputStyles}
            onFocus={(e) => {
              e.target.style.borderColor = colors.accent;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = colors.lightBlueTint;
            }}
          />
        </div>

        {/* Loan Amount Range */}
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min $"
            value={filters.minAmount ?? ''}
            onChange={(e) => handleChange('minAmount', e.target.value ? parseFloat(e.target.value) : null)}
            className="w-full px-4 py-2 rounded-md focus:outline-none transition-all"
            style={inputStyles}
            onFocus={(e) => {
              e.target.style.borderColor = colors.accent;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = colors.lightBlueTint;
            }}
          />
          <input
            type="number"
            placeholder="Max $"
            value={filters.maxAmount ?? ''}
            onChange={(e) => handleChange('maxAmount', e.target.value ? parseFloat(e.target.value) : null)}
            className="w-full px-4 py-2 rounded-md focus:outline-none transition-all"
            style={inputStyles}
            onFocus={(e) => {
              e.target.style.borderColor = colors.accent;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = colors.lightBlueTint;
            }}
          />
        </div>

        {/* Urgency Filter */}
        <div>
          <UrgencyDropdown
            value={filters.urgency}
            onChange={(val) => handleChange('urgency', val)}
          />
        </div>
      </div>
    </div>
  );
}
