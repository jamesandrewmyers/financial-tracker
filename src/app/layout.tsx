// Import the Metadata type from Next.js for type-safe metadata definitions
import type { Metadata } from "next";
// Import Inter font from Google Fonts for modern typography
import { Inter } from "next/font/google";
// Import global CSS styles that apply to the entire application
import "./globals.css";
// Import the ThemeProvider for dark mode support
import { ThemeProvider } from "@/components/providers/ThemeProvider";
// Import the NavBar component for navigation
import { NavBar } from "@/components/NavBar";

// Configure the Inter font from Google Fonts
// Inter is a modern, highly legible font designed specifically for user interfaces
const inter = Inter({
  // Load all available font weights and styles
  subsets: ["latin"],
  // Enable font display swap for better performance
  display: "swap",
  // Create CSS variable for consistent font usage throughout the app
  variable: "--font-inter",
});

// Define metadata for the entire application
// This appears in the browser tab, search results, and social media previews
export const metadata: Metadata = {
  // The title shown in browser tabs and search results
  title: "Financial Tracker",
  // The description used by search engines and social media
  description: "Track your income and expenses with ease",
};

// Root layout component that wraps all pages in the application
// This component defines the basic HTML structure for every page
export default function RootLayout({
  children,
}: Readonly<{
  // children prop contains the page content that will be rendered inside this layout
  children: React.ReactNode;
}>) {
  return (
    // Set the document language to English for accessibility and SEO
    // Add class attribute for dark mode support (class-based dark mode strategy)
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body
        // Apply Inter font variable and antialiased text rendering
        // Use font-sans class which now maps to Inter through our Tailwind config
        className={`${inter.variable} font-sans antialiased`}
        data-theme="corporate"
        suppressHydrationWarning
      >
        {/* Wrap the entire app with ThemeProvider for dark mode support */}
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Navigation bar with sticky positioning and scroll effects */}
          <NavBar />
          {/* Render the page content passed as children prop */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
