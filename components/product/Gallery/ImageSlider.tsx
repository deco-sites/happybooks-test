import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import ZoomableImage from "$store/islands/ZoomableImage.tsx";
import type { Props as ZoomableImageProps } from "$store/components/ui/ZoomableImage.tsx";
import {
  getOptimizedMediaUrl,
  getSrcSet,
} from "apps/website/components/Image.tsx";
import { Head } from "$fresh/runtime.ts";
import CustomImage from "deco-sites/todo-livro/components/ui/CustomImage.tsx";
import { clx } from "deco-sites/todo-livro/sdk/clx.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  isMobile: boolean;
}

const THUMBS_LIMIT = 4;

function SliderImage(props: ZoomableImageProps) {
  const { preload } = props;

  if (!props.height) {
    console.warn(
      `Missing height. This image will NOT be optimized: ${props.src}`,
    );
  }

  const srcSet = getSrcSet(props.src, props.width, props.height, props.fit);
  const linkProps = {
    imagesrcset: srcSet,
    imagesizes: props.sizes,
    fetchpriority: props.fetchPriority,
    media: props.media,
  };

  const zoomSrc = getOptimizedMediaUrl({
    originalSrc: props.src,
    width: 1600,
    height: 1600,
    fit: props.fit,
    factor: 1,
  });

  return (
    <>
      {preload && (
        <Head>
          <link as="image" rel="preload" href={props.src} {...linkProps} />
        </Head>
      )}
      <ZoomableImage
        {...props}
        srcSet={srcSet}
        zoomSrc={zoomSrc}
      />
    </>
  );
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: {
      product: { image: images = [] },
      product,
    },
    isMobile,
  } = props;
  const width = 550;
  const height = 550;
  const aspectRatio = `${width} / ${height}`;
  const isAboveThumbsLimit = images.length > THUMBS_LIMIT;

  return (
    <div
      id={id}
      class="lg:flex items-start h-fit"
    >
      {/* Dots */}
      {
        /* {isMobile
        ? (
          <ul class="flex justify-center absolute bottom-12 left-1/2 -translate-x-1/2 z-30">
            {images?.map((_, index) => (
              <li class="carousel-item">
                <Slider.Dot index={index}>
                  <div class="size-2 m-1 bg bg-neutral-400 rounded-full group-disabled:bg-primary" />
                </Slider.Dot>
              </li>
            ))}
          </ul>
        )
        : ( */
      }
      <div
        class={clx(
          "max-lg:hidden grid grid-cols-1 grid-rows-1 gap-3 justify-items-center",
          isAboveThumbsLimit && "!grid-rows-[2.5rem_auto_2.5rem]",
        )}
      >
        {isAboveThumbsLimit && (
          <Slider.PrevButton class="btn btn-circle w-10 min-w-10 h-10 min-h-10 !bg-neutral-200 hover:!bg-neutral-100 border-0 outline-none disabled:select-none !rotate-90">
            <Icon
              class="text-neutral-400"
              size={17}
              id="ChevronLeft"
              strokeWidth={0}
            />
          </Slider.PrevButton>
        )}
        <ul class="carousel carousel-vertical carousel-center gap-3 flex-col min-w-[100px] h-[436px]">
          {images.map((img, index) => (
            <li class="carousel-item max-w-[100px] sm:max-w-[100px]">
              <Slider.Dot index={index}>
                <CustomImage
                  style={{ aspectRatio }}
                  class="group-disabled:border-primary-400 opacity-50 group-disabled:opacity-100 group-disabled:border-2 border border-neutral-300 object-cover w-full h-full transition rounded-[10px]"
                  factors={[1]}
                  width={100}
                  height={100}
                  src={img.url!}
                  alt={img.alternateName}
                />
              </Slider.Dot>
            </li>
          ))}
        </ul>
        {isAboveThumbsLimit && (
          <Slider.NextButton class="btn btn-circle w-10 min-w-10 h-10 min-h-10 !bg-neutral-200 hover:!bg-neutral-100 border-0 outline-none disabled:select-none !rotate-90">
            <Icon
              class="text-neutral-400"
              size={17}
              id="ChevronRight"
              strokeWidth={0}
            />
          </Slider.NextButton>
        )}
      </div>
      {/* )} */}

      {/* Image Slider */}
      <div class="lg:flex items-center gap-1 relative lg:px-6 px-3 lg:ml-[90px]">
        <Slider.PrevButton class="btn btn-circle w-12 min-w-12 h-12 min-h-12 !bg-neutral-200 hover:!bg-neutral-100 border-0 outline-none absolute left-0 top-1/2 !-translate-y-1/2 z-10 disabled:select-none">
          <Icon
            class="text-neutral-400"
            size={17}
            id="ChevronLeft"
            strokeWidth={0}
          />
        </Slider.PrevButton>
        <div
          className="flex-1 flex flex-col mx-auto"
          style={{
            maxWidth: width,
          }}
        >
          <Slider
            class="carousel carousel-center gap-6 w-full border border-neutral-300 rounded-[15px]"
            style={{
              aspectRatio: `${width} / ${height}`,
              maxWidth: width,
            }}
          >
            {images.map((img, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-full flex justify-center select-none"
              >
                <SliderImage
                  type={isMobile ? "click" : "hover"}
                  factor={2}
                  class="w-full object-contain"
                  sizes="(max-width: 640px) 100vw, 30vw"
                  style={{
                    aspectRatio: `${width} / ${height}`,
                    maxWidth: width,
                  }}
                  src={img.url!}
                  alt={img.alternateName}
                  width={width}
                  height={height}
                  fit="contain"
                  // Preload LCP image for better web vitals

                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </Slider.Item>
            ))}
          </Slider>
          <p class="flex justify-center items-center gap-1 text-neutral-400 font-bold text-sm mt-3">
            <Icon id="Zoom" size={20} /> {isMobile
              ? "Clique na imagem para dar zoom"
              : "Passe o mouse para dar zoom"}
          </p>
        </div>

        <Slider.NextButton class="btn btn-circle w-12 min-w-12 h-12 min-h-12 !bg-neutral-200 hover:!bg-neutral-100 border-0 outline-none absolute top-1/2 right-0 !-translate-y-1/2 z-10 disabled:select-none">
          <Icon
            class="text-neutral-400"
            size={17}
            id="ChevronRight"
            strokeWidth={0}
          />
        </Slider.NextButton>
      </div>

      <SliderJS rootId={id} />
    </div>
  );
}
