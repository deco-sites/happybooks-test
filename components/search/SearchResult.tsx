import { SendEventOnView } from "../../components/Analytics.tsx";
import { Layout as CardLayout } from "../../components/product/ProductCard.tsx";
import Filters from "../../components/search/Filters.tsx";
import Icon from "../../components/ui/Icon.tsx";
import SearchControls from "../../islands/SearchControls.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import BrowserLog from "deco-sites/todo-livro/islands/BrowserLog.tsx";
import Pagination from "deco-sites/todo-livro/components/search/Pagination.tsx";

export type Format = "Show More" | "Pagination";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
  /**
   * @description Format of the pagination
   */
  format?: Format;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  cardLayout?: CardLayout;

  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  layout,
  cardLayout,
  startingPage = 0,
  url: _url,
}: Omit<Props, "page"> & {
  page: ProductListingPage;
  url: string;
}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const url = new URL(_url);

  const { format = "Pagination" } = layout ?? {};

  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  const isPartial = url.searchParams.get("partial") === "true";
  const isFirstPage = !pageInfo.previousPage;

  const hasSelectedFilters = filters.some((filter) => {
    if (filter["@type"] === "FilterToggle") {
      return filter.values.some((value) => value.selected);
    }
    return false;
  });

  const pagination = {
    currentPage: pageInfo.currentPage,
    totalPages: Math.ceil(
      (pageInfo.records ?? 0) / (pageInfo.recordPerPage ?? 24),
    ),
    // currentPage: 2,
    // totalPages: 10,
  };

  return (
    <>
      <BrowserLog payload={{ filters, products, pageInfo }} />
      <div class="max-w-container mx-auto mt-4 mb-8">
        <div class="flex flex-row gap-16">
          {layout?.variant === "aside" && filters.length > 0 &&
            (isFirstPage || !isPartial) && (
            <aside class="hidden sm:block w-min min-w-[240px] rounded-[20px] border border-neutral-300 h-fit">
              <div class="flex items-center justify-center gap-2 w-full h-[38px] mb-4 bg-secondary-100 rounded-full">
                <Icon id="FilterList" size={16} class="text-success-300" />
                <span class="text-neutral-700 font-bold text-lg">
                  Filtrar
                </span>
              </div>
              <Filters
                filters={filters}
                showClearFilters={hasSelectedFilters}
              />
            </aside>
          )}

          <div class="flex-grow flex flex-col gap-6" id={id}>
            {(isFirstPage || !isPartial) && (
              <SearchControls
                sortOptions={sortOptions}
                filters={filters}
                showClearFilters={hasSelectedFilters}
                displayFilter={layout?.variant === "drawer"}
                quantity={pageInfo.records}
                url={_url}
                pagination={pagination}
                totalPagesSelector={{ recordsPerPage: pageInfo.recordPerPage }}
              />
            )}

            <ProductGallery
              products={products}
              offset={offset}
              layout={{ card: cardLayout, columns: layout?.columns, format }}
              pageInfo={pageInfo}
              url={url}
            />
            {format == "Pagination" && (
              <Pagination
                url={_url}
                {...pagination}
              />
              // <div class="flex justify-center my-4">
              //   <div class="join">
              //     <a
              //       aria-label="previous page link"
              //       rel="prev"
              //       href={pageInfo.previousPage ?? "#"}
              //       class="btn btn-ghost join-item"
              //     >
              //       <Icon id="ChevronLeft" size={24} strokeWidth={2} />
              //     </a>
              //     <span class="btn btn-ghost join-item">
              //       Page {zeroIndexedOffsetPage + 1}
              //     </span>
              //     <a
              //       aria-label="next page link"
              //       rel="next"
              //       href={pageInfo.nextPage ?? "#"}
              //       class="btn btn-ghost join-item"
              //     >
              //       <Icon id="ChevronRight" size={24} strokeWidth={2} />
              //     </a>
              //   </div>
              // </div>
            )}
          </div>
        </div>
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult(
  { page, ...props }: ReturnType<typeof loader>,
) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export const loader = (props: Props, req: Request) => {
  return {
    ...props,
    url: req.url,
  };
};

export default SearchResult;
