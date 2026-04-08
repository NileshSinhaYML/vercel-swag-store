import { cn } from "@repo/ui/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@ui/components/ui/pagination";
import type { CommitSearchToUrl } from "@/contexts/SearchPageContext";
import { APP_CONSTANTS } from "@/constants/app.constants";
import { useSearchResultsStore } from "@/stores/search-results.store";
import { getPaginationPageItems } from "@/utils/pagination.utils";
import { useTranslations } from "next-intl";
import type { FC } from "react";

type ProductsPaginationProps = {
  commitToUrl: CommitSearchToUrl;
};

export const ProductsPagination: FC<Readonly<ProductsPaginationProps>> = ({
  commitToUrl,
}) => {
  const t = useTranslations(APP_CONSTANTS.NAME_SPACES.SEARCH_PAGE);
  const pagination = useSearchResultsStore(
    (s) => s.searchResults?.meta?.pagination,
  );

  if (!pagination) return null;

  const { page, totalPages } = pagination;
  const pageItems = getPaginationPageItems({ currentPage: page, totalPages });

  return (
    <div className="border-border flex flex-col gap-4 border-t pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <p className="text-muted-foreground text-sm">
        {t("PAGINATION_SUMMARY", {
          page,
          totalPages,
          total: pagination.total,
        })}
      </p>
      <Pagination className="mx-0 w-auto justify-end">
        <PaginationContent className="flex-wrap justify-end gap-0.5 sm:gap-0">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              text={t("PAGINATION_PREVIOUS")}
              aria-label={t("PAGINATION_GO_PREVIOUS")}
              aria-disabled={pagination.hasPreviousPage ? undefined : true}
              tabIndex={pagination.hasPreviousPage ? undefined : -1}
              onClick={(e) => {
                e.preventDefault();
                if (!pagination.hasPreviousPage) return;
                commitToUrl({ page: Math.max(1, page - 1) });
              }}
              className={cn(
                !pagination.hasPreviousPage &&
                  "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>

          {pageItems.map((item, index) =>
            item === "ellipsis" ? (
              <PaginationItem key={`e-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <PaginationLink
                  href="#"
                  isActive={item === page}
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    if (item === page) return;
                    commitToUrl({ page: item });
                  }}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              text={t("PAGINATION_NEXT")}
              aria-label={t("PAGINATION_GO_NEXT")}
              aria-disabled={pagination.hasNextPage ? undefined : true}
              tabIndex={pagination.hasNextPage ? undefined : -1}
              onClick={(e) => {
                e.preventDefault();
                if (!pagination.hasNextPage) return;
                commitToUrl({ page: page + 1 });
              }}
              className={cn(
                !pagination.hasNextPage && "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
