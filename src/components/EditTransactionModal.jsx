import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { storageService } from '../services/storageService';

const schema = z.object({
  amount: z.number().positive(),
  description: z.string().min(3),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  type: z.enum(['income', 'expense'])
});

export function EditTransactionModal({ transaction, isOpen, onClose }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: transaction.amount,
      description: transaction.description,
      date: new Date(transaction.date).toISOString().split('T')[0],
      type: transaction.type
    }
  });

  const mutation = useMutation({
    mutationFn: (data) => storageService.updateTransaction(transaction._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions']);
      onClose();
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-dark-card rounded-2xl p-6 max-w-md w-full border border-dark-lighter animate-scaleIn">
        <h2 className="text-xl font-semibold mb-4">Edit Transaction</h2>
        <form onSubmit={handleSubmit(mutation.mutate)} className="space-y-4">
          {/* Same form fields as TransactionForm */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
          >
            Update Transaction
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
} 