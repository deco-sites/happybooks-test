import { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  banners: BannerType[];
}

export interface BannerSingle {
  /**
   * @readonly
   */
  type: "single";
  banner: Banner;
}

export interface BannerDouble {
  /**
   * @readonly
   */
  type: "double";
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

export const BannerMosaic = ({ banners }: Props) => {
  return <div>mosaic</div>;
};
