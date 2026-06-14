"use client";
import React, { useState, useEffect } from 'react';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [budgetCategories, setBudgetCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    setTransactions(storedTransactions);

    const storedBudgetCategories = JSON.parse(localStorage.getItem('budgetCategories') || '[]');
    setBudgetCategories(storedBudgetCategories);

    const today = new Date();
    setDate(today.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!description || !amount || parseFloat(amount) <= 0 || !date || !category) {
      alert('Please fill in all transaction details correctly.');
      return;
    }

    const newTransaction = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date,
    };

    setTransactions([...transactions, newTransaction]);
    setDescription('');
    setAmount('');
    setCategory(budgetCategories.length > 0 ? budgetCategories[0].name : ''); // Reset to first category or empty
    setDate(new Date().toISOString().split('T')[0]); // Reset date to today
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="container transactions-container">
      <h1 className="section-title">Transactions</h1>

      <div className="glass-card">
        <h2 className="sub-title">Add New Transaction</h2>
        <form onSubmit={handleAddTransaction}>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Groceries, Salary, Rent, etc."
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0.01"
              step="0.01"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select id="type" value={type} onChange={(e) => setType(e.target.value)} required>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
              {budgetCategories.length > 0 ? (
                budgetCategories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))
              ) : (
                <option value="">No categories, add in Budget Categories</option>
              )}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="primary-button">Add Transaction</button>
        </form>
      </div>

      <div className="glass-card">
        <h2 className="sub-title">All Transactions</h2>
        {transactions.length === 0 ? (
          <p style={{textAlign: 'center', color: 'var(--text-secondary)'}}>No transactions recorded yet.</p>
        ) : (
          <ul className="transaction-list">
            {sortedTransactions.map(t => (
              <li key={t.id} className="transaction-item">
                <div className="transaction-details">
                  <div className="transaction-description">{t.description} ({t.category})</div>
                  <div className="transaction-meta">{t.date}</div>
                </div>
                <span className={`transaction-amount ${t.type === 'income' ? 'amount-income' : 'amount-expense'}`}>
                  {t.type === 'income' ? '+' : '-'}${parseFloat(t.amount).toFixed(2)}
                </span>
                <button onClick={() => handleDeleteTransaction(t.id)} className="delete-button" title="Delete transaction">
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
