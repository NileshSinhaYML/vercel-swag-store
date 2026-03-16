import type { FC } from "react";

export const Footer: FC = () => (
  <footer className="w-full border-t bg-black py-4">
    <p className="px-10 text-sm text-white">
      &copy; {new Date().getFullYear()} Swag Store. All rights reserved.
    </p>
  </footer>
);
