import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery/ImageSlider.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import NotFound from "../../sections/Product/NotFound.tsx";
import { LoadingFallback as BreadcrumbLoadingFallback } from "../../sections/Search/Breadcrumb.tsx";
import Breadcrumb from "deco-sites/todo-livro/components/ui/Breadcrumb.tsx";
import GallerySlider from "deco-sites/todo-livro/components/product/Gallery/ImageSlider.tsx";
import { AppContext } from "deco-sites/todo-livro/apps/site.ts";
import type { SectionProps } from "deco/types.ts";
import BrowserLog from "deco-sites/todo-livro/islands/BrowserLog.tsx";
import { BenefitBadge } from "deco-sites/todo-livro/components/product/BenefitsBadges.tsx";
import ProductTitle from "deco-sites/todo-livro/components/product/ProductTitle.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  benefitBadges?: BenefitBadge[];
  layout?: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

export function loader(props: Props, _req: Request, ctx: AppContext) {
  return {
    ...props,
    isMobile: ctx.device !== "desktop",
  };
}

export default function ProductDetails(
  { page, isMobile, benefitBadges, layout }: SectionProps<typeof loader>,
) {
  if (!page?.seo) {
    return <NotFound />;
  }
  const { breadcrumbList } = page;
  const itemListElement = breadcrumbList?.itemListElement.slice(0, -1);

  return (
    <div class="flex flex-col gap-6 mb-8">
      <BrowserLog payload={page} />
      <Breadcrumb itemListElement={itemListElement} />
      <div class="w-full max-w-container px-2 container:px-0 mx-auto flex flex-col lg:flex-row lg:gap-[90px] gap-6 lg:justify-between">
        {isMobile && (
          <ProductTitle product={page.product} layoutName={layout?.name} />
        )}
        <GallerySlider
          page={page}
          isMobile={isMobile}
        />
        <ProductInfo
          page={page}
          benefitBadges={benefitBadges}
          layout={layout}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div class="flex flex-col gap-6">
      <BreadcrumbLoadingFallback />
      <div
        style={{ height: "710px" }}
        class="w-full flex justify-center items-center"
      >
        <span class="loading loading-spinner" />
      </div>
    </div>
  );
}
