"use client";

import { Button } from "@ui/components/ui/button";
import type { FC } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage: FC<Readonly<ErrorPageProps>> = ({ error, reset }) => (
  <main className="mx-auto flex min-h-[50vh] w-full max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
    <h1 className="text-2xl font-semibold">Something went wrong</h1>
    <p className="text-muted-foreground text-sm">
      {error.message || "We hit an unexpected error while loading this page."}
    </p>
    <Button type="button" onClick={reset}>
      Try again
    </Button>
  </main>
);

export default ErrorPage;
