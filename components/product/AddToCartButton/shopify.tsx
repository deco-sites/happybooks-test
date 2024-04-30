import { useCart } from "apps/shopify/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export type Props = Omit<BtnProps, "onAddItem"> & {
  productID: string;
  quantity?: number;
};

function AddToCartButton(
  { productID, eventParams, variant, quantity = 1 }: Props,
) {
  const { addItems } = useCart();
  const onAddItem = () =>
    addItems({
      lines: {
        quantity,
        merchandiseId: productID,
      },
    });

  return (
    <Button onAddItem={onAddItem} eventParams={eventParams} variant={variant} />
  );
}

export default AddToCartButton;
