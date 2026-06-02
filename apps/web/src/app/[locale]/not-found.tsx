import { Main } from "@/components/Main";
import { Link } from "@/i18n/navigation";
import { PAGE_ROUTES } from "@/constants/page.routes";
import { Button } from "@ui/components/ui/button";
import type { FC } from "react";

const NotFoundPage: FC = () => (
  <Main>
    <div className="col-span-full flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground text-sm">
        The page you requested does not exist or has moved.
      </p>
      <Button asChild>
        <Link href={PAGE_ROUTES.HOME}>Go back home</Link>
      </Button>
    </div>
  </Main>
);

export default NotFoundPage;
