import { usePlatform } from "deco-sites/happybooks-test/sdk/usePlatform.tsx";
import { AnalyticsItem } from "apps/commerce/types.ts";
import ProductActionVTEX from "$islands/ProductActions/vtex.tsx";

export interface Props {
  variant?: "plp" | "pdp";
  quantitySelector?: boolean;
  productID: string;
  seller: string;
  eventItem: AnalyticsItem;
}

export default function ProductActions(props: Props) {
  const platform = usePlatform();

  if (platform === "vtex") {
    return (
      <ProductActionVTEX
        {...props}
      />
    );
  }

  return null;
}
