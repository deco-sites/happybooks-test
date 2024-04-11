import {
  SendEventOnClick,
  SendEventOnView,
} from "$store/components/Analytics.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { clx } from "deco-sites/todo-livro/sdk/clx.ts";

/**
 * @title {{ alt }} ({{ href }})
 */
export interface Banner {
  /** @description desktop optimized image */
  desktop: ImageWidget;
  /** @description mobile optimized image */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  /** @description when user clicks on the image, go to this link */
  href?: string;

  // action?: {
  //   /** @description when user clicks on the image, go to this link */
  //   href: string;
  //   /** @description Image text title */
  //   title: string;
  //   /** @description Image text subtitle */
  //   subTitle: string;
  //   /** @description Button label */
  //   label: string;
  // };
}

export interface BannerSizes {
  mobile: {
    width: number;
    height: number;
    preserveHeight?: boolean;
  };
  desktop: {
    width: number;
    height: number;
    preserveHeight?: boolean;
  };
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;

  sizes?: BannerSizes;
}

const DEFAULT_PROPS = {
  images: [
    {
      alt: "Dia das Crianças é na Todo Livro",
      href: "#",

      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4881/cdd25c87-8aeb-4526-9db3-a76463c47d3f",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4881/809900ce-9044-4446-89ae-1261a11a9f7b",
    },
    {
      alt: "Dia das Crianças é na Todo Livro",
      href: "#",

      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4881/cdd25c87-8aeb-4526-9db3-a76463c47d3f",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4881/809900ce-9044-4446-89ae-1261a11a9f7b",
    },
  ],
  sizes: {
    desktop: {
      width: 1920,
      height: 470,
      preserveHeight: false,
    },
    mobile: {
      width: 768,
      height: 470,
      preserveHeight: true,
    },
  },
  preload: true,
} satisfies Props;

function BannerItem(
  { image, lcp, id, sizes }: {
    image: Banner;
    lcp?: boolean;
    id: string;
    sizes: BannerSizes;
  },
) {
  const {
    alt,
    mobile,
    desktop,
    href,
  } = image;

  return (
    <a
      id={id}
      href={href ?? "#"}
      aria-label={alt}
      class="flex relative overflow-y-hidden w-full"
    >
      <Picture preload={lcp} class="w-full">
        <Source
          preload={lcp}
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={sizes.mobile.width / 2}
          height={sizes.mobile.height / 2}
        />
        <Source
          preload={lcp}
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={sizes.desktop.width / 2}
          height={sizes.desktop.height / 2}
        />
        <img
          class={clx(
            "object-cover w-full h-full",
            sizes.mobile.preserveHeight &&
              "max-md:h-[var(--banner-height-mobile)]",
            sizes.desktop.preserveHeight &&
              "md:h-[var(--banner-height-desktop)]",
          )}
          style={{}}
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          width={sizes.desktop.width}
          height={sizes.desktop.height}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

function Dots({ images, interval = 0 }: Props) {
  return (
    <ul class="carousel justify-center col-span-full gap-2 z-10 row-start-5">
      {images?.map((_, index) => (
        <li class="carousel-item">
          <Slider.Dot index={index}>
            <div class="py-6">
              <div class="w-2 min-w-2 h-2 min-h-2 rounded-full group-disabled:w-7 group-disabled:min-w-7 group-disabled:border-secondary-400 group-disabled:bg-secondary-400 bg-transparent transition-all border border-neutral-300" // style={{ animationDuration: `${interval}s` }}
              />
            </div>
          </Slider.Dot>
        </li>
      ))}
    </ul>
  );
  // return (
  //   <>
  //     <style
  //       dangerouslySetInnerHTML={{
  //         __html: `
  //         @property --dot-progress {
  //           syntax: '<percentage>';
  //           inherits: false;
  //           initial-value: 0%;
  //         }
  //         `,
  //       }}
  //     />
  //     <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-5">
  //       {images?.map((_, index) => (
  //         <li class="carousel-item">
  //           <Slider.Dot index={index}>
  //             <div class="py-5">
  //               <div
  //                 class="w-[0.625rem] min-w-[0.625rem] h-[0.625rem] min-h-[0.625rem] rounded-full group-disabled:animate-progress bg-gradient-to-r from-primary-500 from-[length:var(--dot-progress)] to-[#d3d3d3] to-[length:var(--dot-progress)]"
  //                 style={{ animationDuration: `${interval}s` }}
  //               />
  //             </div>
  //           </Slider.Dot>
  //         </li>
  //       ))}
  //     </ul>
  //   </>
  // );
}

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-end z-10 col-start-1 row-start-3">
        <Slider.PrevButton class="btn btn-circle w-12 min-w-12 h-12 min-h-12 !bg-[rgba(255,255,255,0.5)] border-0 outline-none">
          <Icon
            class="text-neutral-400"
            size={17}
            id="ChevronLeft"
            strokeWidth={0}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-start z-10 col-start-3 row-start-3">
        <Slider.NextButton class="btn btn-circle w-12 min-w-12 h-12 min-h-12 !bg-[rgba(255,255,255,0.5)] border-0 outline-none">
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

function BannerCarousel(props: Props) {
  const id = useId();
  const { images, preload = false, interval, sizes } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  const style = (sizes.desktop.preserveHeight || sizes.mobile.preserveHeight)
    ? (
      <style
        dangerouslySetInnerHTML={{
          __html: `
        #${id} {
          --banner-height-desktop: ${sizes.desktop.height}px;
          --banner-height-mobile: ${sizes.mobile.height}px;
        }
      `,
        }}
      />
    )
    : null;

  if (images?.length === 1) {
    const params = { promotion_name: images[0].alt };

    return (
      <>
        {style}
        <div id={id} class="flex">
          <BannerItem
            image={images[0]}
            lcp={preload}
            id={`${id}::0`}
            sizes={sizes}
          />
          <SendEventOnClick
            id={`${id}::0`}
            event={{ name: "select_promotion", params }}
          />
          <SendEventOnView
            id={`${id}::0`}
            event={{ name: "view_promotion", params }}
          />
        </div>
      </>
    );
  }

  return (
    <>
      {style}
      <div
        id={id}
        class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[calc(50vw-562px)_1fr_calc(50vw-562px)] grid-rows-[64px_1fr_48px_1fr_64px]"
      >
        <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6">
          {images?.map((image, index) => {
            const params = { promotion_name: image.alt };

            return (
              <Slider.Item index={index} class="carousel-item w-full">
                <BannerItem
                  image={image}
                  lcp={index === 0 && preload}
                  id={`${id}::${index}`}
                  sizes={sizes}
                />
                <SendEventOnClick
                  id={`${id}::${index}`}
                  event={{ name: "select_promotion", params }}
                />
                <SendEventOnView
                  id={`${id}::${index}`}
                  event={{ name: "view_promotion", params }}
                />
              </Slider.Item>
            );
          })}
        </Slider>

        <Buttons />

        <Dots images={images} interval={interval} />

        <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
      </div>
    </>
  );
}

export default BannerCarousel;
