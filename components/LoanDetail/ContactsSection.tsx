'use client';

import React, { useState } from 'react';
import type { SunbizEntity, SkipTraceResult } from '@/lib/types';

interface ContactsSectionProps {
  sunbizData: Record<string, SunbizEntity>;
  skipTraceData: SkipTraceResult;
}

const colors = {
  background: '#f5fafc',
  white: '#ffffff',
  lightBlueTint: '#dae6f1',
  primaryText: '#2b333f',
  secondaryText: '#5e7391',
  footerText: '#92a6c2',
};

function formatPhoneNumber(number: string) {
  const cleaned = number.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return number;
}

export default function ContactsSection({ sunbizData, skipTraceData }: ContactsSectionProps) {
  const [expandedEmails, setExpandedEmails] = useState<Set<number>>(new Set());
  const [expandedPhones, setExpandedPhones] = useState<Set<number>>(new Set());

  const toggleEmails = (idx: number) => {
    const newSet = new Set(expandedEmails);
    if (newSet.has(idx)) {
      newSet.delete(idx);
    } else {
      newSet.add(idx);
    }
    setExpandedEmails(newSet);
  };

  const togglePhones = (idx: number) => {
    const newSet = new Set(expandedPhones);
    if (newSet.has(idx)) {
      newSet.delete(idx);
    } else {
      newSet.add(idx);
    }
    setExpandedPhones(newSet);
  };

  const principals = Object.entries(sunbizData).filter(([key, entity]) => entity != null);
  const contacts = (skipTraceData?.persons ?? []).filter(person => person != null && person.matched === true);
  const rowCount = Math.max(principals.length, contacts.length);

  return (
    <section
      className="rounded-xl shadow-sm overflow-hidden"
      style={{
        backgroundColor: colors.white,
        border: `1px solid ${colors.lightBlueTint}`,
      }}
    >
      <h2
        className="text-lg font-bold px-6 py-2"
        style={{
          color: colors.white,
          backgroundColor: colors.primaryText,
          borderTopLeftRadius: '0.75rem',
          borderTopRightRadius: '0.75rem',
        }}
      >
        Contacts
      </h2>

      <div className="p-6">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Headers Row */}
          <div style={{ display: 'flex', gap: '24px' }}>
            <div
              className="rounded-xl p-4"
              style={{
                flex: 1,
                backgroundColor: colors.background,
                border: `1px solid ${colors.lightBlueTint}`,
              }}
            >
              <h3 className="text-base font-bold" style={{ color: colors.primaryText }}>
                Principals
              </h3>
              <div className="text-xs italic mt-1" style={{ color: colors.footerText }}>
                FL Division of Corporations · Public Record
              </div>
            </div>

            <div
              className="rounded-xl p-4"
              style={{
                flex: 1,
                backgroundColor: colors.background,
                border: `1px solid ${colors.lightBlueTint}`,
              }}
            >
              <h3 className="text-base font-bold" style={{ color: colors.primaryText }}>
                Contact Intelligence
              </h3>
              <div className="text-xs italic mt-1" style={{ color: colors.footerText }}>
                BatchSkipTracing · Algorithmically Matched
              </div>
            </div>
          </div>

          {/* Data Rows */}
          {Array.from({ length: rowCount }).map((_, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '24px', alignItems: 'stretch' }}>
              {/* Principal Card */}
              <div style={{ flex: 1 }}>
                {principals[idx] ? (
                  <div
                    className="rounded-xl p-6 space-y-3 shadow-sm"
                    style={{
                      backgroundColor: colors.white,
                      border: `1px solid ${colors.lightBlueTint}`,
                      height: '100%',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="font-semibold text-lg" style={{ color: colors.primaryText }}>
                        {principals[idx][1].corporate_name ?? 'Unknown Entity'}
                      </div>
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: (principals[idx][1].status ?? 'Unknown') === 'Active' ? '#22c55e' : colors.footerText,
                          color: '#ffffff',
                        }}
                      >
                        {principals[idx][1].status ?? 'Unknown'}
                      </span>
                    </div>

                    <div className="text-sm">
                      <div className="text-xs mb-1" style={{ color: colors.secondaryText }}>
                        Principal Address
                      </div>
                      <div style={{ color: colors.primaryText }}>
                        {principals[idx][1].principal_address?.full_address ?? 'Address unavailable'}
                      </div>
                    </div>

                    <div className="text-sm">
                      <div className="text-xs mb-2" style={{ color: colors.secondaryText }}>
                        Authorized Persons
                      </div>
                      <div className="space-y-1" style={{ color: colors.primaryText }}>
                        {(principals[idx][1].authorized_persons ?? []).map((person, i) => (
                          <div key={i}>
                            {person.name} — {person.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>

              {/* Contact Card */}
              <div style={{ flex: 1 }}>
                {contacts[idx] ? (
                  <div
                    className="rounded-xl p-6"
                    style={{
                      backgroundColor: colors.white,
                      border: `1px solid ${colors.lightBlueTint}`,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="font-semibold text-lg" style={{ color: colors.primaryText }}>
                        {contacts[idx].owner_name?.first ?? ''} {contacts[idx].owner_name?.last ?? ''}
                      </div>
                      {contacts[idx].dnc && (
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor: '#f0c811',
                            color: colors.primaryText,
                          }}
                        >
                          DNC
                        </span>
                      )}
                    </div>

                    {contacts[idx].emails.length > 0 && (
                      <div className="text-sm">
                        <button
                          onClick={() => toggleEmails(idx)}
                          className="flex items-center gap-2 text-xs mb-2 transition-colors"
                          style={{ color: colors.secondaryText }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = colors.primaryText)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = colors.secondaryText)}
                        >
                          <span>{expandedEmails.has(idx) ? '▼' : '▶'}</span>
                          <span>Emails</span>
                        </button>
                        <div
                          style={{
                            maxHeight: expandedEmails.has(idx) ? '300px' : '0',
                            overflow: expandedEmails.has(idx) ? 'auto' : 'hidden',
                            transition: 'max-height 0.3s ease',
                          }}
                        >
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                              <thead
                                style={{
                                  backgroundColor: colors.lightBlueTint,
                                  borderBottom: `1px solid ${colors.lightBlueTint}`,
                                }}
                              >
                                <tr>
                                  <th
                                    className="px-3 py-2 text-left"
                                    style={{ color: colors.primaryText }}
                                  >
                                    Email Address
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {contacts[idx].emails.map((email, i) => (
                                  <tr
                                    key={i}
                                    className="border-b"
                                    style={{
                                      backgroundColor: i % 2 === 0 ? colors.white : colors.background,
                                      borderColor: colors.lightBlueTint,
                                      color: colors.primaryText,
                                    }}
                                  >
                                    <td className="px-3 py-2">{email}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}

                    {contacts[idx].phone_numbers.length > 0 && (
                      <div className="text-sm">
                        <button
                          onClick={() => togglePhones(idx)}
                          className="flex items-center gap-2 text-xs mb-2 transition-colors"
                          style={{ color: colors.secondaryText }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = colors.primaryText)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = colors.secondaryText)}
                        >
                          <span>{expandedPhones.has(idx) ? '▼' : '▶'}</span>
                          <span>Phone Numbers</span>
                        </button>
                        <div
                          style={{
                            maxHeight: expandedPhones.has(idx) ? '300px' : '0',
                            overflow: expandedPhones.has(idx) ? 'auto' : 'hidden',
                            transition: 'max-height 0.3s ease',
                          }}
                        >
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                              <thead
                                style={{
                                  backgroundColor: colors.lightBlueTint,
                                  borderBottom: `1px solid ${colors.lightBlueTint}`,
                                }}
                              >
                                <tr>
                                  <th
                                    className="px-3 py-2 text-left"
                                    style={{ color: colors.primaryText }}
                                  >
                                    Number
                                  </th>
                                  <th
                                    className="px-3 py-2 text-left"
                                    style={{ color: colors.primaryText }}
                                  >
                                    Type
                                  </th>
                                  <th
                                    className="px-3 py-2 text-left"
                                    style={{ color: colors.primaryText }}
                                  >
                                    Carrier
                                  </th>
                                  <th
                                    className="px-3 py-2 text-left"
                                    style={{ color: colors.primaryText }}
                                  >
                                    Score
                                  </th>
                                  <th
                                    className="px-3 py-2 text-left"
                                    style={{ color: colors.primaryText }}
                                  >
                                    Reachable
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {contacts[idx].phone_numbers
                                  .sort((a, b) => b.score - a.score)
                                  .map((phone, i) => (
                                    <tr
                                      key={i}
                                      className="border-b"
                                      style={{
                                        backgroundColor: i % 2 === 0 ? colors.white : colors.background,
                                        borderColor: colors.lightBlueTint,
                                        color: phone.reachable ? colors.primaryText : colors.footerText,
                                      }}
                                    >
                                      <td className="px-3 py-2">{formatPhoneNumber(phone.number)}</td>
                                      <td className="px-3 py-2">{phone.type}</td>
                                      <td className="px-3 py-2">{phone.carrier}</td>
                                      <td className="px-3 py-2">{phone.score}</td>
                                      <td className="px-3 py-2">{phone.reachable ? 'Yes' : 'No'}</td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
