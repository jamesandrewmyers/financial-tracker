// Import the PrismaClient from the generated Prisma client directory
// This provides type-safe access to the database based on our schema
import { PrismaClient } from '../src/generated/prisma'

// Create a new instance of the Prisma client for database operations
// This will be used throughout the seed script to create test data
const prisma = new PrismaClient()

// Main async function that contains all the seeding logic
// This function will be executed when the script runs
async function main() {
  // Create the first test user with email and hashed password
  // The passwordHash is a bcrypt hash of "testpass123" for testing purposes
  const user1 = await prisma.user.create({
    data: {
      // Email address for the first test user
      email: 'john.doe@example.com',
      // Pre-hashed password using bcrypt (original password: "testpass123")
      passwordHash: '$2a$10$8K1p/a0dURac/oFbqaKTqO2x8k2U0U.vM0VLJv5Z.6J5Vs2JbF4i2', // password: "testpass123"
    },
  })

  // Create the second test user with different email but same password hash
  // This provides multiple users for testing user-specific functionality
  const user2 = await prisma.user.create({
    data: {
      // Email address for the second test user
      email: 'jane.smith@example.com',
      // Same pre-hashed password for consistency in testing
      passwordHash: '$2a$10$8K1p/a0dURac/oFbqaKTqO2x8k2U0U.vM0VLJv5Z.6J5Vs2JbF4i2', // password: "testpass123"
    },
  })

  // Create a checking account for the first user
  // This represents a typical bank checking account for daily transactions
  const checkingAccount = await prisma.account.create({
    data: {
      // Link this account to user1 using their ID
      userId: user1.id,
      // Descriptive name for the account
      name: 'Main Checking',
      // Account type identifier for categorization
      type: 'checking',
    },
  })

  // Create a savings account for the first user
  // This represents a savings account for long-term storage of funds
  const savingsAccount = await prisma.account.create({
    data: {
      // Link this account to user1 using their ID
      userId: user1.id,
      // Descriptive name indicating the purpose of the savings account
      name: 'Emergency Savings',
      // Account type identifier for categorization
      type: 'savings',
    },
  })

  // Create a credit card account for the second user
  // This represents a credit card account with potential debt/credit transactions
  const creditAccount = await prisma.account.create({
    data: {
      // Link this account to user2 using their ID
      userId: user2.id,
      // Generic name for the credit card account
      name: 'Credit Card',
      // Account type identifier for credit accounts
      type: 'credit',
    },
  })

  // Create an array of test transaction objects
  // Each transaction represents a real-world financial activity with various categories
  const transactions = [
    {
      // Link this transaction to the checking account
      accountId: checkingAccount.id,
      // Set the transaction date to January 15, 2024
      date: new Date('2024-01-15'),
      // Description explaining what this transaction represents
      description: 'Direct Deposit - Salary',
      // Category for organizing and filtering transactions
      category: 'Income',
      // Positive amount indicates money coming into the account
      amount: 3500.00,
    },
    {
      // Link this transaction to the checking account
      accountId: checkingAccount.id,
      // Set the transaction date to January 16, 2024
      date: new Date('2024-01-16'),
      // Description of the purchase location
      description: 'Grocery Store',
      // Category for food-related expenses
      category: 'Food',
      // Negative amount indicates money going out of the account
      amount: -85.32,
    },
    {
      // Link this transaction to the checking account
      accountId: checkingAccount.id,
      // Set the transaction date to January 17, 2024
      date: new Date('2024-01-17'),
      // Description of the purchase location
      description: 'Gas Station',
      // Category for transportation-related expenses
      category: 'Transportation',
      // Negative amount for fuel purchase expense
      amount: -45.67,
    },
    {
      // Link this transaction to the checking account
      accountId: checkingAccount.id,
      // Set the transaction date to January 18, 2024
      date: new Date('2024-01-18'),
      // Description of the utility bill payment
      description: 'Electric Bill',
      // Category for utility-related expenses
      category: 'Utilities',
      // Negative amount for bill payment
      amount: -120.00,
    },
    {
      // Link this transaction to the savings account (receiving money)
      accountId: savingsAccount.id,
      // Set the transaction date to January 18, 2024 (same day as transfer out)
      date: new Date('2024-01-18'),
      // Description indicating this is money coming from checking account
      description: 'Transfer from Checking',
      // Category for account-to-account transfers
      category: 'Transfer',
      // Positive amount in savings (receiving money)
      amount: 500.00,
    },
    {
      // Link this transaction to the checking account (sending money)
      accountId: checkingAccount.id,
      // Set the transaction date to January 18, 2024 (same day as transfer in)
      date: new Date('2024-01-18'),
      // Description indicating this is money going to savings account
      description: 'Transfer to Savings',
      // Category for account-to-account transfers
      category: 'Transfer',
      // Negative amount in checking (sending money)
      amount: -500.00,
    },
    {
      // Link this transaction to the checking account
      accountId: checkingAccount.id,
      // Set the transaction date to January 20, 2024
      date: new Date('2024-01-20'),
      // Description of small purchase location
      description: 'Coffee Shop',
      // Category for food and beverage purchases
      category: 'Food',
      // Negative amount for small coffee purchase
      amount: -4.75,
    },
    {
      // Link this transaction to the credit account
      accountId: creditAccount.id,
      // Set the transaction date to January 21, 2024
      date: new Date('2024-01-21'),
      // Description of online purchase
      description: 'Online Shopping',
      // Category for general shopping purchases
      category: 'Shopping',
      // Negative amount for online purchase on credit
      amount: -89.99,
    },
    {
      // Link this transaction to the credit account
      accountId: creditAccount.id,
      // Set the transaction date to January 22, 2024
      date: new Date('2024-01-22'),
      // Description of restaurant expense
      description: 'Restaurant Dinner',
      // Category for dining out expenses
      category: 'Food',
      // Negative amount for restaurant meal on credit
      amount: -65.40,
    },
    {
      // Link this transaction to the checking account
      accountId: checkingAccount.id,
      // Set the transaction date to January 25, 2024
      date: new Date('2024-01-25'),
      // Description of freelance work payment received
      description: 'Freelance Payment',
      // Category for additional income sources
      category: 'Income',
      // Positive amount for freelance work income
      amount: 750.00,
    },
  ]

  // Loop through each transaction in the array and create it in the database
  // Using a for...of loop ensures transactions are created sequentially
  for (const transaction of transactions) {
    // Create each transaction record in the database using Prisma
    await prisma.transaction.create({
      // Pass the transaction object directly as data
      data: transaction,
    })
  }

  // Log success message to indicate seeding completed successfully
  console.log('✅ Test data seeded successfully!')
  // Log the total count of users created (should be 2)
  console.log(`Created ${await prisma.user.count()} users`)
  // Log the total count of accounts created (should be 3)
  console.log(`Created ${await prisma.account.count()} accounts`)
  // Log the total count of transactions created (should be 10)
  console.log(`Created ${await prisma.transaction.count()} transactions`)
}

// Execute the main function and handle any errors that might occur
main()
  // Catch block handles any errors that occur during the seeding process
  .catch((e) => {
    // Log the error message with emoji for visibility
    console.error('❌ Error seeding data:', e)
    // Exit the process with error code 1 to indicate failure
    process.exit(1)
  })
  // Finally block ensures cleanup happens regardless of success or failure
  .finally(async () => {
    // Disconnect from the database to close the connection properly
    await prisma.$disconnect()
  })