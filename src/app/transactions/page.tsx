import Container from "@/components/ui/Container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export default function TransactionsPage() {
  return (
    <main className="min-h-screen bg-base-200 py-8">
      <Container>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">Transactions</h1>
          <p className="text-base opacity-70">Manage and view all your transactions</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              Transaction management features coming soon...
            </p>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
