import Container from "@/components/ui/Container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export default function TransactionsPage() {
  return (
    <main className="py-8 min-h-screen bg-base-200">
      <Container>
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-bold text-3xl text-base-content">Transactions</h1>
          <p className="text-base opacity-70">Manage and view all your transactions</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="dark:text-gray-300 text-gray-600">
              Transaction management features coming soon...
            </p>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
