import type { SectionProps } from "deco/types.ts";
import { AppContext } from "deco-sites/todo-livro/apps/site.ts";
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
} from "deco-sites/todo-livro/components/footer/Background.tsx";
import DeliveryOptions, {
  DeliveryOption,
} from "deco-sites/todo-livro/components/footer/DeliveryOptions.tsx";
import Security, {
  SecurityItem,
} from "deco-sites/todo-livro/components/footer/Security.tsx";

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
}: SectionProps<typeof loader>) {
  const isMobile = device === "mobile";
  const isTablet = device === "tablet";

  const content = (
    <>
      <div class="flex flex-col w-full max-w-container mx-auto px-6 gap-6">
        <Social {...social} />
        <div class="w-full flex gap-6 lg:gap-8 justify-center">
          <FooterItems sections={sections} justify={false} />
          <Security items={securityItems} />
        </div>
        <div class="flex items-center justify-between gap-3">
          <PaymentMethods content={payments} />
          <DeliveryOptions items={deliveryOptions} />
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
    <footer class="relative w-full flex-col">
      <div class="absolute bottom-0 left-0 -z-10">
        <BackgroundDesktop class="w-full h-auto" />
      </div>
      {content}
    </footer>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default Footer;
