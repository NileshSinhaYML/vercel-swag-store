import type { Metadata } from "next";
import type { FC, ReactNode } from "react";
import { inter } from "@/app/font";

import { Navigation } from "@ui/components/Navigation";

import "./globals.css";
import { Footer } from "@ui/components/Footer";

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
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
