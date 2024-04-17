import { Matcher } from "deco/blocks/matcher.ts";
import { AppContext } from "deco-sites/todo-livro/apps/site.ts";

export interface Matchable {
  /** @title Regra de aplicação do conteúdo */
  rule?: Matcher;
}

type Params<T extends Matchable> = {
  items: T[];
  request: Request;
  ctx: AppContext;
  mergeMatched?: boolean;
};

export async function filterByMatcher<T extends Matchable>(
  { items = [], request, ctx, mergeMatched = true }: Params<T>,
) {
  const matchPromises = items.map(({ rule }) => {
    return new Promise<boolean>((resolve) => {
      if (rule) {
        ctx.get(rule).then((matcher) => {
          const matches = matcher({ device: ctx.device, siteId: 0, request });
          resolve(matches);
        }).catch((error) => {
          console.log(error);

          resolve(false);
        });
      } else {
        // Keeps the item if no rule was defined
        resolve(true);
      }
    });
  });

  const matches = await Promise.all(matchPromises);

  if (mergeMatched) {
    return items.filter((_, index) => matches[index]);
  }

  const matched = items.find((_, index) => matches[index]);

  return matched ? [matched] : [];
}

export function testCanonical(matcher: string, canonical: string) {
  const canonicalWithoutHost = canonical.replace(/^https?:\/\/[^/]+/, "");

  return new RegExp("^" + matcher).test(canonicalWithoutHost);
}
