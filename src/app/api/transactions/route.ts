// Import NextResponse for creating API responses in Next.js App Router
import { NextResponse } from "next/server";
// Import the Prisma client instance for database operations
import { prisma } from "@/lib/prisma";

// GET handler function to retrieve all transactions from the database
// This function is called when a GET request is made to /api/transactions
export async function GET() {
  // Query the database to fetch all transaction records
  // findMany() returns an array of all transactions in the database
  const transactions = await prisma.transaction.findMany();
  // Return the transactions as a JSON response
  return NextResponse.json(transactions);
}

// POST handler function to create a new transaction in the database
// This function is called when a POST request is made to /api/transactions
// The req parameter contains the incoming HTTP request with transaction data
export async function POST(req: Request) {
  // Parse the JSON body from the incoming request
  // This contains the transaction data sent by the client
  const body = await req.json();
  // Create a new transaction record in the database using Prisma
  const tx = await prisma.transaction.create({
    // The data object contains all the fields for the new transaction
    data: {
      // Account ID linking this transaction to a specific account
      accountId: body.accountId,
      // Convert the date string from the request to a Date object
      date: new Date(body.date),
      // Transaction description (e.g., "Grocery Store", "Salary")
      description: body.description,
      // Transaction category (e.g., "Food", "Income", "Transportation")
      category: body.category,
      // Transaction amount (positive for income, negative for expenses)
      amount: body.amount,
    },
  });
  // Return the newly created transaction as a JSON response
  return NextResponse.json(tx);
}
