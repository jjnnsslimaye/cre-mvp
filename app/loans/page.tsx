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
  const tierPct = tierCookie ? parseInt(tierCookie.value) : undefined;
  const isAuthenticated = !!tierCookie;
  const loans = await getLoans(tierPct);
  console.log('loans loaded:', loans.length, 'authenticated:', isAuthenticated);

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <Navbar isAuthenticated={isAuthenticated} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <LoansPageClient loans={loans} isAuthenticated={isAuthenticated} />
      </main>
    </div>
  );
}
