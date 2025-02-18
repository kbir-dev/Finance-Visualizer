import { useMemo } from 'react';

export function DashboardStats({ transactions }) {
  const stats = useMemo(() => {
    const today = new Date();
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();

    return transactions.reduce((acc, transaction) => {
      const transactionDate = new Date(transaction.date);
      const isThisMonth = transactionDate.getMonth() === thisMonth && 
                         transactionDate.getFullYear() === thisYear;

      // Debug log to check transaction processing
      console.log('Processing transaction:', {
        date: transaction.date,
        amount: transaction.amount,
        type: transaction.type,
        isThisMonth
      });

      if (isThisMonth) {
        if (transaction.type === 'income') {
          acc.monthlyIncome += Number(transaction.amount);
        } else if (transaction.type === 'expense') {
          acc.monthlyExpenses += Number(transaction.amount);
        }
      }

      if (transaction.type === 'expense') {
        acc.categoryTotals[transaction.category] = (acc.categoryTotals[transaction.category] || 0) + Number(transaction.amount);
      }

      return acc;
    }, {
      monthlyIncome: 0,
      monthlyExpenses: 0,
      categoryTotals: {}
    });
  }, [transactions]);

  // Debug log to check final calculations
  console.log('Final stats:', stats);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
      <div className="bg-dark-card rounded-2xl p-6 border border-dark-lighter hover:border-accent-primary/30 transition-all duration-300 backdrop-blur-xl bg-opacity-80 animate-slideUp hover:translate-y-[-2px]">
        <h3 className="text-sm font-medium text-gray-400">Monthly Income</h3>
        <p className="mt-3 text-3xl font-bold text-accent-success bg-glow-success animate-scaleIn">
          ${stats.monthlyIncome.toFixed(2)}
        </p>
      </div>
      
      <div className="bg-dark-card rounded-2xl p-6 border border-dark-lighter hover:border-accent-primary/30 transition-all duration-300 backdrop-blur-xl bg-opacity-80 animate-slideUp hover:translate-y-[-2px]">
        <h3 className="text-sm font-medium text-gray-400">Monthly Expenses</h3>
        <p className="mt-3 text-3xl font-bold text-accent-danger bg-glow-danger animate-scaleIn">
          ${stats.monthlyExpenses.toFixed(2)}
        </p>
      </div>
      
      <div className="bg-dark-card rounded-2xl p-6 border border-dark-lighter hover:border-accent-primary/30 transition-all duration-300 backdrop-blur-xl bg-opacity-80 animate-slideUp hover:translate-y-[-2px]">
        <h3 className="text-sm font-medium text-gray-400">Balance</h3>
        <p className={`mt-3 text-3xl font-bold ${
          stats.monthlyIncome - stats.monthlyExpenses >= 0 
            ? 'text-accent-success bg-glow-success' 
            : 'text-accent-danger bg-glow-danger'
        } animate-scaleIn`}>
          ${(stats.monthlyIncome - stats.monthlyExpenses).toFixed(2)}
        </p>
      </div>
    </div>
  );
} 