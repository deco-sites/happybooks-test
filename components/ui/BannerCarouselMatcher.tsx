import type {
  Banner,
  Props as BannerCarouselProps,
} from "./BannerCarousel.tsx";
import BannerCarousel from "./BannerCarousel.tsx";
import { Matcher } from "deco/blocks/matcher.ts";
import { filterByMatcher } from "deco-sites/todo-livro/sdk/matcher.ts";
import type { SectionProps } from "deco/types.ts";
import { AppContext } from "deco-sites/todo-livro/apps/site.ts";

export interface MatcherItem {
  /** @title Regra de aplicação do conteúdo */
  rule?: Matcher;

  images?: Banner[];
}

export interface Props extends Omit<BannerCarouselProps, "images"> {
  items: MatcherItem[];
}

function BannerCarouselMatcher(props: SectionProps<typeof loader>) {
  if (!props.images?.length) return null;

  return <BannerCarousel {...props} />;
}

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { items, ...rest } = props;

  // const matched = matchUrlLoader(items, req);

  const matched = await filterByMatcher({
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
