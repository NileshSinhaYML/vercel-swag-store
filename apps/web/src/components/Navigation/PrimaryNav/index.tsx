import type { FC } from "react";
import { LogoVercel } from "geist-icons";
import { PRIMARY_NAV_CONSTANTS } from "@/components/Navigation/PrimaryNav/PrimaryNav.constants";
import { Button } from "@ui/components/ui/button";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export const PrimaryNav: FC = () => (
  <div className="flex items-center gap-x-8 py-4">
    <div className="flex h-full items-center gap-x-2">
      <LogoVercel aria-hidden="true" />
      <span className="text-sm font-medium">{PRIMARY_NAV_CONSTANTS.TITLE}</span>
    </div>
    <div className="flex h-full items-center gap-x-2">
      {PRIMARY_NAV_CONSTANTS.MENU_LINKS.map((link) => (
        <Button
          asChild
          variant="link"
          key={link.href}
          className="font-thin text-gray-500 hover:text-gray-900 hover:no-underline"
        >
          <Link href={link.href}>{link.name}</Link>
        </Button>
      ))}
    </div>
    <div className="ml-auto">
      <ShoppingBag />
    </div>
  </div>
);
