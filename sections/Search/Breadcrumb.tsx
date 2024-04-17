import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { ProductListingPage } from "apps/commerce/types.ts";

export interface Props {
  page: ProductListingPage | null;
}

export default function BreadcrumbSection({ page }: Props) {
  if (!page) return null;

  return <Breadcrumb itemListElement={page.breadcrumb.itemListElement} />;
}
