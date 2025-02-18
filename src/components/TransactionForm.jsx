import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CATEGORIES } from '../constants/categories';
import { storageService } from '../services/storageService';

const schema = z.object({
  amount: z.number().positive(),
  description: z.string().min(3),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1)
});

export function TransactionForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      category: 'other_expense',
      amount: '',
      description: ''
    }
  });

  const mutation = useMutation({
    mutationFn: (newTransaction) => {
      const formattedTransaction = {
        ...newTransaction,
        amount: Number(newTransaction.amount)
      };
      return storageService.addTransaction(formattedTransaction);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions']);
      reset();
    },
    onError: (error) => {
      console.error('Error adding transaction:', error);
    }
  });

  const transactionType = watch('type');
  const categories = transactionType === 'income' ? CATEGORIES.INCOME : CATEGORIES.EXPENSE;

  return (
    <form onSubmit={handleSubmit(mutation.mutate)} className="space-y-4">
      <div>
        <input
          {...register('description')}
          placeholder="Description"
          className="w-full px-4 py-3 bg-dark-lighter border border-dark-card rounded-xl focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 outline-none transition-all duration-300 text-gray-100 placeholder-gray-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-accent-danger">{errors.description.message}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          step="0.01"
          {...register('amount', { valueAsNumber: true })}
          placeholder="Amount"
          className="w-full px-4 py-3 bg-dark-lighter border border-dark-card rounded-xl focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 outline-none transition-all duration-300 text-gray-100 placeholder-gray-500"
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-accent-danger">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <input
          type="date"
          {...register('date')}
          className="w-full px-4 py-3 bg-dark-lighter border border-dark-card rounded-xl focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 outline-none transition-all duration-300 text-gray-100 placeholder-gray-500"
        />
        {errors.date && (
          <p className="mt-1 text-sm text-accent-danger">{errors.date.message}</p>
        )}
      </div>

      <div>
        <select
          {...register('type')}
          className="w-full px-4 py-3 bg-dark-lighter border border-dark-card rounded-xl focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 outline-none transition-all duration-300 text-gray-100 placeholder-gray-500"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div>
        <select
          {...register('category')}
          className="w-full px-4 py-3 bg-dark-lighter border border-dark-card rounded-xl focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 outline-none transition-all duration-300 text-gray-100 placeholder-gray-500"
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.icon} {category.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-accent-danger">{errors.category.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={mutation.isLoading}
        className="w-full py-3 px-4 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary hover:opacity-90 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-glow hover:shadow-accent-primary/20 relative overflow-hidden group"
      >
        <span className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer ${mutation.isLoading ? 'opacity-100' : 'opacity-0'}`}></span>
        <span className="relative">
          {mutation.isLoading ? 'Adding...' : 'Add Transaction'}
        </span>
      </button>
    </form>
  );
} 