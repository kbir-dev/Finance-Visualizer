import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { EditTransactionModal } from './EditTransactionModal';
import { storageService } from '../services/storageService';

export function TransactionList({ transactions, isLoading }) {
  const queryClient = useQueryClient();
  const [editingTransaction, setEditingTransaction] = useState(null);
  
  const deleteMutation = useMutation({
    mutationFn: (id) => storageService.deleteTransaction(id),
    onSuccess: () => queryClient.invalidateQueries(['transactions'])
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (!transactions?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No transactions yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <div
            key={transaction._id}
            style={{ animationDelay: `${index * 0.1}s` }}
            className="flex items-center justify-between p-4 bg-dark-lighter rounded-xl border border-dark-card hover:border-accent-primary/30 transition-all duration-300 backdrop-blur-xl bg-opacity-90 animate-slideUp hover:translate-y-[-2px]"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-100 truncate">
                {transaction.description}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(transaction.date).toLocaleDateString()}
              </p>
            </div>
            <div className="ml-4 flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300
                  ${
                    transaction.type === 'income'
                      ? 'bg-accent-success/20 text-accent-success hover:bg-accent-success/30'
                      : 'bg-accent-danger/20 text-accent-danger hover:bg-accent-danger/30'
                  }`}
              >
                ${Math.abs(transaction.amount).toFixed(2)}
              </span>
              <button
                onClick={() => setEditingTransaction(transaction)}
                className="p-1 text-gray-400 hover:text-accent-primary transition-all duration-300 transform hover:scale-110"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => deleteMutation.mutate(transaction._id)}
                className="p-1 text-gray-400 hover:text-accent-danger transition-all duration-300 transform hover:scale-110"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      {editingTransaction && (
        <EditTransactionModal
          transaction={editingTransaction}
          isOpen={!!editingTransaction}
          onClose={() => setEditingTransaction(null)}
        />
      )}
    </>
  );
} 