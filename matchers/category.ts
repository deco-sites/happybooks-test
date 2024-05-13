import { MatchContext } from "deco/blocks/matcher.ts";
import { ProductDetailsPage, ProductListingPage } from "apps/commerce/types.ts";

type PLPLoader = ProductListingPage | null;
type PDPLoader = ProductDetailsPage | null;

export interface Props {
  matcher: PLPLoader | PDPLoader;
  /**
   * @format dynamic-options
   * @options deco-sites/todo-livro/loaders/availableCategories.ts
   */
  url: string;

  /**
   * @title Aplicar a categorias filhas
   * @description Se marcado, o matcher será aplicado a todas as categorias filhas da categoria selecionada.
   */
  applyToChildren?: boolean;
}

/**
 * @title Category Matcher (BROKEN)
 */
export default function CategoryMatcher(
  // props: Props,
  { matcher, url, applyToChildren }: Props,
  {}: MatchContext,
) {
  if (!matcher) return false;

  try {
    if (matcher["@type"] === "ProductListingPage") {
      const lastBreadcrumb = matcher.breadcrumb.itemListElement[
        matcher.breadcrumb.itemListElement.length - 1
      ];

      return !!lastBreadcrumb.item &&
        (applyToChildren
          ? new URL(lastBreadcrumb.item).pathname.startsWith(url)
          : new URL(lastBreadcrumb.item).pathname === url);
    }
  } catch (err) {
    console.log(err);
    return false;
  }

  return true;
}
