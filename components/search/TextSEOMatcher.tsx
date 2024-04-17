import type { Props as TextSEOProps } from "./TextSEO.tsx";
import { TextSeo } from "./TextSEO.tsx";
import { Matcher } from "deco/blocks/matcher.ts";
import { filterByMatcher } from "deco-sites/todo-livro/sdk/matcher.ts";
import type { SectionProps } from "deco/types.ts";
import { AppContext } from "deco-sites/todo-livro/apps/site.ts";

export interface MatcherItem extends TextSEOProps {
  /** @title Regra de aplicação do conteúdo */
  rule?: Matcher;
}

export interface Props {
  items: MatcherItem[];
}

function TextSeoMatcher(props: SectionProps<typeof loader>) {
  if (!props.text) return null;

  return <TextSeo {...props} />;
}

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { items, ...rest } = props;

  const [matched] = await filterByMatcher({
    mergeMatched: false,
    ctx,
    request: req,
    items: items ?? [],
  });

  return {
    text: matched.text,
    ...rest,
  };
};

export default TextSeoMatcher;
