import type { SectionProps } from "deco/types.ts";
import { AppContext } from "deco-sites/happybooks-test/apps/site.ts";
import FooterItems, {
  FooterSection,
} from "../../components/footer/FooterItems.tsx";
import PaymentMethods, {
  PaymentItem,
} from "../../components/footer/PaymentMethods.tsx";
import RegionSelector from "../../components/footer/RegionSelector.tsx";
import Social, { SocialItem } from "../../components/footer/Social.tsx";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";
import {
  BackgroundDesktop,
  BackgroundMobile,
} from "deco-sites/happybooks-test/components/footer/Background.tsx";
import DeliveryOptions, {
  DeliveryOption,
} from "deco-sites/happybooks-test/components/footer/DeliveryOptions.tsx";
import Security, {
  SecurityItem,
} from "deco-sites/happybooks-test/components/footer/Security.tsx";
import PoweredByAgenciaEPlus from "deco-sites/happybooks-test/components/footer/PoweredByAgenciaEPlus.tsx";
import PoweredByVTEX from "deco-sites/happybooks-test/components/footer/PoweredByVTEX.tsx";
import CookieConsent, {
  Props as CookieProps,
} from "deco-sites/happybooks-test/components/ui/CookieConsent.tsx";

export interface Props {
  social?: {
    title?: string;
    items: SocialItem[];
  };
  sections?: FooterSection[];
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  deliveryOptions?: DeliveryOption[];
  securityItems?: SecurityItem[];

  /** @format html */
  copyright?: string;

  cookie?: CookieProps;
}

function Footer({
  sections = [{
    "title": "Sobre",
    "content": {
      "kind": "list",
      "items": [
        {
          "href": "/quem-somos",
          "label": "Quem somos",
        },
        {
          "href": "/termos-de-uso",
          "label": "Termos de uso",
        },
        {
          "href": "/trabalhe-conosco",
          "label": "Trabalhe conosco",
        },
      ],
    },
  }, {
    "title": "Atendimento",
    "content": {
      "kind": "list",
      "items": [
        {
          "href": "/centraldeatendimento",
          "label": "Central de atendimento",
        },
        {
          "href": "/whatsapp",
          "label": "Fale conosco pelo WhatsApp",
        },
        {
          "href": "/trocaedevolucao",
          "label": "Troca e devolução",
        },
      ],
    },
  }],
  social = {
    title: "Redes sociais",
    items: [{
      name: "Instagram",
      image: { icon: { icon: "Instagram" } },
      link: "/",
    }, {
      name: "Tiktok",
      image: {
        icon: {
          icon: "Tiktok",
        },
      },
      link: "/",
    }],
  },
  payments = {
    title: "Formas de pagamento",
    items: [{ name: "Mastercard", image: { icon: { icon: "Mastercard" } } }, {
      name: "Visa",
      image: { icon: { icon: "Visa" } },
    }, { name: "Pix", image: { icon: { icon: "Pix" } } }],
  },
  deliveryOptions,
  securityItems,
  copyright,
  device,
  cookie,
}: SectionProps<typeof loader>) {
  const isMobile = device === "mobile";
  const isTablet = device === "tablet";

  const content = (
    <>
      <CookieConsent {...cookie} />
      <div class="flex flex-col w-full max-w-container mx-auto md:px-6 md:gap-6 pb-3">
        <Social {...social} />
        <div class="w-full flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 justify-center">
          <FooterItems sections={sections} justify={false} />
          <Security items={securityItems} />
        </div>
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-3 mx-5 md:mx-0 mt-4 md:mt-0">
          <PaymentMethods content={payments} />
          <DeliveryOptions items={deliveryOptions} />
        </div>

        <div class="flex flex-wrap items-center gap-4 md:gap-6 justify-center md:p-1.5 md:bg-secondary-400 md:rounded-[10px] max-md:max-w-[430px] self-center mt-4 md:mt-0 px-5 md:px-1.5">
          {copyright && (
            <div
              class="text-neutral-100 text-xs text-center w-full max-w-[430px]"
              dangerouslySetInnerHTML={{ __html: copyright }}
            />
          )}
          <PoweredByAgenciaEPlus width={108} color="White" />
          <PoweredByVTEX width={55} color="White" />
          <PoweredByDeco width={77} color="White" />
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <footer class="relative w-full flex-col">
        <div class="absolute bottom-0 left-0 -z-10 bg-secondary-400">
          <BackgroundMobile class="w-full h-auto" />
        </div>
        {content}
      </footer>
    );
  }

  return (
    <footer class="relative w-full flex-col overflow-x-clip">
      <div class="absolute bottom-0 -z-10 left-1/2 -translate-x-1/2 min-[1920px]:w-full min-[1920px]:left-0 min-[1920px]:translate-x-0">
        <BackgroundDesktop class="h-auto min-[1920px]:w-full" />
      </div>
      {content}
    </footer>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default Footer;
