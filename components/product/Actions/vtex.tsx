import { AnalyticsItem } from "apps/commerce/types.ts";
import AddToCartButtonVtex from "../AddToCartButton/vtex.tsx";
import { useSignal } from "@preact/signals";
import QuantitySelector from "deco-sites/todo-livro/components/ui/QuantitySelector.tsx";
import { clx } from "deco-sites/todo-livro/sdk/clx.ts";

export interface Props {
  variant?: "plp" | "pdp";
  quantitySelector?: boolean;
  productID: string;
  seller: string;
  eventItem: AnalyticsItem;
}

export default function ProductActionVTEX({
  productID,
  seller,
  eventItem,
  quantitySelector = true,
  variant = "plp",
}: Props) {
  const quantity = useSignal(1);

  const handleQuantityChange = (value: number) => {
    quantity.value = value;
  };

  return (
    <div
      class={clx(
        "flex items-center justify-center gap-2 w-full",
        quantitySelector && "!justify-between",
      )}
    >
      {quantitySelector && (
        <QuantitySelector
          quantity={quantity.value}
          onChange={handleQuantityChange}
        />
      )}

      <div class="flex-1 max-w-[200px] md:max-w-[294px]">
        <AddToCartButtonVtex
          eventParams={{ items: [eventItem] }}
          productID={productID}
          seller={seller}
          quantity={quantity.value}
          variant={variant}
        />
      </div>
    </div>
  );
}
