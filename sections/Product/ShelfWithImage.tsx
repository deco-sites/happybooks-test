import type { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { AppContext } from "deco-sites/todo-livro/apps/site.ts";
import Slider from "deco-sites/todo-livro/components/ui/Slider.tsx";
import { clx } from "deco-sites/todo-livro/sdk/clx.ts";
import { useId } from "deco-sites/todo-livro/sdk/useId.ts";
import { usePlatform } from "deco-sites/todo-livro/sdk/usePlatform.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "../../components/product/ProductCard.tsx";
import Icon from "../../components/ui/Icon.tsx";
import SliderJS from "deco-sites/todo-livro/islands/SliderJS.tsx";
import { SendEventOnView } from "deco-sites/todo-livro/components/Analytics.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "deco-sites/todo-livro/sdk/useOffer.ts";

export interface Props {
  products: Product[] | null;
  cardLayout?: cardLayout;
  image: {
    srcDesktop: ImageWidget;
    srcMobile: ImageWidget;
    href: string;
    alt: string;
  };
}

export default function ShelfWithImage(
  { products, image, device, cardLayout }: ReturnType<typeof loader>,
) {
  const id = useId();
  const platform = usePlatform();
  const isMobile = device === "mobile";

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="max-w-container mx-auto flex flex-col lg:flex-row gap-4 md:pb-10 md:mb-8">
      <div class={clx("flex", isMobile ? "w-[414px]" : "min-w-[287px]")}>
        <Image
          src={isMobile ? image.srcMobile : image.srcDesktop}
          class="object-cover"
          width={isMobile ? 414 : 287}
          height={isMobile ? 150 : 460}
          alt={image.alt}
        />
      </div>
      <div
        id={id}
        class={clx(
          "w-full grid",
          "grid-cols-[0px_1fr_0px]",
          // "px-0 md:px-5",
        )}
      >
        <Slider class="carousel carousel-center sm:carousel-end gap-4 row-start-2 row-end-5">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class={clx(
                "carousel-item w-[calc(50%-1rem)] lg:w-[calc(25%-0.75rem)]",
              )}
            >
              <ProductCard
                product={product}
                itemListName={image.alt}
                layout={cardLayout}
                platform={platform}
                index={index}
              />
            </Slider.Item>
          ))}
        </Slider>

        <Buttons />
        {
          /* <div class="relative block z-10 col-start-1 row-start-3">
          <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center">
            <Icon size={24} id="ChevronLeft" strokeWidth={3} class="w-5" />
          </Slider.PrevButton>
        </div>
        <div class="relative block z-10 col-start-3 row-start-3">
          <Slider.NextButton class="absolute right-0 w-12 h-12 flex justify-center items-center">
            <Icon size={24} id="ChevronRight" strokeWidth={3} />
          </Slider.NextButton>
        </div> */
        }

        <SliderJS rootId={id} />
        <SendEventOnView
          id={id}
          event={{
            name: "view_item_list",
            params: {
              item_list_name: image.alt,
              items: products.map((product, index) =>
                mapProductToAnalyticsItem({
                  index,
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <>
      <div class="relative block z-10 col-start-1 row-start-3">
        <Slider.PrevButton class="btn btn-circle w-12 min-w-12 h-12 min-h-12 !bg-[rgba(255,255,255,0.5)] border-0 outline-none">
          <Icon
            class="text-neutral-400"
            size={17}
            id="ChevronLeft"
            strokeWidth={0}
          />
        </Slider.PrevButton>
      </div>
      <div class="relative block z-10 col-start-3 row-start-3">
        <Slider.NextButton class="btn btn-circle w-12 min-w-12 h-12 min-h-12 !bg-[rgba(255,255,255,0.5)] border-0 outline-none absolute right-0">
          <Icon
            class="text-neutral-400"
            size={17}
            id="ChevronRight"
            strokeWidth={0}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};
