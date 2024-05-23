import { Picture, Source } from "apps/website/components/Picture.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  banners: BannerType[];
}

export interface BannerSingle {
  /** @hide */
  readonly type: "single";
  banner: Banner;
}

export interface BannerDouble {
  /** @hide */
  readonly type: "double";
  /**
   * @maxItems 2
   */
  banners: Banner[];
}

type BannerType = BannerSingle | BannerDouble;

export interface Banner {
  desktop: ImageWidget;
  mobile: ImageWidget;
  alt: string;
  href: string;
}

const MosaicColumn = ({ banner }: { banner: BannerType }) => {
  if (banner.type === "single") {
    return (
      <a href={banner.banner.href} class="flex overflow-hidden rounded-[10px]">
        <Picture class="w-full">
          <Source
            media="(max-width: 767px)"
            src={banner.banner.mobile}
            width={375}
            height={184}
          />
          <Source
            media="(min-width: 768px)"
            src={banner.banner.desktop}
            width={261}
            height={449}
          />
          <img
            class="rounded-[10px] hover:scale-105 transition-transform duration-300 w-full md:max-w-[261px]"
            sizes="(max-width: 640px) 100vw, 25vw"
            src={banner.banner.mobile}
            alt={banner.banner.alt}
            decoding="async"
            loading="lazy"
          />
        </Picture>
      </a>
    );
  }

  const [banner1, banner2] = banner.banners;

  return (
    <div class="flex gap-2 lg:gap-4 md:flex-col">
      <a href={banner1.href} class="flex overflow-hidden rounded-[10px]">
        <Picture>
          <Source
            media="(max-width: 767px)"
            src={banner1.mobile}
            width={184}
            height={184}
          />
          <Source
            media="(min-width: 768px)"
            src={banner1.desktop}
            width={325}
            height={216}
          />
          <img
            class="rounded-[10px] hover:scale-105 transition-transform duration-300 w-full md:max-w-[325px]"
            sizes="(max-width: 640px) 100vw, 25vw"
            src={banner1.mobile}
            alt={banner1.alt}
            decoding="async"
            loading="lazy"
          />
        </Picture>
      </a>
      <a href={banner2.href} class="flex overflow-hidden rounded-[10px]">
        <Picture>
          <Source
            media="(max-width: 767px)"
            src={banner2.mobile}
            width={184}
            height={184}
          />
          <Source
            media="(min-width: 768px)"
            src={banner2.desktop}
            width={325}
            height={216}
          />
          <img
            class="rounded-[10px] hover:scale-105 transition-transform duration-300 w-full md:max-w-[325px]"
            sizes="(max-width: 640px) 100vw, 25vw"
            src={banner2.mobile}
            alt={banner2.alt}
            decoding="async"
            loading="lazy"
          />
        </Picture>
      </a>
    </div>
  );
};

export const BannerMosaic = ({ banners }: Props) => {
  return (
    <div class="flex flex-col md:flex-row gap-2 lg:gap-4 max-w-[440px] md:max-w-container mx-auto w-full mb-8 px-2 lg:px-0">
      {banners.map((banner) => <MosaicColumn banner={banner} />)}
    </div>
  );
};
