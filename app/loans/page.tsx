import { getLoans } from '@/lib/loadData';
import LoansPageClient from '@/components/LoansPageClient';
import Navbar from '@/components/Navbar';

const colors = {
  background: '#f5fafc',
};

export default async function LoansPage() {
  const loans = await getLoans();

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
