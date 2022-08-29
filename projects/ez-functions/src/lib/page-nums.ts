export const pageNums = (
  pageNum: number,
  totalPages: number,
  maxPages: number
): number[] => {
  if (totalPages <= maxPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    let startPage = pageNum - Math.floor(maxPages / 2);
    if (startPage < 1) {
      startPage = 1;
    } else if (startPage > totalPages - maxPages + 1) {
      startPage = totalPages - maxPages + 1;
    }
    return Array.from({ length: maxPages }, (_, i) => i + startPage);
  }
};
