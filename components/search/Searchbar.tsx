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
import { useSignal } from "@preact/signals";
import Image from "apps/website/components/Image.tsx";
import { formatPrice } from "../../sdk/format.ts";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Placeholder mobile
   * @description Search bar default placeholder message in mobile
   * @default What are you looking for?
   */
  placeholderMobile?: string;
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

  /**
   * @ignore
   */
  isMobile?: boolean;
}

function Searchbar({
  placeholder = "What are you looking for?",
  placeholderMobile = placeholder,
  action = "/s",
  name = "q",
  loader,
  platform,
  isMobile,
}: Props) {
  const isFocused = useSignal(false);
  const id = useId();
  const { setQuery, payload, loading, query } = useSuggestions(loader);
  const { products = [], searches = [] } = payload.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const open = isFocused.value && !!query && (hasProducts || hasTerms);

  return (
    <div
      class="flex-1 dropdown dropdown-bottom dropdown-end w-full group/search-bar"
      data-open={open}
    >
      <form
        tabIndex={0}
        id={id}
        action={action}
        data-filled={query !== "" ? "true" : "undefined"}
        class="join z-[2] w-full rounded-full bg-neutral-200 border border-success-300 md:border-neutral-200 md:has-[:focus]:border-success-300 transition-colors group/form relative has-[:focus]:bg-white data-[filled='true']:bg-white"
        role="button"
      >
        <input
          id="search-input"
          class="input h-[46px] text-sm placeholder:text-neutral-400 join-item flex-grow border-none focus:outline-none bg-transparent text-neutral-600 pl-2.5 md:pl-[30px] max-md:pr-0 max-[400px]:w-[inherit] focus:placeholder:text-transparent"
          name={name}
          ref={searchInputRef}
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
          onFocus={() => isFocused.value = true}
          onBlur={() =>
            setTimeout(() => {
              isFocused.value = false;
            }, 100)}
          placeholder={isMobile ? placeholder : placeholderMobile}
          aria-controls="search-suggestion"
          aria-haspopup="listbox"
          autocomplete="off"
        />
        <button
          type="button"
          class="absolute right-16 h-full flex items-center text-neutral-400 text-sm font-bold invisible opacity-0 transition-all cursor-default group-data-[filled='true']/form:visible group-data-[filled='true']/form:opacity-100 group-data-[filled='true']/form:cursor-pointer group-has-[:focus]/form:visible group-has-[:focus]/form:opacity-100"
          onClick={(e) => {
            e.preventDefault();

            if (searchInputRef.current) {
              if (query) {
                setQuery("");
                searchInputRef.current.value = "";
              }

              searchInputRef.current.focus();
            }
          }}
        >
          {query ? "Limpar" : "Buscar"}
        </button>
        <button
          type="submit"
          class="rounded-full size-12 min-h-12 min-w-12 bg-neutral-300 transition-colors flex items-center border border-success-300 md:border-neutral-300 justify-center text-success-300 hover:border-success-300 hover:bg-success-300 hover:text-neutral-100 group-has-[:focus]/form:border-success-300"
          aria-label="Search"
          for={id}
          tabIndex={-1}
        >
          {loading.value
            ? <span class="loading loading-spinner loading-xs" />
            : (
              <Icon
                id="MagnifyingGlass"
                size={20}
                strokeWidth={0.01}
                class="text-inherit"
              />
            )}
        </button>
      </form>
      <div
        tabIndex={0}
        class="dropdown-content z-[1] !top-6 w-full bg-base-100 border border-solid border-success-300 border-t-0 !scale-100 pt-6 pb-2.5 xs:pb-2 data-[has-content='false']:!opacity-0 flex flex-col text-sm rounded-b-[24px] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.25)]"
        data-has-products={hasProducts}
        data-has-terms={hasTerms}
        data-has-content={hasProducts || hasTerms}
      >
        {!!searches.length && (
          <div class="flex mt-3 pb-2.5 xs:pb-3 border-b border-b-neutral-200 mx-2 xs:mx-3 px-2.5 xs:px-3">
            <ul
              id="search-suggestion"
              class="flex flex-1 max-xs:flex-col max-xs:gap-1 max-w-[100%]"
            >
              <li>
                <a href={`/s?q=${searches[0].term}`} class="block truncate">
                  {query !== "" && (
                    <>
                      <strong>{query}</strong> em{" "}
                    </>
                  )}
                  <span
                    dangerouslySetInnerHTML={{ __html: searches[0].term }}
                  />
                </a>
              </li>
              {!!searches[1] && (
                <>
                  <li class="mx-1 max-xs:hidden">
                    <strong>|</strong>
                  </li>
                  <li>
                    <a href={`/s?q=${searches[1].term}`} class="block truncate">
                      {query !== "" && (
                        <>
                          <strong>{query}</strong> em{" "}
                        </>
                      )}
                      <span
                        dangerouslySetInnerHTML={{ __html: searches[1].term }}
                      />
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
        <div
          class={`flex flex-col overflow-y-auto mt-2.5 xs:mt-3 px-2.5 xs:px-7 mr-2.5 xs:mr-1 scrollbar max-h-[151px] xs:max-h-[163px] gap-2 xs:gap-3`}
        >
          {products.map((product, index) => {
            const offer = product.offers?.offers?.[0];
            const price = offer?.price;
            const listPrice = offer?.priceSpecification.find(
              (spec) => spec.priceType === "https://schema.org/ListPrice",
            )?.price;
            const currency = product?.offers?.priceCurrency;

            return (
              <a class="flex items-center gap-4" href={product.url}>
                <Image
                  width={45}
                  height={45}
                  src={product.image?.[0].url!}
                  alt=""
                  class=""
                />
                <div class="flex flex-col">
                  <strong class="truncate gap-0.5">{product.name}</strong>
                  <div class="flex gap-2 items-end">
                    {listPrice && (
                      <span class="line-through text-neutral-400 text-xs hidden xs:inline">
                        {formatPrice(listPrice, currency)}
                      </span>
                    )}
                    <span>
                      <strong class="text-neutral-700 text-xs">Por:</strong>
                      {" "}
                      <strong class="font-extrabold text-success-300">
                        {formatPrice(price, currency)}
                      </strong>
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
        <div class="mt-[6px] w-full px-2">
          <a
            href={`/s?q=${query}`}
            class="btn rounded-full w-full bg-neutral-400 hover:bg-neutral-600 !text-neutral-100 text-sm xs:text-base font-extrabold h-[42px] min-h-[42px]"
          >
            Ver mais produtos
          </a>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
