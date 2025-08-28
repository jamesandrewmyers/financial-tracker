// This directive tells Next.js that this component runs on the client side
// Client components can use browser APIs like useState, useEffect, etc.
"use client";
// Import React hooks for state management and side effects
import { useState, useEffect } from "react";

// Define TypeScript interface for transaction data structure
// This ensures type safety when working with transaction objects
interface Transaction {
  // Unique identifier for each transaction
  id: number;
  // ID of the account this transaction belongs to
  accountId: number;
  // Date when the transaction occurred
  date: string;
  // Description of what the transaction is for
  description: string;
  // Category for organizing transactions (Income, Food, etc.)
  category: string;
  // Transaction amount (positive for income, negative for expenses)
  amount: number;
}

// Define the possible sort columns for the transaction table
type SortColumn = 'date' | 'description' | 'category' | 'amount';
// Define sort direction as either ascending or descending
type SortDirection = 'asc' | 'desc';

// Props interface for the TransactionList component
// Defines what data this component expects to receive
interface TransactionListProps {
  // Key that changes when a new transaction is added to trigger refresh
  refreshKey: number;
}

// Default export function component for displaying list of transactions
export default function TransactionList({ refreshKey }: TransactionListProps) {
  // State to hold the array of transactions fetched from the database
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  // State to track if data is currently being loaded
  const [loading, setLoading] = useState(true);
  // State to track which column is currently being sorted
  const [sortColumn, setSortColumn] = useState<SortColumn>('date');
  // State to track the sort direction (ascending or descending)
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  // State to hold the filter text for filtering transactions by description
  const [filterText, setFilterText] = useState('');
  // State to hold the applied filter (what's actually being used to filter)
  const [appliedFilter, setAppliedFilter] = useState('');

  // Function to handle column header clicks for sorting
  // Takes the column name and toggles sort direction or changes sort column
  const handleSort = (column: SortColumn) => {
    // If clicking the same column, toggle the sort direction
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking a different column, set it as the new sort column with ascending direction
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Function to handle filter button click
  const handleFilter = () => {
    setAppliedFilter(filterText);
  };

  // Function to clear the filter
  const clearFilter = () => {
    setFilterText('');
    setAppliedFilter('');
  };

  // Filter transactions based on applied filter text
  const filteredTransactions = appliedFilter 
    ? transactions.filter(transaction => 
        transaction.description.toLowerCase().includes(appliedFilter.toLowerCase())
      )
    : transactions;

  // Function to sort transactions based on current sort column and direction
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let aValue: string | number = a[sortColumn];
    let bValue: string | number = b[sortColumn];
    
    // Convert date strings to Date objects for proper date comparison
    if (sortColumn === 'date') {
      aValue = new Date(aValue as string).getTime();
      bValue = new Date(bValue as string).getTime();
    }
    
    // Handle string comparisons (description, category)
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    // Perform comparison based on sort direction
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // Function to fetch transactions from the API endpoint
  // This is called on component mount, refresh, and periodically
  const fetchTransactions = async () => {
    try {
      // Make GET request to the transactions API endpoint
      const response = await fetch('/api/transactions');
      // Parse the JSON response into JavaScript objects
      const data = await response.json();
      // Update the transactions state with the fetched data
      setTransactions(data);
      // Set loading to false since data has been fetched
      setLoading(false);
    } catch (error) {
      // Log any errors that occur during the fetch operation
      console.error('Error fetching transactions:', error);
      // Set loading to false even if there was an error
      setLoading(false);
    }
  };

  // useEffect hook to fetch transactions when component mounts and when refreshKey changes
  // This ensures the list updates when a new transaction is added
  useEffect(() => {
    // Call the fetch function immediately
    fetchTransactions();
  }, [refreshKey]); // Dependency array includes refreshKey to trigger re-fetch when it changes

  // useEffect hook to set up automatic refresh every 10 seconds
  // This keeps the list up-to-date with database changes
  useEffect(() => {
    // Set up an interval that calls fetchTransactions every 10 seconds (10000 milliseconds)
    const interval = setInterval(fetchTransactions, 10000);
    
    // Cleanup function that runs when component unmounts
    // This prevents memory leaks by clearing the interval
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to render sort indicator arrows for column headers
  const renderSortIcon = (column: SortColumn) => {
    // If this column is not the current sort column, show no icon
    if (sortColumn !== column) {
      return null;
    }
    // If this is the current sort column, show appropriate arrow based on direction
    return (
      <span className="dark:text-primary-400 text-primary-600">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  // Show loading state with dark mode support
  if (loading) {
    return (
      <div className="mt-6 p-8 w-full bg-base-100 border border-base-300 shadow card">
        <div className="flex items-center justify-center">
          <span className="loading loading-spinner" />
          <span className="ml-3">Loading transactions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden mt-6 w-full bg-base-100 border border-base-300 shadow card">
      {/* Header with dark mode styling and filter functionality */}
      <div className="px-6 py-4 bg-base-200 border-b border-base-300">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg">
              Transaction History
            </h2>
            <p className="mt-1 text-sm opacity-70">
              Click column headers to sort • Updates every 10 seconds
              {appliedFilter && (
                <>
                  <span className="ml-2">• Filtered by: "{appliedFilter}"</span>
                  <button 
                    onClick={clearFilter}
                    className="ml-2 text-primary hover:text-primary-focus underline"
                  >
                    Clear filter
                  </button>
                </>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Filter by description..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
              className="input input-bordered input-sm w-48"
            />
            <button
              onClick={handleFilter}
              className="btn btn-primary btn-sm"
            >
              Filter
            </button>
          </div>
        </div>
      </div>
      
      {transactions.length === 0 ? (
        // Empty state with dark mode support
        <div className="p-12 text-center">
          <div className="mb-4 opacity-50">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="mb-2 font-medium text-lg">
            No transactions yet
          </h3>
          <p className="opacity-70">
            Add your first transaction to get started tracking your finances
          </p>
        </div>
      ) : sortedTransactions.length === 0 ? (
        // No results after filtering
        <div className="p-12 text-center">
          <div className="mb-4 opacity-50">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="mb-2 font-medium text-lg">
            No matching transactions
          </h3>
          <p className="opacity-70">
            No transactions found containing "{appliedFilter}". Try a different search term.
          </p>
        </div>
      ) : (
        // Table with enhanced dark mode styling
        <div className="overflow-x-auto">
          <div className="overflow-y-auto max-h-96">
            <table className="table table-zebra">
              <thead className="sticky top-0 bg-base-200">
                <tr>
                  <th className="cursor-pointer" onClick={() => handleSort('date')}>
                    <div className="flex items-center space-x-1">
                      <span>Date</span>
                      {renderSortIcon('date')}
                    </div>
                  </th>
                  <th className="cursor-pointer" onClick={() => handleSort('description')}>
                    <div className="flex items-center space-x-1">
                      <span>Description</span>
                      {renderSortIcon('description')}
                    </div>
                  </th>
                  <th className="cursor-pointer" onClick={() => handleSort('category')}>
                    <div className="flex items-center space-x-1">
                      <span>Category</span>
                      {renderSortIcon('category')}
                    </div>
                  </th>
                  <th className="text-right cursor-pointer" onClick={() => handleSort('amount')}>
                    <div className="flex items-center justify-end space-x-1">
                      <span>Amount</span>
                      {renderSortIcon('amount')}
                    </div>
                  </th>
                </tr>
              </thead>
              
              <tbody>
                {sortedTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="font-medium text-sm whitespace-nowrap">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="text-sm">
                      {transaction.description}
                    </td>
                    <td className="whitespace-nowrap">
                      <span className="badge badge-outline">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="whitespace-nowrap text-right">
                      <div className={transaction.amount >= 0 ? 'badge badge-success gap-1' : 'badge badge-error gap-1'}>
                        <span>{transaction.amount >= 0 ? '↗' : '↘'}</span>
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}