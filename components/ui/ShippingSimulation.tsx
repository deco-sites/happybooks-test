import { Signal, useComputed, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "../../components/ui/Button.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import type { SimulationOrderForm, SKU, Sla } from "apps/vtex/utils/types.ts";
import Icon from "deco-sites/happybooks-test/components/ui/Icon.tsx";

export interface Props {
  items: Array<SKU>;
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") {
    if (time === "1") {
      return "1 dia útil";
    }

    return `${time} dias úteis`;
  }
  if (type === "d") {
    if (time === "1") {
      return "1 dia";
    }

    return `${time} dias`;
  }
  if (type === "h") {
    if (time === "1") {
      return "1 hora";
    }

    return `${time} horas`;
  }
};

function ShippingContent({ simulation }: {
  simulation: Signal<SimulationOrderForm | null>;
}) {
  const { cart } = useCart();

  const methods = useComputed(() =>
    simulation.value?.logisticsInfo?.reduce(
      (initial, { slas }) => [...initial, ...slas],
      [] as Sla[],
    ) ?? []
  );

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.value.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col gap-4 mt-2 px-2 w-full">
      {methods.value.map((method) => (
        <li class="flex justify-between items-center border-base-200 not-first-child:border-t">
          <strong class="text-button text-center truncate">
            {method.name}
          </strong>
          <span class="text-button">
            {formatShippingEstimate(method.shippingEstimate)}
          </span>
          <span class="text-base font-semibold text-right">
            {method.price === 0 ? "Grátis" : (
              formatPrice(method.price / 100, currencyCode, locale)
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ShippingSimulation({ items }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const invalid = useSignal(false);
  const simulateResult = useSignal<SimulationOrderForm | null>(null);
  const { simulate, cart } = useCart();

  const handleSimulation = useCallback(async () => {
    if (postalCode.value.length !== 8) {
      invalid.value = true;
      return;
    }

    try {
      loading.value = true;
      simulateResult.value = await simulate({
        items: items,
        postalCode: postalCode.value,
        country: cart.value?.storePreferencesData.countryCode || "BRA",
      });
    } finally {
      loading.value = false;
    }
  }, [items, postalCode.value]);

  return (
    <div class="flex flex-col gap-1">
      <div class="flex items-center gap-1 mb-3">
        <Icon id="Truck" size={26} class="text-success-300" />
        <strong class="text-neutral-700">
          Calcule o prazo de entrega
        </strong>
      </div>

      <form
        class="relative"
        onSubmit={(e) => {
          e.preventDefault();
          handleSimulation();
        }}
      >
        <input
          as="input"
          type="text"
          data-error={invalid.value ? "true" : undefined}
          data-success={simulateResult.value ? "true" : undefined}
          class="w-full input h-[46px] text-xs placeholder:text-neutral-400 join-item flex-grow focus:outline-none bg-neutral-100 text-neutral-600 pl-6 focus:placeholder:text-transparent rounded-full border !border-neutral-300 data-[error='true']:!border-danger-500 data-[success='true']:!border-success-300"
          placeholder="Digite seu CEP"
          value={postalCode.value}
          maxLength={8}
          size={8}
          onFocus={() => invalid.value = false}
          onChange={(e: { currentTarget: { value: string } }) => {
            postalCode.value = e.currentTarget.value;
          }}
        />
        <Button
          type="submit"
          loading={loading.value}
          class="absolute top-1/2 right-1.5 !-translate-y-1/2 w-[105px] outline-none border border-neutral-600 text-neutral-600 !bg-neutral-100 hover:!bg-neutral-600 hover:text-neutral-100 !p-0 min-h-[38px] h-[38px] rounded-full"
        >
          Calcular
        </Button>
      </form>

      <div>
        <div>
          <ShippingContent simulation={simulateResult} />
        </div>
      </div>
    </div>
  );
}

export default ShippingSimulation;
