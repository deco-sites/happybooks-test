import { formatPrice } from "$store/sdk/format.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { clx } from "$store/sdk/clx.ts";
import { useEffect, useRef } from "preact/hooks";

interface Props {
  total: number;
  locale?: string;
  currency?: string;
  target: number;
  layout?: "header" | "cart";
}

function FreeShippingProgressBar({
  target,
  total,
  layout = "header",
  locale = "pt-BR",
  currency = "BRL",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const missingValue = target - total;
  const reachedFreeShipping = missingValue <= 0;

  const valuePercentage = Math.floor((total / target) * 100);

  useEffect(() => {
    ref.current?.animate(
      [
        {
          opacity: 0,
          offset: 0,
        },
        {
          opacity: 1,
          offset: 0.25,
        },
        {
          opacity: 1,
          offset: 0.75,
        },
        {
          opacity: 0,
          offset: 1,
        },
      ],
      {
        duration: 500,
        direction: "normal",
        fill: "forwards",
      },
    );
  }, [ref.current, valuePercentage]);

  return (
    <div
      class={clx(
        "relative h-full w-full bg-neutral-300",
      )}
    >
      <div
        class="h-full bg-secondary-500 transition-all"
        style={{
          width: `${valuePercentage}%`,
        }}
      >
        <div
          ref={ref}
          style={{
            background: "oklch(var(--secondary-500))",
            backgroundImage:
              `repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.25) 28px, oklch(var(--secondary-500)) 20px, oklch(var(--secondary-500)) 50px)`,
            backgroundPosition: "center",
            backgroundRepeat: "repeat-x",
          }}
          class="w-full h-full"
        />
      </div>
      {total >= 0 && (
        <span
          class={clx(
            "absolute inset-0 text-neutral-600 flex items-center justify-center gap-x-1 text-sm",
            layout === "header" && "xl:right-[calc(50vw-610px)]",
          )}
        >
          {total === 0
            ? (
              <span class="text-neutral-600 flex items-center justify-center gap-x-2 text-sm">
                <Icon id="Truck" size={28} />
                <span>
                  Falta apenas{" "}
                  <strong>{formatPrice(target, currency, locale)}</strong>{" "}
                  para ganhar <strong>Frete Grátis!</strong>
                </span>
              </span>
            )
            : reachedFreeShipping
            ? (
              <span class="text-white flex items-center justify-center gap-x-2 text-sm">
                <Icon id="Truck" size={28} />
                <span>
                  Aproveite para comprar, o frete é grátis!
                </span>
              </span>
            )
            : (
              <span class="text-neutral-600 flex items-center justify-center gap-x-2 text-sm">
                <Icon id="Truck" size={28} />
                <span>
                  Falta apenas{" "}
                  <strong>{formatPrice(missingValue, currency, locale)}</strong>
                  {" "}
                  para ganhar <strong>Frete Grátis!</strong>
                </span>
              </span>
            )}
        </span>
      )}
    </div>
  );
}

export default FreeShippingProgressBar;
