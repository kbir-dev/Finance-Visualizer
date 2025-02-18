const STORAGE_KEY = 'finance_transactions';

export const storageService = {
  getTransactions: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const transactions = stored ? JSON.parse(stored) : [];
      return transactions;
    } catch (error) {
      console.error('Error getting transactions:', error);
      return [];
    }
  },

  addTransaction: (transaction) => {
    try {
      const transactions = storageService.getTransactions();
      const newTransaction = {
        ...transaction,
        _id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        amount: Number(transaction.amount),
        date: new Date(transaction.date).toISOString()
      };
      transactions.push(newTransaction);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
      return newTransaction;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  },

  updateTransaction: (id, updatedTransaction) => {
    const transactions = storageService.getTransactions();
    const index = transactions.findIndex(t => t._id === id);
    if (index !== -1) {
      transactions[index] = { ...transactions[index], ...updatedTransaction };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
      return transactions[index];
    }
    throw new Error('Transaction not found');
  },

  deleteTransaction: (id) => {
    const transactions = storageService.getTransactions();
    const filtered = transactions.filter(t => t._id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
}; 