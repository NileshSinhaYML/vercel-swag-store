import type { FC, ReactNode } from "react";

export const Main: FC<{ children: ReactNode }> = ({ children }) => (
  <main className="grid min-h-[calc(100dvh-var(--nav-height)-var(--footer-height)-1px)] grid-cols-6 gap-4 px-6 py-10 lg:grid-cols-12 lg:gap-6 lg:px-10">
    {children}
  </main>
);
