"use client";
import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <div className="navbar-brand">
            <Link href="/">BudgetFlow</Link>
          </div>
          <div className="navbar-links">
            <Link href="/dashboard" className="nav-link">Dashboard</Link>
            <Link href="/transactions" className="nav-link">Transactions</Link>
            <Link href="/budget-categories" className="nav-link">Budget Categories</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
