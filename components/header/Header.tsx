import { AppContext } from "../../apps/site.ts";
import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import CartDrawer from "$store/islands/Header/CartDrawer.tsx";
import MenuDrawer from "$store/islands/Header/MenuDrawer.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SectionProps } from "deco/types.ts";
import Alert, { AlertItem } from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { SetupMicroHeader } from "deco-sites/happybooks-test/islands/Header/SetupMicroHeader.tsx";
import { HeaderNavigation } from "deco-sites/happybooks-test/loaders/headerNavigation.ts";
import Icon from "deco-sites/happybooks-test/components/ui/Icon.tsx";
import { ImageOrIconType } from "deco-sites/happybooks-test/components/ui/ImageOrIcon.tsx";

const HEADER_HEIGHT_DESKTOP = 144;
const HEADER_HEIGHT_MOBILE = 177; //

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}
export interface Buttons {
  hideAccountButton?: boolean;
  hideCartButton?: boolean;
}

export interface Props {
  alerts?: AlertItem[];

  /**
   * @title Valor de frete grátis
   */
  freeShippingTarget?: number;

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /** @title WhatsApp Link */
  whatsapp?: {
    number: string;
    href: string;
    hoverTitle?: string;
    hoverText?: string;
    hoverIcon?: ImageOrIconType;
  };

  /**
   * @title Navigation
   * @description Navigation used both on mobile and desktop menus
   */
  navigation?: HeaderNavigation;

  /** @title Logo */
  logo?: Logo;

  buttons?: Buttons;
}

function Header({
  alerts,
  freeShippingTarget,
  searchbar: { ...searchbar },
  whatsapp,
  navigation,
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  buttons,
  device,
}: SectionProps<typeof loader>) {
  const platform = usePlatform();

  const isMobile = device === "mobile" || device === "tablet";

  const shouldShowAlerts = (alerts && alerts.length > 0) ||
    (freeShippingTarget ?? 0) > 0;

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
        <div class="flex flex-col bg-base-100 fixed w-full z-50">
          {shouldShowAlerts && (
            <Alert
              alerts={alerts}
              freeShippingTarget={freeShippingTarget}
              device={device}
            />
          )}
          <Navbar
            device={device}
            navigation={navigation}
            searchbar={searchbar && { ...searchbar, platform }}
            logo={logo}
            buttons={buttons}
            whatsapp={whatsapp}
          />
        </div>
        <CartDrawer platform={platform} />
        {isMobile && <MenuDrawer menu={{ navigation, logo, alerts }} />}
        <div class="fixed right-0 bottom-0 md:right-2 md:bottom-2 z-30 flex flex-col gap-4 pointer-events-none">
          <a
            class="btn btn-sm btn-square btn-neutral size-12 rounded-full bg-primary-400 hover:!bg-primary-500 opacity-0 invisible group-data-[micro-header='true']/header:opacity-100 group-data-[micro-header='true']/header:visible transition pointer-events-auto !border-none"
            href="#main-header"
          >
            <Icon id="ChevronUp" size={24} />
          </a>
          {whatsapp?.href && (
            <a
              href={whatsapp?.href}
              class="pointer-events-auto size-12 rounded-full bg-success-300 hover:bg-success-500 flex items-center justify-center text-neutral-100 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon id="WhatsApp" size={30} />
            </a>
          )}
        </div>
      </header>
      <SetupMicroHeader rootId="main-header" threshold={140} />
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default Header;
