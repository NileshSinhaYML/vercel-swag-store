"use client";

import { Main } from "@/components/Main";
import { Spinner } from "@/components/Spinner";
import { APP_CONSTANTS } from "@/constants/app.constants";
import { useTranslations } from "next-intl";
import type { FC } from "react";

export const SearchPageFallback: FC = () => {
  const t = useTranslations(APP_CONSTANTS.NAME_SPACES.SEARCH_PAGE);
  return (
    <Main>
      <div
        aria-busy="true"
        aria-label={t("SUSPENSE_LOADING")}
        className="border-border col-span-full rounded-lg border border-dashed px-4 py-10"
      >
        <Spinner className="h-auto min-h-[12rem] w-full max-w-full" />
      </div>
    </Main>
  );
};
