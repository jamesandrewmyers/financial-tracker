// This directive tells Next.js that this component runs on the client side
// Client components can use browser APIs like useState, event handlers, etc.
"use client";
// Import the useState hook from React for managing component state
import { useState } from "react";
// Import the Button component
import Button from "@/components/ui/Button";

// Props interface for the TransactionForm component
// Defines what data this component expects to receive from its parent
interface TransactionFormProps {
  // Callback function that gets called after a transaction is successfully added
  onTransactionAdded: () => void;
}

// Default export function component for creating new financial transactions
// Now accepts props to enable communication with parent component
export default function TransactionForm({ onTransactionAdded }: TransactionFormProps) {
  // Initialize form state using useState hook
  // This object holds all the form field values with default values
  const [form, setForm] = useState({ 
    accountId: 1,        // Default to account ID 1 (hardcoded for now)
    date: "",           // Empty string for date input
    description: "",    // Empty string for transaction description
    category: "",       // Empty string for transaction category
    amount: 0          // Default amount to 0
  });

  // Async function to handle form submission
  // Takes a React form event as parameter
  async function handleSubmit(e: React.FormEvent) {
    // Prevent the default form submission behavior (page refresh)
    e.preventDefault();
    
    try {
      // Make a POST request to the transactions API endpoint
      const response = await fetch("/api/transactions", {
        // Specify HTTP method as POST for creating new data
        method: "POST",
        // Set content type header to indicate JSON data
        headers: { "Content-Type": "application/json" },
        // Convert form state object to JSON string for request body
        body: JSON.stringify(form),
      });
      
      // Check if the request was successful
      if (response.ok) {
        // Reset the form to its initial state after successful submission
        setForm({ 
          accountId: 1,    // Reset to default account ID
          date: "",        // Clear date field
          description: "", // Clear description field
          category: "",    // Clear category field
          amount: 0       // Reset amount to 0
        });
        
        // Call the callback function to notify parent component that a transaction was added
        // This will trigger a refresh of the transaction list
        onTransactionAdded();
      } else {
        // Log error if the request failed
        console.error('Failed to add transaction');
      }
    } catch (error) {
      // Log any network or other errors that occur during submission
      console.error('Error submitting transaction:', error);
    }
  }

  return (
    // Form content without card wrapper - now handled by parent Card component
    <form onSubmit={handleSubmit} className="space-y-4">
        {/* Description field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input 
            type="text" 
            className="input input-bordered w-full"
            placeholder="e.g., Grocery shopping"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })} 
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Category field */}
          <div className="form-control">
            <label className="label"><span className="label-text">Category</span></label>
            <input 
              type="text" 
              className="input input-bordered w-full"
              placeholder="e.g., Food"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })} 
              required
            />
          </div>
          
          {/* Amount field */}
          <div className="form-control">
            <label className="label"><span className="label-text">Amount ($)</span></label>
            <input 
              type="number" 
              step="0.01"
              className="input input-bordered w-full"
              placeholder="0.00"
              value={form.amount || ''}
              onChange={e => setForm({ ...form, amount: parseFloat(e.target.value) || 0 })} 
              required
            />
          </div>
        </div>
        
        {/* Date field */}
        <div className="form-control">
          <label className="label"><span className="label-text">Date</span></label>
          <input 
            type="date" 
            className="input input-bordered w-full"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })} 
            required
          />
        </div>
        
        {/* Submit button */}
        <Button 
          type="submit" 
          variant="primary"
          size="lg"
          className="w-full"
        >
          Add Transaction
        </Button>
      </form>
  );
}
