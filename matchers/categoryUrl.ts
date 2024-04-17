import { MatchContext } from "deco/blocks/matcher.ts";

export interface Props {
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
 * @title Category URL Matcher
 */
export default function CategoryUrlMatcher(
  // props: Props,
  { url, applyToChildren }: Props,
  { request }: MatchContext,
) {
  if (!url) return false;
  const withoutHost = new URL(request.url).pathname.toLowerCase();

  try {
    return applyToChildren
      ? withoutHost.startsWith(url.toLowerCase())
      : withoutHost === url.toLowerCase();
  } catch (err) {
    console.log(err);
  }

  return false;
}
