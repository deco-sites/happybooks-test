import type {
  Banner,
  Props as BannerCarouselProps,
} from "./BannerCarousel.tsx";
import BannerCarousel from "./BannerCarousel.tsx";
import { Matcher } from "deco/blocks/matcher.ts";
import { filterByMatcher } from "deco-sites/happybooks-test/sdk/matcher.ts";
import type { SectionProps } from "deco/types.ts";
import { AppContext } from "deco-sites/happybooks-test/apps/site.ts";

export interface MatcherItem {
  /** @title Regra de aplicação do conteúdo */
  rule?: Matcher;

  images?: Banner[];
}

export interface Props extends Omit<BannerCarouselProps, "images"> {
  /**
   * @title Combinar resultados
   * @description Imagens de todos os itens que combinarem com a regra serão exibidas.
   * @default false
   */
  mergeMatched?: boolean;

  items: MatcherItem[];
}

function BannerCarouselMatcher(props: SectionProps<typeof loader>) {
  if (!props.images?.length) return null;

  return <BannerCarousel {...props} />;
}

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { items, mergeMatched, ...rest } = props;

  const matched = await filterByMatcher({
    mergeMatched: !!mergeMatched,
    ctx,
    request: req,
    items: items ?? [],
  });

  return {
    images: matched.flatMap((item) => item.images ? item.images : []),
    ...rest,
  };
};

export default BannerCarouselMatcher;
