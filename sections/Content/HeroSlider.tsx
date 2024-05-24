import InstitucionalText from "deco-sites/happybooks-test/sections/Institutional/InstitutionalText.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import CoverFlowSlider from "deco-sites/happybooks-test/islands/CoverFlowSlider.tsx";

export interface ImageItem {
  src: ImageWidget;
  alt: string;
}

export interface Props {
  coverFlowImages: ImageItem[];
  /** @format html */
  content: string;
}

function HeroSlider({ content, coverFlowImages }: Props) {
  return (
    <div class="slider-hero max-w-container px-2 container:px-0 mx-auto w-full flex flex-col lg:flex-row gap-8 lg:gap-14 mb-14">
      <div class="w-full lg:w-1/2 lg:px-0">
        <InstitucionalText content={content} />
      </div>
      <div class="w-full lg:w-1/2 overflow-hidden lg:my-auto">
        <CoverFlowSlider coverFlowImages={coverFlowImages} />
      </div>
    </div>
  );
}

export default HeroSlider;
