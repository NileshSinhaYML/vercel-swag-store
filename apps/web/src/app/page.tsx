import { Button } from "@repo/ui/components/ui/button";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button variant="outline" size="sm">
        Click me
      </Button>
    </main>
  );
}
