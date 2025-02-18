import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, ReferenceLine } from 'recharts';
import { useMemo } from 'react';

export function MonthlyExpensesChart({ transactions }) {
  const data = useMemo(() => {
    // Get last 12 months
    const months = Array.from({ length: 12 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return d.toLocaleString('default', { month: 'short', year: '2-digit' });
    }).reverse();

    // Initialize data with all months
    const monthlyData = months.reduce((acc, month) => {
      acc[month] = { month, income: 0, expense: 0, net: 0 };
      return acc;
    }, {});

    // Fill in transaction data
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const month = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      if (monthlyData[month]) {
        const amount = Number(transaction.amount);
        if (transaction.type === 'income') {
          monthlyData[month].income += amount;
          monthlyData[month].net += amount;
        } else {
          monthlyData[month].expense += amount;
          monthlyData[month].net -= amount;
        }
      }
    });

    return Object.values(monthlyData);
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-card/95 p-4 rounded-lg border border-accent-primary/20 shadow-lg backdrop-blur-sm">
          <p className="text-gray-300 font-medium mb-2 border-b border-gray-700 pb-2">{label}</p>
          <div className="space-y-2">
            <p className="text-emerald-400 text-sm flex justify-between">
              <span>Income</span>
              <span className="font-medium">${payload[0].value.toFixed(2)}</span>
            </p>
            <p className="text-rose-400 text-sm flex justify-between">
              <span>Expense</span>
              <span className="font-medium">${payload[1].value.toFixed(2)}</span>
            </p>
            <div className="border-t border-gray-700 pt-2 mt-2">
              <p className={`text-sm font-medium flex justify-between ${
                payload[2].value >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                <span>Net</span>
                <span>${payload[2].value.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#1E293B" 
              vertical={false}
            />
            <XAxis 
              dataKey="month" 
              stroke="#64748B"
              tick={{ fill: '#64748B' }}
              axisLine={{ stroke: '#1E293B' }}
            />
            <YAxis 
              stroke="#64748B"
              tick={{ fill: '#64748B' }}
              tickFormatter={(value) => `$${Math.abs(value)}`}
              axisLine={{ stroke: '#1E293B' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => <span className="text-gray-400">{value}</span>}
            />
            <ReferenceLine y={0} stroke="#1E293B" />
            <Bar 
              dataKey="income" 
              name="Income"
              fill="#059669"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              animationBegin={300}
            />
            <Bar 
              dataKey="expense" 
              name="Expense"
              fill="#DC2626"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              animationBegin={600}
            />
            <Bar 
              dataKey="net" 
              name="Net Balance"
              fill="#7C3AED"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              animationBegin={900}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-dark-card/50 p-6 rounded-xl border border-accent-primary/10 backdrop-blur-sm hover:border-accent-primary/20 transition-all duration-300">
          <p className="text-sm text-gray-400 mb-2">Total Income</p>
          <p className="text-2xl font-bold text-emerald-400">
            ${data.reduce((sum, month) => sum + month.income, 0).toFixed(2)}
          </p>
          <div className="mt-2 text-xs text-emerald-500/60">
            Last 12 months
          </div>
        </div>
        <div className="bg-dark-card/50 p-6 rounded-xl border border-accent-primary/10 backdrop-blur-sm hover:border-accent-primary/20 transition-all duration-300">
          <p className="text-sm text-gray-400 mb-2">Total Expenses</p>
          <p className="text-2xl font-bold text-rose-400">
            ${data.reduce((sum, month) => sum + month.expense, 0).toFixed(2)}
          </p>
          <div className="mt-2 text-xs text-rose-500/60">
            Last 12 months
          </div>
        </div>
        <div className="bg-dark-card/50 p-6 rounded-xl border border-accent-primary/10 backdrop-blur-sm hover:border-accent-primary/20 transition-all duration-300">
          <p className="text-sm text-gray-400 mb-2">Net Balance</p>
          <p className={`text-2xl font-bold ${
            data.reduce((sum, month) => sum + month.net, 0) >= 0 
              ? 'text-emerald-400' 
              : 'text-rose-400'
          }`}>
            ${data.reduce((sum, month) => sum + month.net, 0).toFixed(2)}
          </p>
          <div className="mt-2 text-xs text-gray-500">
            Last 12 months
          </div>
        </div>
      </div>
    </div>
  );
} 