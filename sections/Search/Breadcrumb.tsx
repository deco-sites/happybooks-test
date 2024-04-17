import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { ProductListingPage } from "apps/commerce/types.ts";
import Icon from "deco-sites/todo-livro/components/ui/Icon.tsx";

export interface Props {
  page: ProductListingPage | null;
}

export default function BreadcrumbSection({ page }: Props) {
  if (!page) return null;

  return <Breadcrumb itemListElement={page.breadcrumb.itemListElement} />;
}

export function LoadingFallback() {
  return (
    <div class="w-full bg-neutral-200 text-neutral-400 py-2 text-sm mt-4">
      <div class="flex gap-2 items-center max-w-container mx-auto">
        <a href="/" class="flex items-center gap-1">
          <Icon id="House" size={16} />
          Home
        </a>
        <span>/</span>
        <div class="skeleton w-20 h-[19px]" />
      </div>
    </div>
  );
}
