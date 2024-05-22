import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "../../islands/Header/Buttons.tsx";
import CartButtonLinx from "../../islands/Header/Cart/linx.tsx";
import CartButtonShopify from "../../islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "../../islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "../../islands/Header/Cart/vtex.tsx";
import CartButtonWake from "../../islands/Header/Cart/wake.tsx";
import CartButtonNuvemshop from "../../islands/Header/Cart/nuvemshop.tsx";
import Searchbar from "../../islands/Header/Searchbar.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import { NAV_LINK_STYLE_DICT, navbarHeight } from "./constants.tsx";
import { Buttons, Logo } from "../../components/header/Header.tsx";
import Button from "deco-sites/todo-livro/components/ui/Button.tsx";
import { clx } from "deco-sites/todo-livro/sdk/clx.ts";
import CustomImage from "deco-sites/todo-livro/components/ui/CustomImage.tsx";
import { HeaderNavigation } from "deco-sites/todo-livro/loaders/headerNavigation.ts";
import ImageOrIcon, {
  ImageOrIconType,
} from "deco-sites/todo-livro/components/ui/ImageOrIcon.tsx";

// Make it sure to render it on the server only. DO NOT render it on an island
function Navbar(
  { whatsapp, navigation, searchbar, logo, buttons, device }: {
    whatsapp?: {
      number: string;
      href: string;
      hoverTitle?: string;
      hoverText?: string;
      hoverIcon?: ImageOrIconType;
    };
    navigation?: HeaderNavigation;
    searchbar?: SearchbarProps;
    logo?: Logo;
    buttons?: Buttons;
    device: "mobile" | "desktop" | "tablet";
  },
) {
  const platform = usePlatform();
  const isMobile = device === "mobile" || device === "tablet";

  // Mobile header
  if (isMobile) {
    return (
      <div class="lg:hidden flex flex-col shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <div // style={{ height: navbarHeight }}
         class="grid grid-cols-[auto_1fr_auto] justify-between gap-6 mx-5 py-4 pb-2.5 group-data-[micro-header='true']/header:py-3 transition-all">
          <MenuButton />

          <div class="max-w-[450px]">
            <Searchbar searchbar={searchbar} />
          </div>

          <div class="flex justify-end gap-1">
            {platform === "vtex" && <CartButtonVTEX />}
            {platform === "vnda" && <CartButtonVDNA />}
            {platform === "wake" && <CartButtonWake />}
            {platform === "linx" && <CartButtonLinx />}
            {platform === "shopify" && <CartButtonShopify />}
            {platform === "nuvemshop" && <CartButtonNuvemshop />}
          </div>
        </div>

        {logo && (
          <div class="w-full grid group-data-[micro-header='true']/header:opacity-0 group-data-[micro-header='true']/header:invisible group-data-[micro-header='true']/header:grid-rows-[0fr] grid-rows-[1fr] transition-all justify-center">
            <a
              href="/"
              aria-label="Store logo"
              class="flex overflow-hidden"
            >
              <CustomImage
                class="object-contain mb-4"
                loading="eager"
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 100}
                height={logo.height || 13}
                factors={[1]}
              />
            </a>
          </div>
        )}
      </div>
    );
  }

  // Desktop header
  return (
    <div class="hidden sm:flex w-full transition-all group-data-[micro-header='true']/header:shadow-[0px_42px_12px_0px_rgba(0,0,0,0.00),0px_27px_11px_0px_rgba(0,0,0,0.01),0px_15px_9px_0px_rgba(0,0,0,0.05),0px_7px_7px_0px_rgba(0,0,0,0.09),0px_2px_4px_0px_rgba(0,0,0,0.10),0px_0px_0px_0px_rgba(0,0,0,0.10)]">
      <div class="sm:flex w-full flex-col max-w-container mx-auto">
        <div class="flex items-center justify-between w-full">
          <div class="flex gap-11">
            <div
              class={`flex justify-start`}
            >
              {logo && (
                <a
                  href="/"
                  aria-label="Store logo"
                  class="flex"
                >
                  <CustomImage
                    class="object-contain"
                    src={logo.src}
                    alt={logo.alt}
                    loading="eager"
                    width={logo.width || 100}
                    height={logo.height || 13}
                    factors={[1]}
                  />
                </a>
              )}
            </div>
            <div class="w-[450px] mt-[6px] mb-2">
              <Searchbar searchbar={searchbar} />
            </div>
          </div>
          <div class="flex gap-11 items-center justify-end">
            {whatsapp && (
              <div class="dropdown dropdown-hover">
                <a
                  class="flex gap-2 items-center text-xs text-neutral-400"
                  href={whatsapp.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Atendimento"
                >
                  <Icon
                    id="WhatsApp"
                    size={24}
                    strokeWidth={0.4}
                    class="text-success-300"
                  />
                  <strong>
                    Atendimento<br />
                    {whatsapp.number}
                  </strong>
                </a>
                {!!whatsapp.hoverTitle && !!whatsapp.hoverText && (
                  <div class="dropdown-content flex flex-col gap-2 text-neutral-600 py-6 px-8 bg-neutral-100 rounded-b-[10px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.25)] min-w-[250px] left-1/2 -translate-x-1/2">
                    <strong class="font-sm text-bold">
                      {whatsapp.hoverTitle}
                    </strong>
                    <div class="flex gap-1">
                      {whatsapp.hoverIcon && (
                        <ImageOrIcon
                          width={16}
                          height={16}
                          {...whatsapp.hoverIcon}
                        />
                      )}
                      <span class="text-xs text-neutral-400">
                        {whatsapp.hoverText}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
            {!buttons?.hideAccountButton && (
              <a
                class="flex gap-2 items-center text-xs text-neutral-400"
                href="/account"
                aria-label="Account"
              >
                <Icon
                  id="User"
                  size={24}
                  strokeWidth={0.4}
                  class="text-success-300"
                />
                <span>
                  <strong>Entre</strong> ou<br />
                  <strong>Cadastre-se</strong>
                </span>
                <Icon
                  id="ChevronDown"
                  size={16}
                  strokeWidth={0.4}
                  class="text-success-400"
                />
              </a>
            )}
            {!buttons?.hideCartButton && (
              <div class="flex items-center text-xs font-thin">
                {platform === "vtex" && <CartButtonVTEX />}
                {platform === "vnda" && <CartButtonVDNA />}
                {platform === "wake" && <CartButtonWake />}
                {platform === "linx" && <CartButtonLinx />}
                {platform === "shopify" && <CartButtonShopify />}
                {platform === "nuvemshop" && <CartButtonNuvemshop />}
              </div>
            )}
          </div>
        </div>

        <div
          class={`h-[50px] w-full flex gap-5 max-w-container mx-auto items-center border-t border-t-neutral-200 pt-[7px]`}
        >
          {!!navigation?.categories?.length && (
            <div class="dropdown dropdown-hover h-full flex flex-col group">
              <div class="text-secondary-400 flex items-center gap-[5px] flex-1 cursor-pointer">
                <Icon id="Hamburger" size={14} />
                <span class="text-sm font-bold">Categorias</span>
                <Icon
                  id="ChevronDown"
                  size={16}
                  class="group-hover:rotate-180 transition-all"
                />
              </div>
              <div class="rounded-full w-full bg-primary-500 transition-all opacity-0 group-hover:opacity-100 h-2 scale-0 group-hover:scale-100" />
              <div class="dropdown-content top-full max-w-container bg-base-100 rounded-b-[20px] py-[38px] shadow-[0px_42px_12px_0px_rgba(0,0,0,0.00),0px_27px_11px_0px_rgba(0,0,0,0.01),0px_15px_9px_0px_rgba(0,0,0,0.05),0px_7px_7px_0px_rgba(0,0,0,0.09),0px_2px_4px_0px_rgba(0,0,0,0.10),0px_0px_0px_0px_rgba(0,0,0,0.10)]">
                <ul
                  class={`px-[64px] mr-1 max-h-[316px] flex gap-10 overflow-y-auto overflow-x-hidden scrollbar`}
                >
                  {navigation?.categories?.map((item) => (
                    <li class="flex flex-col gap-[14px] max-w-[260px]">
                      {item.items.map((subItem) => (
                        <div class="flex flex-col">
                          <a
                            title={subItem.title}
                            href={subItem.url}
                            class="text-lg text-secondary-400 font-bold mb-2 text-nowrap"
                          >
                            {subItem.title}
                          </a>
                          <ul class="flex flex-col gap-[14px]">
                            {subItem.children.map((child) => (
                              <li class="flex">
                                <a
                                  href={child.url}
                                  class="text-sm text-neutral-700 hover:font-bold before-bold hover:underline transition-all text-nowrap truncate"
                                  title={child.name}
                                >
                                  {child.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {navigation?.navItems?.map((item) => <NavItem item={item} />)}
          <div class="ml-auto flex self-start gap-2">
            {navigation?.links?.map((item) => ((
              <a href={item.url}>
                <Button
                  class={clx(
                    "rounded-full text-neutral-600 px-4 py-0 h-[35px] min-h-[35px] text-sm font-bold whitespace-nowrap",
                    NAV_LINK_STYLE_DICT[item.style],
                  )}
                >
                  {item.name}
                </Button>
              </a>
            )))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
