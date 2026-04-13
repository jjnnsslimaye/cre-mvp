import { cookies } from 'next/headers';
import { getLoans } from '@/lib/loadData';
import LoansPageClient from '@/components/LoansPageClient';
import Navbar from '@/components/Navbar';

const colors = {
  background: '#FFFFFF',
};

export default async function LoansPage() {
  const cookieStore = await cookies();
  const tierCookie = cookieStore.get('maturefi_tier');
  console.log('maturefi_tier cookie:', tierCookie);
  const tierPct = parseInt(tierCookie?.value ?? '100');
  console.log('tierPct parsed as:', tierPct);
  const loans = await getLoans(tierPct);
  console.log('loans loaded:', loans.length);

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <LoansPageClient loans={loans} />
      </main>
    </div>
  );
}
