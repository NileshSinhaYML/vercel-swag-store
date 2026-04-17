import type { FC, ReactNode } from "react";
import { cn } from "@repo/ui/lib/utils";

export interface MainProps {
  children: ReactNode;
  className?: string;
}
export const Main: FC<MainProps> = ({ children, className }) => (
  <main
    className={cn(
      "mx-auto grid min-h-[calc(100dvh-var(--nav-height)-var(--footer-height)-1px)] max-w-[100rem] grid-cols-6 gap-4 px-6 py-10 lg:grid-cols-12 lg:gap-6 lg:px-10",
      className,
    )}
  >
    {children}
  </main>
);
