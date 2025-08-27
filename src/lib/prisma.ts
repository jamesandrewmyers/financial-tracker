// Import the PrismaClient class from the generated Prisma client library
// This client provides type-safe database access based on our Prisma schema
import { PrismaClient } from "../generated/prisma";

// Cast the global object to include a prisma property
// This allows us to store the Prisma instance globally to prevent multiple connections
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Export a singleton Prisma client instance
// First check if a Prisma instance already exists on the global object
// If it exists, reuse it; otherwise create a new PrismaClient instance
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // Enable logging for database queries, errors, and warnings
    // This helps with debugging database operations in development
    log: ["query", "error", "warn"],
  });

// In non-production environments, store the Prisma instance on the global object
// This prevents creating multiple database connections during development hot-reloads
// In production, each serverless function will create its own instance as needed
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
