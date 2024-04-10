import ImageOrIcon, {
  ImageOrIconType,
} from "deco-sites/todo-livro/components/ui/ImageOrIcon.tsx";

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
}

export default function Benefits(
  props: Props,
) {
  const {
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

  return (
    <div class="w-full p-5 bg-neutral-200 flex max-sm:flex-col max-sm:gap-4 justify-center gap-14 flex-wrap mb-8">
      {benefits.map((benefit) => (
        <div class="flex gap-4 items-center">
          {benefit.icon && (
            <ImageOrIcon
              width={40}
              height={40}
              {...benefit.icon}
              loading="lazy"
              alt={benefit.label}
              class="text-success-300"
            />
          )}
          <div class="flex flex-col">
            <h4 class="text-neutral-600 font-bold">{benefit.label}</h4>
            <p
              class="text-neutral-500 text-sm"
              dangerouslySetInnerHTML={{
                __html: benefit.description.replace(/\n/g, "<br>"),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
