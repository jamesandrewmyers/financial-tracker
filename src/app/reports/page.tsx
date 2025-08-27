import Container from "@/components/ui/Container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-base-200 py-8">
      <Container>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">Reports</h1>
          <p className="text-base opacity-70">View financial reports and analytics</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Financial Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              Reporting features coming soon...
            </p>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
