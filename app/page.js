"use client";
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container home-page-content">
      <section className="hero-section glass-card">
        <h1 className="hero-title">Your Private Budget Planner</h1>
        <p className="hero-description">
          Effortlessly track income, manage expenses, and visualize your financial health 
          — all client-side, with complete privacy.
        </p>
        <Link href="/dashboard" className="primary-button">
          Get Started with Your Budget
        </Link>
      </section>
    </main>
  );
}
