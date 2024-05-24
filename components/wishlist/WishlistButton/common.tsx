import { useSignal } from "@preact/signals";
import Icon from "../../../components/ui/Icon.tsx";
import Button from "../../../components/ui/Button.tsx";
import { sendEvent } from "../../../sdk/analytics.tsx";
import { clx } from "deco-sites/happybooks-test/sdk/clx.ts";

export interface Props {
  productID: string;
  productGroupID?: string;
  variant?: "icon" | "full";
  removeItem: () => Promise<void>;
  addItem: () => Promise<void>;
  loading: boolean;
  inWishlist: boolean;
  isUserLoggedIn: boolean;
}

function ButtonCommon({
  variant = "icon",
  productGroupID,
  productID,
  loading,
  inWishlist,
  isUserLoggedIn,
  removeItem,
  addItem,
}: Props) {
  const fetching = useSignal(false);

  return (
    <Button
      class={clx(
        "!bg-transparent !border-none !outline-none min-h-[unset] min-w-[unset] w-[unset] h-[unset] !p-0 group !shadow-none",
        variant === "icon" ? "gap-2" : "gap-1",
      )}
      loading={fetching.value}
      aria-label="Add to wishlist"
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!isUserLoggedIn) {
          globalThis.window.alert(
            "Please log in before adding to your wishlist",
          );

          return;
        }

        if (loading) {
          return;
        }

        try {
          fetching.value = true;

          if (inWishlist) {
            await removeItem();
          } else if (productID && productGroupID) {
            await addItem();

            sendEvent({
              name: "add_to_wishlist",
              params: {
                items: [
                  {
                    item_id: productID,
                    item_group_id: productGroupID,
                    quantity: 1,
                  },
                ],
              },
            });
          }
        } finally {
          fetching.value = false;
        }
      }}
    >
      <div class="relative w-7 h-7 min-w-7 min-h-7 bg-neutral-200 rounded-full flex items-center justify-center">
        <Icon
          id="Heart"
          size={14}
          strokeWidth={1}
          class="text-neutral-400"
          fill={inWishlist ? "black" : "none"}
        />
      </div>
      {variant === "icon"
        ? null
        : (
          <span class="text-neutral-400 text-xs font-bold">
            {inWishlist ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
          </span>
        )}
    </Button>
  );
}

export default ButtonCommon;
