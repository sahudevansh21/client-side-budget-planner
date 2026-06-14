"use client";
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [budgetCategories, setBudgetCategories] = useState([]);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    setTransactions(storedTransactions);

    const storedBudgetCategories = JSON.parse(localStorage.getItem('budgetCategories') || '[]');
    setBudgetCategories(storedBudgetCategories);
  }, []);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
      return acc;
    }, {});

  const chartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(expensesByCategory),
        backgroundColor: [
          'rgba(106, 17, 203, 0.8)', // Purple
          'rgba(37, 117, 252, 0.8)', // Blue
          'rgba(0, 224, 255, 0.8)',  // Cyan
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(255, 205, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(153, 102, 255, 0.8)'
        ],
        borderColor: [
          'rgba(106, 17, 203, 1)',
          'rgba(37, 117, 252, 1)',
          'rgba(0, 224, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Spending by Category',
        color: 'var(--text-primary)',
        font: { size: 18 }
      },
      tooltip: {
        backgroundColor: 'rgba(25, 25, 40, 0.8)',
        titleColor: 'var(--text-primary)',
        bodyColor: 'var(--text-secondary)',
        borderColor: 'var(--border-color)',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        ticks: { color: 'var(--text-secondary)' },
        grid: { color: 'rgba(60, 60, 80, 0.2)' },
      },
      y: {
        ticks: { color: 'var(--text-secondary)' },
        grid: { color: 'rgba(60, 60, 80, 0.2)' },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container">
      <h1 className="section-title">Dashboard</h1>

      <div className="dashboard-grid">
        <div className="glass-card info-card">
          <h3>Total Income</h3>
          <p className="amount-income">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="glass-card info-card">
          <h3>Total Expenses</h3>
          <p className="amount-expense">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="glass-card info-card">
          <h3>Current Balance</h3>
          <p style={{ color: balance >= 0 ? '#3fcc5c' : '#ff6b6b' }}>${balance.toFixed(2)}</p>
        </div>
      </div>

      <div className="glass-card" style={{ marginTop: '2rem' }}>
        <h2 className="sub-title">Spending Breakdown</h2>
        <div className="chart-container">
          {Object.keys(expensesByCategory).length > 0 ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <p style={{textAlign: 'center', color: 'var(--text-secondary)'}}>No expenses recorded yet to show breakdown.</p>
          )}
        </div>
      </div>

      <div className="glass-card" style={{ marginTop: '2rem' }}>
        <h2 className="sub-title">Budget Status (Upcoming Feature)</h2>
        <p style={{textAlign: 'center', color: 'var(--text-secondary)'}}>This section would compare your expenses against your set budgets per category.</p>
        {budgetCategories.length > 0 ? (
          <ul className="transaction-list">
            {budgetCategories.map(cat => (
              <li key={cat.id} className="transaction-item">
                <div className="transaction-details">
                  <span className="category-name">{cat.name}</span>
                </div>
                <span className="transaction-amount" style={{color: 'var(--gradient-end)'}}>${parseFloat(cat.budgetLimit).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{textAlign: 'center', color: 'var(--text-secondary)', marginTop: '1rem'}}>No budget categories set. Go to &quot;Budget Categories&quot; to add some!</p>
        )}
      </div>
    </div>
  );
}
