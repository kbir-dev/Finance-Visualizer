import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MonthlyExpensesChart } from './components/MonthlyExpensesChart';
import { TransactionList } from './components/TransactionList';
import { TransactionForm } from './components/TransactionForm';
import { DashboardStats } from './components/DashboardStats';
import { CategoryPieChart } from './components/CategoryPieChart';
import { storageService } from './services/storageService';

export default function App() {
  const { data: transactions = [] } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => storageService.getTransactions(),
  });

  return (
    <div className="min-h-screen bg-dark text-gray-100">
      {/* Gradient Header */}
      <div className="bg-gradient-to-br from-dark-lighter via-dark to-dark pb-32 pt-12">
        <nav className="container mx-auto px-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-clip-text text-transparent animate-gradient relative group">
            Finance Tracker
            <span className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 via-accent-secondary/20 to-accent-primary/20 blur-xl animate-pulseLight -z-10"></span>
          </h1>
        </nav>
        
        {/* Stats Cards */}
        <div className="container mx-auto px-4 mt-8">
          <DashboardStats transactions={transactions} />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 -mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-dark-card rounded-2xl shadow-xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold text-gray-100 mb-6">Monthly Overview</h2>
              <MonthlyExpensesChart transactions={transactions} />
            </div>
            
            <div className="bg-dark-card rounded-2xl shadow-xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold text-gray-100 mb-6">Expense Categories</h2>
              <CategoryPieChart transactions={transactions} />
            </div>
          </div>
          
          {/* Form & List Column */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-dark-card rounded-2xl shadow-xl p-6 sticky top-8 border border-gray-800">
              <h2 className="text-xl font-semibold text-gray-100 mb-6">Add Transaction</h2>
              <TransactionForm />
            </div>
            
            <div className="bg-dark-card rounded-2xl shadow-xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold text-gray-100 mb-6">Recent Transactions</h2>
              <TransactionList transactions={transactions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 