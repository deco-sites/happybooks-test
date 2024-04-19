import Button from "../../components/ui/Button.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Filters from "../../components/search/Filters.tsx";
import Sort from "../../components/search/Sort.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";
import Pagination, {
  PaginationProps,
} from "deco-sites/todo-livro/components/search/Pagination.tsx";
import TotalPagesSelector, {
  TotalPagesSelectorProps,
} from "deco-sites/todo-livro/components/search/TotalPagesSelector.tsx";
import OrderBy from "deco-sites/todo-livro/components/search/OrderBy.tsx";

export type Props =
  & Pick<ProductListingPage, "filters" | "sortOptions">
  & {
    displayFilter?: boolean;
    showClearFilters?: boolean;
    quantity?: number;
    url: string;
    pagination: Omit<PaginationProps, "url">;
    totalPagesSelector: Omit<TotalPagesSelectorProps, "url">;
  };

function SearchControls(
  {
    filters,
    displayFilter,
    sortOptions,
    showClearFilters,
    quantity,
    url,
    pagination,
    totalPagesSelector,
  }: Props,
) {
  const open = useSignal(false);

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden w-[240px]">
            <div class="flex justify-between items-center mb-4">
              <h3 class="px-4 py-3">
                <span class="font-bold text-xl">Filtrar</span>
              </h3>
              <Button class="btn btn-ghost" onClick={() => open.value = false}>
                <Icon id="XMark" size={24} strokeWidth={2} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto">
              <Filters filters={filters} showClearFilters={showClearFilters} />
            </div>
          </div>
        </>
      }
    >
      <div class="flex flex-col justify-between mb-4 p-4 sm:mb-0 sm:p-0 sm:gap-4 sm:flex-row sm:h-[53px] sm:border-b sm:border-base-200">
        <div class="flex flex-row items-center justify-between border-b border-base-200 sm:gap-4 sm:border-none w-full">
          <strong class="text-neutral-400 text-sm w-[90px]">
            {quantity ? `${quantity} Produtos` : ""}
          </strong>
          <Pagination url={url} {...pagination} />
          <TotalPagesSelector url={url} {...totalPagesSelector} />
          <Button
            class={displayFilter ? "btn-ghost" : "btn-ghost sm:hidden"}
            onClick={() => {
              open.value = true;
            }}
          >
            Filtrar
            <Icon id="FilterList" width={16} height={16} />
          </Button>
          {/* {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />} */}
          {sortOptions.length > 0 && <OrderBy url={url} />}
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
