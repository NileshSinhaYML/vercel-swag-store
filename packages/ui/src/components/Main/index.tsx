import type { FC, ReactNode } from "react";

export const Main: FC<{ children: ReactNode }> = ({ children }) => (
  <main className="grid grid-cols-6 gap-4 p-10 lg:grid-cols-12 lg:gap-6">
    {children}
  </main>
);
