/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useSuggestions } from "$store/sdk/useSuggestions.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import { useEffect, useRef } from "preact/compat";
import type { Platform } from "$store/apps/site.ts";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;

  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;

  platform?: Platform;
}

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  loader,
  platform,
}: Props) {
  const id = useId();
  const { setQuery, payload, loading, query } = useSuggestions(loader);
  const { products = [], searches = [] } = payload.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);

  return (
    <div class="flex-1 dropdown dropdown-bottom dropdown-end">
      <form
        tabIndex={0}
        id={id}
        action={action}
        class="join w-full rounded-none bg-neutral-200 border border-transparent has-[:focus]:border-primary"
        role="button"
      >
        <input
          id="search-input"
          class="input h-10 text-sm placeholder:text-neutral-400 join-item flex-grow border-none focus:outline-none bg-transparent"
          name={name}
          onInput={(e) => {
            const value = e.currentTarget.value;

            if (value) {
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }

            setQuery(value);
          }}
          placeholder={placeholder}
          aria-controls="search-suggestion"
          aria-haspopup="listbox"
          autocomplete="off"
        />
        <Button
          type="submit"
          class="join-item btn-ghost btn-square size-10 min-h-10 mx-1.5"
          aria-label="Search"
          for={id}
          tabIndex={-1}
        >
          {loading.value
            ? <span class="loading loading-spinner loading-xs" />
            : (
              <Icon
                id="MagnifyingGlass"
                size={24}
                strokeWidth={0.01}
                class="text-primary"
              />
            )}
        </Button>
      </form>
      <div
        tabIndex={0}
        class="dropdown-content group/search-bar w-full bg-base-100 border border-solid border-primary border-t-0 !scale-100 py-3 px-4 data-[has-content='false']:!opacity-0 flex flex-col"
        data-has-products={hasProducts}
        data-has-terms={hasTerms}
        data-has-content={hasProducts || hasTerms}
      >
        <div class="flex flex-col gap-6 pb-3  group-data-[has-products='false']/search-bar:hidden group-data-[has-terms='false']/search-bar:hidden mb-3  border-b  border-solid border-neutral-300">
          <ul id="search-suggestion" class="flex flex-col">
            {searches.map(({ term }) => (
              <li>
                <a href={`/s?q=${term}`} class="block py-1">
                  {query !== "" && (
                    <>
                      <span>{query}</span> em{" "}
                    </>
                  )}
                  <strong dangerouslySetInnerHTML={{ __html: term }} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div class="flex flex-col overflow-y-auto pr-4 scrollbar max-h-32">
          {products.map((product, index) => (
            <a class="flex items-center gap-4 py-1" href={product.url}>
              <img src={product.image?.[0].url} alt="" class="size-8" />
              <span class="truncate">{product.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
