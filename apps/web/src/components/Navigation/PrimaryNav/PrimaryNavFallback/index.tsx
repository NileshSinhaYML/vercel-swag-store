import type { FC } from "react";

export const PrimaryNavFallback: FC = () => (
  <div
    aria-busy
    className="flex h-14 items-center border-b border-transparent px-6 lg:px-10"
  />
);
