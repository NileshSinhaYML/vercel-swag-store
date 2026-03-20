import type { FC } from "react";
import { PrimaryNav } from "./PrimaryNav";

export const Navigation: FC = () => (
  <nav className="fixed top-0 right-0 left-0 z-10 border-b border-gray-200 bg-white/80 px-10 backdrop-blur-sm">
    <PrimaryNav />
  </nav>
);
