import Icon from "deco-sites/todo-livro/components/ui/Icon.tsx";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  url: string;
  // onNext: () => void;
  // onPrev: () => void;
}

const PAGES_TO_SHOW = 4;

function getPageUrl(page: number, currentURL: string) {
  const urlObj = new URL(currentURL);
  urlObj.searchParams.set("page", String(page));
  return urlObj.toString();
}

const Pagination: React.FC<PaginationProps> = (
  { currentPage, totalPages, url },
) => {
  const middlePage = Math.ceil(PAGES_TO_SHOW / 2);
  const pages: number[] = [];

  let startPage = Math.max(currentPage - middlePage + 1, 1);
  const endPage = Math.min(startPage + PAGES_TO_SHOW - 1, totalPages);

  if (endPage - startPage + 1 < PAGES_TO_SHOW) {
    startPage = Math.max(endPage - PAGES_TO_SHOW + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div class="flex items-center gap-2">
      <a
        href={currentPage > 1 ? getPageUrl(currentPage - 1, url) : undefined}
        class="flex items-center justify-center size-[30px] text-neutral-700 aria-disabled:pointer-events-none aria-disabled:text-neutral-400"
        aria-disabled={currentPage === 1}
      >
        <Icon id="ChevronLeft" size={12} />
      </a>
      <div class="flex items-center gap-4">
        {pages.map((page) => (
          <a
            href={getPageUrl(page, url)}
            class="flex items-center justify-center size-[30px] rounded-full text-neutral-700 text-sm aria-disabled:bg-secondary-400 aria-disabled:text-neutral-100 aria-disabled:font-semibold transition-all hover:bg-secondary-100"
            aria-disabled={currentPage === page}
          >
            {String(page).padStart(2, "0")}
          </a>
        ))}
      </div>
      <a
        class="flex items-center justify-center size-[30px] text-neutral-700 aria-disabled:pointer-events-none aria-disabled:text-neutral-400"
        aria-disabled={currentPage === totalPages}
        href={currentPage < totalPages
          ? getPageUrl(currentPage + 1, url)
          : undefined}
      >
        <Icon id="ChevronRight" size={12} />
      </a>
    </div>
  );
};

export default Pagination;
