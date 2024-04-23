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
    <div class="max-w-container mx-auto flex flex-col lg:flex-row gap-4 pb-[74px] md:pb-10 relative mb-8">
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
          "w-full grid px-2 md:px-0 md:relative",
          "grid-cols-[0px_1fr_0px]",
          // "px-0 md:px-5",
        )}
      >
        <Slider class="carousel sm:carousel-end gap-4 row-start-2 row-end-5">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class={clx(
                "carousel-item w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]",
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

        <Dots quantity={products.length} />
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
      <div class="md:relative block z-10 col-start-1 row-start-3">
        <Slider.PrevButton class="btn btn-circle w-12 min-w-12 h-12 min-h-12 !bg-neutral-200 md:!bg-[rgba(255,255,255,0.5)] border-0 outline-none md:static absolute bottom-0 md:bottom-[unset]">
          <Icon
            class="text-neutral-400"
            size={17}
            id="ChevronLeft"
            strokeWidth={0}
          />
        </Slider.PrevButton>
      </div>
      <div class="md:relative block z-10 col-start-3 row-start-3">
        <Slider.NextButton class="btn btn-circle w-12 min-w-12 h-12 min-h-12 !bg-neutral-200 md:!bg-[rgba(255,255,255,0.5)] border-0 outline-none absolute right-2 bottom-0 md:bottom-[unset]">
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

function Dots({ quantity }: { quantity: number }) {
  return (
    <ul class="flex gap-2 absolute w-full left-0 bottom-3 md:bottom-[unset] md:top-[calc(100%+28px)] justify-center [&_li]:hidden [&_li:nth-child(2n-1)]:flex md:[&_li:nth-child(5n-4)]:flex">
      {Array.from({ length: quantity }).map((_, index) => (
        <li class="">
          <Slider.Dot index={index}>
            <div class="py-2">
              <div class="w-2 min-w-2 h-2 min-h-2 rounded-full group-disabled:w-7 group-disabled:min-w-7 md:group-disabled:bg-neutral-400 group-disabled:bg-secondary-400 group-disabled:border-secondary-400 bg-transparent transition-all border border-neutral-400" // style={{ animationDuration: `${interval}s` }}
              />
            </div>
          </Slider.Dot>
        </li>
      ))}
    </ul>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};
