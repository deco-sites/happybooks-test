import { AnalyticsItem } from "apps/commerce/types.ts";
import Button from "../../../../components/ui/Button.tsx";
import Icon from "../../../../components/ui/Icon.tsx";
import { sendEvent } from "../../../../sdk/analytics.tsx";
import { useUI } from "../../../../sdk/useUI.ts";

interface Props {
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
}

function CartButton({ loading, currency, total, items }: Props) {
  const { displayCart } = useUI();
  const totalItems = items.length;

  const onClick = () => {
    sendEvent({
      name: "view_cart",
      params: { currency, value: total, items },
    });
    displayCart.value = true;
  };

  return (
    <div class="indicator self-center">
      {
        /* <span
        class={`lg:hidden indicator-item badge badge-secondary badge-sm ${
          totalItems === 0 ? "hidden" : ""
        }`}
      >
        {totalItems > 9 ? "9+" : totalItems}
      </span> */
      }

      <Button
        class="rounded-full p-0 max-md:disabled:bg-transparent md:px-4 h-[35px] min-h-[35px] flex md:bg-success-300 md:hover:bg-success-400 gap-1.5 md:gap-1 md:text-neutral-100 text-success-300 transition-colors items-center min-w-[58px] md:min-w-[156px]"
        aria-label="open cart"
        data-deco={displayCart.value && "open-cart"}
        loading={loading}
        onClick={onClick}
      >
        <Icon
          id="OpenBook"
          size={19}
          strokeWidth={0}
          class="size-[30px] md:size-[19px]"
        />
        <span class="block text-sm font-bold">
          {/* Meus Livros ({totalItems}) */}
          <span class="hidden md:inline">Meus Livros{" "}</span>
          ({totalItems > 9 ? "9+" : totalItems})
        </span>
      </Button>
    </div>
  );
}

export default CartButton;
