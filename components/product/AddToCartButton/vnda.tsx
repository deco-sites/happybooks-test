import { PropertyValue } from "apps/commerce/types.ts";
import { useCart } from "apps/vnda/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  productID: string;
  additionalProperty: PropertyValue[];
  quantity?: number;
}

function AddToCartButton(
  { productID, additionalProperty, eventParams, variant, quantity = 1 }: Props,
) {
  const { addItem } = useCart();
  const onAddItem = () =>
    addItem({
      quantity,
      itemId: productID,
      attributes: Object.fromEntries(
        additionalProperty.map(({ name, value }) => [name, value]),
      ),
    });

  return (
    <Button onAddItem={onAddItem} eventParams={eventParams} variant={variant} />
  );
}

export default AddToCartButton;
