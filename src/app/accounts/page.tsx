import Container from "@/components/ui/Container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";

export default function AccountsPage() {
  return (
    <main className="py-8 min-h-screen bg-base-200">
      <Container>
        <div className="mb-8 text-center">
          <Heading as="h1" size="lg" className="mb-4">
            Accounts
          </Heading>
          <Text color="muted">
            Manage your bank accounts and balances
          </Text>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Account Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="mb-4">
              Account management features coming soon...
            </Text>
            <div className="flex gap-3">
              <Button variant="primary" size="sm">
                Add Account
              </Button>
              <Button variant="secondary" size="sm">
                Import Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
