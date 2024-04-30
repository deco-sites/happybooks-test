import { useCart } from "apps/nuvemshop/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";
import { PropertyValue } from "apps/commerce/types.ts";

export interface Props extends Omit<BtnProps, "onAddItem" | "platform"> {
  additionalProperty: PropertyValue[];
  productGroupID: string;
  quantity?: number;
}

function AddToCartButton({ quantity = 1, ...props }: Props) {
  const { addItems } = useCart();
  const onAddItem = () =>
    addItems({
      quantity,
      itemId: Number(props.productGroupID),
      add_to_cart_enhanced: "1",
      attributes: props.additionalProperty
        ? Object.fromEntries(
          props.additionalProperty?.map(({ name, value }) => [name, value]),
        )
        : undefined,
    });

  return <Button onAddItem={onAddItem} {...props} />;
}

export default AddToCartButton;
