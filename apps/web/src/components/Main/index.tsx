import type { FC, ReactNode } from "react";

export const Main: FC<{ children: ReactNode }> = ({ children }) => (
  <main className="grid min-h-[calc(100dvh-3.5rem)] grid-cols-6 gap-4 p-10 lg:grid-cols-12 lg:gap-6">
    {children}
  </main>
);
