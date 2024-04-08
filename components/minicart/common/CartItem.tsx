import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useCallback, useState } from "preact/hooks";
import Button from "../../../components/ui/Button.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import QuantitySelector from "../../../components/ui/QuantitySelector.tsx";
import { sendEvent } from "../../../sdk/analytics.tsx";
import { formatPrice } from "../../../sdk/format.ts";

export interface Item {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  quantity: number;
  price: {
    sale: number;
    list: number;
  };
}

export interface Props {
  item: Item;
  index: number;

  locale: string;
  currency: string;

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

function CartItem(
  {
    item,
    index,
    locale,
    currency,
    onUpdateQuantity,
    itemToAnalyticsItem,
  }: Props,
) {
  const { image, name, price: { sale, list }, quantity } = item;
  const isGift = sale < 0.01;
  const [loading, setLoading] = useState(false);

  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        setLoading(true);
        await cb(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <div class="flex items-center">
      <Image
        {...image}
        src={image.src.replace("55-55", "255-255")}
        style={{ aspectRatio: "70 / 70" }}
        width={70}
        height={70}
        class="h-full object-contain mr-4"
      />

      <div class="flex flex-col gap-2 mr-2">
        <div class="flex justify-between items-center">
          <strong class="text-sm text-neutral-700 truncate">{name}</strong>
        </div>
        <div class="flex gap-4 items-center">
          <div class="flex flex-col">
            <span class="line-through text-xs text-neutral-400 font-bold">
              De: {formatPrice(list, currency, locale)}
            </span>
            <span class="">
              <strong class="text-neutral-700 text-xs">Por:{" "}</strong>
              <strong class="text-success-300 font-extrabold">
                {isGift ? "Grátis" : formatPrice(sale, currency, locale)}
              </strong>
            </span>
          </div>

          <QuantitySelector
            disabled={loading || isGift}
            quantity={quantity}
            onChange={withLoading(async (quantity) => {
              const analyticsItem = itemToAnalyticsItem(index);
              const diff = quantity - item.quantity;

              await onUpdateQuantity(quantity, index);

              if (analyticsItem) {
                sendEvent({
                  name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                  params: {
                    items: [{ ...analyticsItem, quantity: Math.abs(diff) }],
                  },
                });
              }
            })}
          />
        </div>
      </div>
      <Button
        disabled={loading || isGift}
        loading={loading}
        class="btn-ghost btn-circle ml-auto !text-neutral-400"
        onClick={withLoading(async () => {
          const analyticsItem = itemToAnalyticsItem(index);

          await onUpdateQuantity(0, index);

          analyticsItem && sendEvent({
            name: "remove_from_cart",
            params: { items: [analyticsItem] },
          });
        })}
      >
        <Icon id="Trash" size={20} stroke-width={0} />
      </Button>
    </div>
  );
}

export default CartItem;
