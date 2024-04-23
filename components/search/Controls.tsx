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
      <div class="lg:flex flex-row items-center justify-between border-b border-base-200 lg:gap-4 lg:gap-y-0 gap-y-2 lg:pb-0 pb-2 w-full grid md:grid-cols-[repeat(3,auto)] grid-cols-[repeat(2,auto)]">
        <strong class="text-neutral-400 text-sm w-[90px]">
          {quantity ? `${quantity} Produtos` : ""}
        </strong>
        <div class="col-span-2 row-start-3 sm:col-span-1 md:col-span-3 sm:row-start-2 mx-auto sm:m-0 lg:m-0 md:mx-auto">
          <Pagination url={url} {...pagination} />
        </div>
        <div class="col-start-2 row-start-1 sm:row-start-2 md:row-start-1">
          <TotalPagesSelector url={url} {...totalPagesSelector} />
        </div>
        <Button
          class={displayFilter
            ? "btn-ghost"
            : "btn-ghost sm:hidden !px-0 min-w-[unset] w-[unset] min-h-[36px] h-[36px]"}
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
    </Drawer>
  );
}

export default SearchControls;
