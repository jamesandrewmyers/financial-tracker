// This directive tells Next.js that this component runs on the client side
// Client components can use browser APIs like useState, event handlers, etc.
"use client";
// Import React hooks for state management
import { useState } from "react";
// Import the TransactionForm component from the components directory
// The "@" symbol is a path alias configured in Next.js to point to the src directory
import TransactionForm from "@/components/TransactionForm";
// Import the TransactionList component to display existing transactions
import TransactionList from "@/components/TransactionList";
import Count from "@/components/Count";
// Import the new UI components
import Container from "@/components/ui/Container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import TodoList from "@/components/TodoList";
import TabBar from "@/components/TabBar";
import EmailForm from "@/components/EmailForm";
import DataTable from "@/components/DataTable";
import Modal from "@/components/Modal";
import { useSession, signIn, signOut } from "next-auth/react";

// Default export function that serves as the home page component
// This is the main page that users see when they visit the root URL "/"
export default function Home() {
  // State to trigger refresh of the transaction list
  // Incrementing this number will cause the TransactionList to re-fetch data
  const [refreshKey, setRefreshKey] = useState(0);
  const [modelIsOpen, setModalIsOpen] = useState(true);
  const { data: session, status } = useSession();

  // Function to handle when a new transaction is added
  // This gets called by the TransactionForm after successful submission
  const handleTransactionAdded = () => {
    // Increment the refresh key to trigger a list refresh
    // This ensures the new transaction appears immediately in the list
    setRefreshKey(prev => prev + 1);
  };
  const handleModalClose = () => {
    console.log("Modal closed");
    setModalIsOpen(false);
  };

  if (!session) {
    return
      <button onClick={() =>
        signIn("credentials", {
          username: "Test User",   // ⬅️ auto-fills mock username
          redirect: false,
        })
      }
    >
      Mock Sign In
    </button>
  }

  return (
    // Modern page layout with dark mode support
    <main className="py-8 min-h-screen bg-base-200">
      <Container>
        {/* Page header using new Heading and Text components */}
        <div className="mb-8 text-center">
          <Heading className="mb-4">
            Financial Dashboard
          </Heading>
          <Text size="lg" color="muted" className="mb-6">
            Track your income and expenses with modern design
          </Text>
          <div className="flex gap-4 justify-center">
            <Button variant="primary">
              View Reports
            </Button>
            <Button variant="ghost">
              Export Data
            </Button>
          </div>
        </div>
        <div><Modal isOpen={modelIsOpen} onClose={handleModalClose} title="Modal 1" children={[]}/></div>
        <div>
          <DataTable
            columns = {[{label: "Name", key: "name"}, {label: "Email", key: "email"}]}
            data = {[
  { name: "name1", email: "asdf@adf.com" },
  { name: "name2", email: "notme@gmail.com" },
]}
          />
        </div>
        <div><EmailForm onSubmit={() => {}}/></div>
        <div><Count title="My Count" count={23}/></div>
        <div>
          <TabBar
            tabs={[
              { title: "All", node: <div>All Tasks</div> },
              { title: "Active", node: <div>Active Tasks</div> },
              { title: "Completed", node: <div>Completed Tasks</div> },
            ]}
          />
        </div>
        <div><TodoList title="ToDo List"/></div>
        {/* Main content using Card components */}
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
          {/* Form column */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Add Transaction</CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionForm onTransactionAdded={handleTransactionAdded} />
              </CardContent>
            </Card>
          </div>
          
          {/* Table column */}
          <div className="lg:col-span-3">
            <TransactionList refreshKey={refreshKey} />
          </div>
        </div>
      </Container>
    </main>
  );
}
