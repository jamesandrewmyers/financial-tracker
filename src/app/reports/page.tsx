import Container from "@/components/ui/Container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export default function ReportsPage() {
  return (
    <main className="py-8 min-h-screen bg-base-200">
      <Container>
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-bold text-3xl text-base-content">Reports</h1>
          <p className="text-base opacity-70">View financial reports and analytics</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Financial Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="dark:text-gray-300 text-gray-600">
              Reporting features coming soon...
            </p>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
