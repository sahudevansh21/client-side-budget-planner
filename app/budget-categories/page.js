"use client";
import React, { useState, useEffect } from 'react';

export default function BudgetCategoriesPage() {
  const [budgetCategories, setBudgetCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [budgetLimit, setBudgetLimit] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  useEffect(() => {
    const storedBudgetCategories = JSON.parse(localStorage.getItem('budgetCategories') || '[]');
    setBudgetCategories(storedBudgetCategories);
  }, []);

  useEffect(() => {
    localStorage.setItem('budgetCategories', JSON.stringify(budgetCategories));
  }, [budgetCategories]);

  const handleAddOrUpdateCategory = (e) => {
    e.preventDefault();
    if (!categoryName || parseFloat(budgetLimit) < 0) {
      alert('Please provide a category name and a non-negative budget limit.');
      return;
    }

    if (editingCategoryId) {
      setBudgetCategories(budgetCategories.map(cat =>
        cat.id === editingCategoryId ? { ...cat, name: categoryName, budgetLimit: parseFloat(budgetLimit) } : cat
      ));
      setEditingCategoryId(null);
    } else {
      const newCategory = {
        id: Date.now(),
        name: categoryName,
        budgetLimit: parseFloat(budgetLimit),
      };
      setBudgetCategories([...budgetCategories, newCategory]);
    }
    setCategoryName('');
    setBudgetLimit('');
  };

  const handleEditCategory = (category) => {
    setCategoryName(category.name);
    setBudgetLimit(category.budgetLimit.toString());
    setEditingCategoryId(category.id);
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category? All transactions linked to it will remain.')) {
      setBudgetCategories(budgetCategories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="container transactions-container">
      <h1 className="section-title">Budget Categories</h1>

      <div className="glass-card">
        <h2 className="sub-title">{editingCategoryId ? 'Edit Category' : 'Add New Category'}</h2>
        <form onSubmit={handleAddOrUpdateCategory}>
          <div className="form-group">
            <label htmlFor="categoryName">Category Name</label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g., Groceries, Utilities, Entertainment"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="budgetLimit">Monthly Budget Limit ($)</label>
            <input
              type="number"
              id="budgetLimit"
              value={budgetLimit}
              onChange={(e) => setBudgetLimit(e.target.value)}
              min="0"
              step="0.01"
              required
            />
          </div>
          <button type="submit" className="primary-button">
            {editingCategoryId ? 'Update Category' : 'Add Category'}
          </button>
          {editingCategoryId && (
            <button
              type="button"
              onClick={() => { setEditingCategoryId(null); setCategoryName(''); setBudgetLimit(''); }}
              className="secondary-button"
              style={{ marginLeft: '1rem' }}
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      <div className="glass-card">
        <h2 className="sub-title">Your Categories</h2>
        {budgetCategories.length === 0 ? (
          <p style={{textAlign: 'center', color: 'var(--text-secondary)'}}>No budget categories defined yet.</p>
        ) : (
          <ul className="categories-grid">
            {budgetCategories.map(cat => (
              <li key={cat.id} className="category-item">
                <div>
                  <span className="category-name">{cat.name}</span>
                  <p className="category-budget">Budget: ${parseFloat(cat.budgetLimit).toFixed(2)}</p>
                </div>
                <div>
                  <button onClick={() => handleEditCategory(cat)} className="primary-button" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', marginRight: '0.5rem' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteCategory(cat.id)} className="delete-button">
                    &times;
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
