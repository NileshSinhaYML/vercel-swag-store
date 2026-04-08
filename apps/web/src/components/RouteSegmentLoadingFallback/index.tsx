import { Main } from "@/components/Main";
import { Spinner } from "@/components/Spinner";
import type { FC } from "react";

export const RouteSegmentLoadingFallback: FC = () => (
  <Main>
    <div
      aria-busy
      className="border-border col-span-full flex min-h-[12rem] items-center justify-center rounded-lg border border-dashed px-4 py-10"
    >
      <Spinner className="h-auto min-h-[12rem] w-full max-w-full" />
    </div>
  </Main>
);
