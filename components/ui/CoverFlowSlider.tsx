import Image from "apps/website/components/Image.tsx";
import { useState } from "preact/hooks";
import Icon from "deco-sites/todo-livro/components/ui/Icon.tsx";
import Button from "deco-sites/todo-livro/components/ui/Button.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

export interface ImageItem {
  src: ImageWidget;
  alt: string;
}

export interface Props {
  coverFlowImages: ImageItem[];
}

const MAX_VISIBILITY = 3;

function CoverFlowSlider({ coverFlowImages = [] }: Props) {
  const [active, setActive] = useState(2);
  const count = coverFlowImages.length;

  return (
    <div class="relative w-[23rem] h-[25rem] m-auto coverflow-slide lg:ml-auto lg:mr-13">
      <Button
        class="no-animation group/prev absolute left-0 z-10 lg:left-8 top-1/2 btn btn-circle w-12 min-w-12 h-12 min-h-12 !bg-neutral-200 md:!bg-[rgba(255,255,255,0.5)] hover:!bg-neutral-100 !border-neutral-400 outline-none disabled:opacity-50"
        onClick={() => {
          if (active <= 0) return;
          setActive((i) => i - 1);
        }}
        disabled={active === 0}
      >
        <Icon
          class="text-neutral-400"
          size={17}
          id="ChevronLeft"
          strokeWidth={0}
        />
      </Button>
      {coverFlowImages.map((img, i) => (
        <div
          class="card-container"
          style={{
            "--active": i === active ? 1 : 0,
            "--offset": (active - i) / 3,
            "--direction": Math.sign(active - i),
            "--abs-offset": Math.abs(active - i) / 3,
            "pointer-events": active === i ? "auto" : "none",
            "opacity": i === active
              ? "1"
              : Math.abs(active - i) >= 2
              ? "0"
              : "0.5",
            "display": Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
          }}
        >
          <div className="card w-full h-full transition-all duration-300 ease-in-out p-4">
            <Image
              src={img.src}
              alt={img.alt}
              width={343}
              height={374}
              class="w-full"
            />
          </div>
        </div>
      ))}
      <Button
        class="no-animation absolute group/next z-10 right-0 lg:right-8 top-1/2 btn btn-circle w-12 min-w-12 h-12 min-h-12 !bg-neutral-200 md:!bg-[rgba(255,255,255,0.5)] hover:!bg-neutral-100 !border-neutral-400 outline-none disabled:opacity-50"
        onClick={() => {
          if (active >= count - 1) return;
          setActive((i) => i + 1);
        }}
        disabled={active >= count - 1}
      >
        <Icon
          class="text-neutral-400"
          size={17}
          id="ChevronRight"
          strokeWidth={0}
        />
      </Button>
    </div>
  );
}

export default CoverFlowSlider;
