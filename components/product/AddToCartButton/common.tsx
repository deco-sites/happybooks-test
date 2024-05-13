import { AddToCartParams } from "apps/commerce/types.ts";
import { useState } from "preact/hooks";
import Button from "../../../components/ui/Button.tsx";
import { sendEvent } from "../../../sdk/analytics.tsx";
import { useUI } from "../../../sdk/useUI.ts";
import { clx } from "deco-sites/todo-livro/sdk/clx.ts";

export interface Props {
  /** @description: sku name */
  eventParams: AddToCartParams;
  onAddItem: () => Promise<void>;
  variant: "plp" | "pdp";
}

const useAddToCart = ({ eventParams, onAddItem }: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      await onAddItem();

      sendEvent({
        name: "add_to_cart",
        params: eventParams,
      });

      displayCart.value = true;
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading, "data-deco": "add-to-cart" };
};

export default function AddToCartButton(props: Props) {
  const btnProps = useAddToCart(props);

  return (
    <Button
      {...btnProps}
      class={clx(
        "w-full !bg-success-300 hover:!bg-success-500 text-neutral-100 font-extrabold !p-0 !border-none !outline-none min-w-[unset] min-h-[42px] h-[42px] rounded-full",
        props.variant === "plp" ? "text-sm sm:text-base" : "text-base",
      )}
    >
      Adicionar ao carrinho
    </Button>
  );
}
