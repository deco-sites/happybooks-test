import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  productID: string;
  quantity?: number;
}

function AddToCartButton(
  { seller, productID, eventParams, variant, quantity = 1 }: Props,
) {
  const { addItems, cart } = useCart();
  const onAddItem = () => {
    const cartItem = cart.value?.items.find(
      (cartItem) => cartItem.id === productID,
    );

    const quantityToAdd = cartItem ? quantity + cartItem.quantity : quantity;

    return addItems({
      orderItems: [{
        id: productID,
        seller: seller,
        quantity: quantityToAdd,
      }],
    });
  };

  return (
    <Button onAddItem={onAddItem} eventParams={eventParams} variant={variant} />
  );
}

export default AddToCartButton;
