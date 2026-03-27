export type PaginationPageItem = number | "ellipsis";

/**
 * Builds a compact list of page numbers and ellipsis markers for UI pagination
 * (e.g. 1 … 4 5 6 … 20). Based on a sliding window around the current page.
 */
export const getPaginationPageItems: ({
  currentPage,
  totalPages,
  siblingCount,
}: {
  currentPage: number;
  totalPages: number;
  /** Pages shown on each side of the current page (default 1). */
  siblingCount?: number;
}) => PaginationPageItem[] = ({
  currentPage,
  totalPages,
  siblingCount = 1,
}) => {
  if (totalPages < 1) return [];
  const totalSlots = siblingCount * 2 + 5;

  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = 3 + 2 * siblingCount;
    return [
      ...Array.from({ length: leftCount }, (_, i) => i + 1),
      "ellipsis",
      totalPages,
    ];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = 3 + 2 * siblingCount;
    const firstRight = totalPages - rightCount + 1;
    return [
      1,
      "ellipsis",
      ...Array.from({ length: rightCount }, (_, i) => firstRight + i),
    ];
  }

  if (showLeftEllipsis && showRightEllipsis) {
    return [
      1,
      "ellipsis",
      ...Array.from(
        { length: rightSibling - leftSibling + 1 },
        (_, i) => leftSibling + i,
      ),
      "ellipsis",
      totalPages,
    ];
  }

  return Array.from({ length: totalPages }, (_, i) => i + 1);
};
