import { usePlatform } from "deco-sites/todo-livro/sdk/usePlatform.tsx";
import { AnalyticsItem, PropertyValue } from "apps/commerce/types.ts";
import AddToCartButtonVtex from "./vtex.tsx";
import AddToCartButtonWake from "./wake.tsx";
import AddToCartButtonLinx from "./linx.tsx";
import AddToCartButtonVNDA from "./vnda.tsx";
import AddToCartButtonShopify from "./shopify.tsx";
import AddToCartButtonNuvemshop from "./nuvemshop.tsx";
import { useSignal } from "@preact/signals";
import QuantitySelector from "deco-sites/todo-livro/components/ui/QuantitySelector.tsx";
import { clx } from "deco-sites/todo-livro/sdk/clx.ts";

export interface Props {
  variant?: "plp" | "pdp";
  quantitySelector?: boolean;
  platform: ReturnType<typeof usePlatform>;
  productID: string;
  seller: string;
  eventItem: AnalyticsItem;
  productGroupID: string;
  additionalProperty: PropertyValue[];
}

export default function AddToCartButton({
  platform,
  productID,
  seller,
  eventItem,
  productGroupID,
  additionalProperty,
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
        "flex items-center justify-between",
      )}
    >
      {quantitySelector && (
        <QuantitySelector
          quantity={quantity.value}
          onChange={handleQuantityChange}
        />
      )}

      <div class="flex-1 max-w-[200px] md:max-w-[294px]">
        {platform === "vtex" && (
          <AddToCartButtonVtex
            eventParams={{ items: [eventItem] }}
            productID={productID}
            seller={seller}
            quantity={quantity.value}
            variant={variant}
          />
        )}
        {platform === "wake" && (
          <AddToCartButtonWake
            eventParams={{ items: [eventItem] }}
            productID={productID}
            quantity={quantity.value}
            variant={variant}
          />
        )}
        {platform === "linx" && (
          <AddToCartButtonLinx
            eventParams={{ items: [eventItem] }}
            productID={productID}
            productGroupID={productGroupID}
            quantity={quantity.value}
            variant={variant}
          />
        )}
        {platform === "vnda" && (
          <AddToCartButtonVNDA
            eventParams={{ items: [eventItem] }}
            productID={productID}
            additionalProperty={additionalProperty}
            quantity={quantity.value}
            variant={variant}
          />
        )}
        {platform === "shopify" && (
          <AddToCartButtonShopify
            eventParams={{ items: [eventItem] }}
            productID={productID}
            quantity={quantity.value}
            variant={variant}
          />
        )}
        {platform === "nuvemshop" && (
          <AddToCartButtonNuvemshop
            productGroupID={productGroupID}
            eventParams={{ items: [eventItem] }}
            additionalProperty={additionalProperty}
            quantity={quantity.value}
            variant={variant}
          />
        )}
      </div>
    </div>
  );
}
