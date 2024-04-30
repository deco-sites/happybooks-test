import { useCart } from "apps/linx/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export type Props = Omit<BtnProps, "onAddItem"> & {
  productID: string;
  productGroupID: string;
  quantity?: number;
};

function AddToCartButton(
  { productGroupID, productID, eventParams, variant, quantity = 1 }: Props,
) {
  const { addItem } = useCart();

  return (
    <Button
      eventParams={eventParams}
      variant={variant}
      onAddItem={() =>
        addItem({
          ProductID: productGroupID,
          SkuID: productID,
          Quantity: quantity,
        })}
    />
  );
}

export default AddToCartButton;
