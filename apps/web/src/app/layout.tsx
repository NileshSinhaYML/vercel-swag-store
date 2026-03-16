import type { Metadata } from "next";
import type { FC, ReactNode } from "react";
import { inter } from "@/app/font";

import { Navigation } from "@ui/components/Navigation";

import "./globals.css";

export const metadata: Metadata = {
  title: "Swag Store",
  description: "Store front for swag items",
};

const RootLayout: FC<Readonly<{ children: ReactNode }>> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
