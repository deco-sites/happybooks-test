import { useCart } from "apps/wake/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  productID: string;
  quantity?: number;
}

function AddToCartButton(
  { productID, eventParams, variant, quantity = 1 }: Props,
) {
  const { addItem } = useCart();
  const onAddItem = () =>
    addItem({
      productVariantId: Number(productID),
      quantity,
    });

  return (
    <Button onAddItem={onAddItem} eventParams={eventParams} variant={variant} />
  );
}

export default AddToCartButton;
