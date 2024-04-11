import ImageOrIcon, {
  ImageOrIconType,
} from "deco-sites/todo-livro/components/ui/ImageOrIcon.tsx";
import { AppContext } from "deco-sites/todo-livro/apps/site.ts";
import type { SectionProps } from "deco/types.ts";
import { useId } from "deco-sites/todo-livro/sdk/useId.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";

interface Benefit {
  label: string;
  icon?: ImageOrIconType;

  /**
   * @format textarea
   */
  description: string;
}

export interface Props {
  benefits?: Array<Benefit>;
  interval?: number;
}

function BenefitItem({ icon, label, description }: Benefit) {
  return (
    <div class="flex gap-4 items-center">
      {icon && (
        <ImageOrIcon
          width={40}
          height={40}
          {...icon}
          loading="lazy"
          alt={label}
          class="text-success-300"
        />
      )}
      <div class="flex flex-col">
        <h4 class="text-neutral-600 font-bold">{label}</h4>
        <p
          class="text-neutral-500 text-sm"
          dangerouslySetInnerHTML={{
            __html: description.replace(/\n/g, "<br>"),
          }}
        />
      </div>
    </div>
  );
}

export default function Benefits(
  props: SectionProps<typeof loader>,
) {
  const {
    device,
    interval = 3,
    benefits = [{
      icon: {
        icon: { icon: "Truck" },
      },
      label: "Entrega em todo Brasil",
      description: "Consulte o prazo no fechamento da compra.",
    }, {
      icon: { icon: { icon: "Discount" } },
      label: "15% na primeira compra",
      description: "Aplicado direto na sacola de compras.",
    }, {
      icon: { icon: { icon: "ArrowsPointingOut" } },
      label: "Devolução grátis",
      description: "Veja as condições para devolver seu produto.",
    }],
  } = props;
  const id = useId();

  const isMobile = device === "mobile";

  if (isMobile) {
    return (
      <div
        id={id}
        class="w-full py-5 px-4 bg-neutral-200 grid grid-cols-[48px_1fr_48px] justify-center items-center relative mb-8"
      >
        <Slider class="carousel carousel-center w-full col-span-full row-span-full pb-[22px]">
          {benefits.map((benefit, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full justify-center"
            >
              <BenefitItem {...benefit} />
            </Slider.Item>
          ))}
        </Slider>
        <Buttons />
        <Dots quantity={benefits.length} />
        <SliderJS
          rootId={id}
          interval={interval ? interval * 1e3 : undefined}
          infinite
        />
      </div>
    );
  }

  return (
    <div class="w-full p-5 bg-neutral-200 flex max-sm:flex-col max-sm:gap-4 justify-center gap-14 flex-wrap mb-8">
      {benefits.map((benefit) => <BenefitItem {...benefit} />)}
    </div>
  );
}

function Dots({ quantity }: { quantity: number }) {
  return (
    <ul class="carousel absolute bottom-0 left-1/2 -translate-x-1/2 justify-center gap-2">
      {Array.from({ length: quantity }).map((_, index) => (
        <li class="carousel-item">
          <Slider.Dot index={index}>
            <div class="py-5">
              <div class="w-2 min-w-2 h-2 min-h-2 rounded-full group-disabled:w-7 group-disabled:min-w-7 group-disabled:border-secondary-400 group-disabled:bg-secondary-400 bg-neutral-100 transition-all border border-neutral-300" // style={{ animationDuration: `${interval}s` }}
              />
            </div>
          </Slider.Dot>
        </li>
      ))}
    </ul>
  );
}

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-end z-10 col-start-1 row-start-1 row-span-full">
        <Slider.PrevButton class="btn btn-circle w-12 min-w-12 h-12 min-h-12 !bg-[rgba(255,255,255,0.5)] border-0 outline-none">
          <Icon
            class="text-neutral-400"
            size={17}
            id="ChevronLeft"
            strokeWidth={0}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-start z-10 col-start-3 row-start-1 row-span-full">
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

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};
