import { AppContext } from "../../apps/site.ts";
import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import CartDrawer from "$store/islands/Header/CartDrawer.tsx";
import MenuDrawer from "$store/islands/Header/MenuDrawer.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import type { SectionProps } from "deco/types.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { SetupMicroHeader } from "deco-sites/todo-livro/islands/Header/SetupMicroHeader.tsx";

const HEADER_HEIGHT_DESKTOP = 144;
const HEADER_HEIGHT_MOBILE = 174;

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}
export interface Buttons {
  hideSearchButton?: boolean;
  hideAccountButton?: boolean;
  hideWishlistButton?: boolean;
  hideCartButton?: boolean;
}

export interface Props {
  alerts?: string[];

  /**
   * @title Valor de frete grátis
   */
  freeShippingTarget?: number;

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /** @title Logo */
  logo?: Logo;

  logoPosition?: "left" | "center";

  buttons?: Buttons;
}

function Header({
  alerts,
  searchbar,
  navItems = [
    {
      "@type": "SiteNavigationElement",
      name: "Feminino",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Masculino",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Sale",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Linktree",
      url: "/",
    },
  ],
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  logoPosition = "center",
  buttons,
  device,
}: SectionProps<typeof loader>) {
  const platform = usePlatform();
  const items = navItems ?? [];

  const isMobile = device === "mobile";

  return (
    <>
      <header
        id="main-header"
        class="group/header"
        style={{
          height: isMobile ? HEADER_HEIGHT_MOBILE : HEADER_HEIGHT_DESKTOP,
        }}
      >
        {
          /* <Drawers
          menu={{ items }}
          searchbar={searchbar}
          platform={platform}
        > */
        }
        <div class="flex flex-col bg-base-100 fixed w-full z-10">
          {alerts && alerts.length > 0 && <Alert alerts={alerts} />}
          <Navbar
            device={device}
            items={items}
            searchbar={searchbar && { ...searchbar, platform }}
            logo={logo}
            logoPosition={logoPosition}
            buttons={buttons}
          />
        </div>
        <CartDrawer platform={platform} />
        {isMobile && <MenuDrawer menu={{ items }} />}
      </header>
      <SetupMicroHeader rootId="main-header" threshold={140} />
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default Header;
