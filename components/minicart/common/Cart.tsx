import { AnalyticsItem } from "apps/commerce/types.ts";
import Button from "../../../components/ui/Button.tsx";
import { sendEvent } from "../../../sdk/analytics.tsx";
import { formatPrice } from "../../../sdk/format.ts";
import { useUI } from "../../../sdk/useUI.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import Coupon, { Props as CouponProps } from "./Coupon.tsx";
import Icon from "deco-sites/todo-livro/components/ui/Icon.tsx";
import FreeShippingProgressBar from "$store/components/header/FreeShippingProgressBar/common.tsx";

interface Props {
  items: Item[];
  loading: boolean;
  total: number;
  subtotal: number;
  discounts: number;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget: number;
  checkoutHref: string;
  onAddCoupon?: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
}

function Cart({
  items,
  total,
  subtotal,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freeShippingTarget,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
}: Props) {
  const { displayCart } = useUI();
  const totalItems = items.length;
  const isEmpty = totalItems === 0;

  return (
    <div
      class="flex flex-col justify-center items-center overflow-hidden bg-base-100 h-screen max-h-[600px] xs:max-h-[750px]"
      style={{
        minWidth: "calc(min(100vw, 415px))",
        maxWidth: "415px",
      }}
    >
      <div class="px-7 w-full">
        <div class="flex justify-between items-center py-4 border-b border-b-neutral-300 w-full">
          <Button
            class="btn-circle bg-base-100 size-[35px] min-h-[35px] min-w-[35px] text-neutral-400 !-translate-x-2"
            onClick={() => {
              displayCart.value = false;
            }}
          >
            <Icon id="XMark" size={32} strokeWidth={2} />
          </Button>

          <Button
            class="rounded-full px-4 h-[35px] min-h-[35px] flex bg-success-300 hover:bg-success-400 gap-1 text-neutral-100 transition-colors items-center min-w-[156px] cursor-default"
            aria-label="open cart"
            loading={loading}
          >
            <Icon id="OpenBook" size={19} strokeWidth={0} />
            <span class="hidden lg:block text-sm font-bold">
              Meus Livros ({totalItems})
            </span>
          </Button>
        </div>
      </div>
      {isEmpty
        ? (
          <div class="flex flex-1 flex-col mt-[50px] justify-center text-neutral-500">
            <div class="flex flex-col gap-2 justify-center items-center">
              <div class="size-[145px] rounded-full flex items-center justify-center bg-neutral-400">
                <Icon
                  id="ShoppingBag"
                  size={60}
                  strokeWidth={0}
                  class="text-neutral-100"
                />
              </div>
              <strong class="font-extrabold text-2xl">
                Sua sacola está vazia!
              </strong>
              <p class="max-w-[252px] text-sm text-center">
                Aproveite os produtos exclusivos que só a Todolivro tem!
              </p>
            </div>
            <Button
              class="btn-outline rounded-full h-[42px] min-h-[42px] w-full max-w-[260px] mt-[152px] mx-auto text-base text-neutral-400 font-extrabold"
              onClick={() => {
                displayCart.value = false;
              }}
            >
              Continuar comprando
            </Button>
          </div>
        )
        : (
          <>
            {/* Free Shipping Bar */}
            <div class="w-full h-12">
              <FreeShippingProgressBar
                total={total}
                locale={locale}
                currency={currency}
                target={freeShippingTarget}
                layout="cart"
              />
            </div>

            {/* Cart Items */}
            <ul
              role="list"
              class="mt-4 pl-4 pr-2 mr-1 flex-grow overflow-y-auto flex flex-col gap-6 w-full"
            >
              {items.map((item, index) => (
                <li
                  key={index}
                  class="py-4 first:pt-0 last:pb-0 border-b border-b-neutral-300 last:border-none"
                >
                  <CartItem
                    item={item}
                    index={index}
                    locale={locale}
                    currency={currency}
                    onUpdateQuantity={onUpdateQuantity}
                    itemToAnalyticsItem={itemToAnalyticsItem}
                  />
                </li>
              ))}
            </ul>

            {/* Cart Footer */}
            <footer class="w-full shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.1)] px-4 py-[3.25rem] rounded-t-[10px] flex flex-col gap-4">
              {/* Subtotal */}
              {/* <div class="border-t border-base-200 py-2 flex flex-col"> */}
              {
                /* {discounts > 0 && (
                  <div class="flex justify-between items-center px-4">
                    <span class="text-sm">Descontos</span>
                    <span class="text-sm">
                      {formatPrice(discounts, currency, locale)}
                    </span>
                  </div>
                )} */
              }
              <div class="w-full flex justify-between text-neutral-600">
                <strong>Subtotal</strong>
                <strong class="font-extrabold">
                  {formatPrice(subtotal, currency, locale)}
                </strong>
              </div>
              {
                /* {onAddCoupon && (
                  <Coupon onAddCoupon={onAddCoupon} coupon={coupon} />
                )} */
              }
              {/* </div> */}

              {/* Total */}
              {
                /* <div class="border-t border-base-200 pt-4 flex flex-col justify-end items-end gap-2 mx-4">
                <div class="flex justify-between items-center w-full">
                  <span>Total</span>
                  <span class="font-medium text-xl">
                    {formatPrice(total, currency, locale)}
                  </span>
                </div>
                <span class="text-sm text-base-300">
                  Taxas e fretes serão calculados no checkout
                </span>
              </div> */
              }

              <div class="flex gap-2">
                <Button
                  class="btn-outline rounded-full h-[42px] min-h-[42px] w-full max-w-[unset] text-base text-neutral-400 font-extrabold flex-1 px-0"
                  onClick={() => {
                    displayCart.value = false;
                  }}
                >
                  Continuar comprando
                </Button>
                <a class="flex w-full flex-1" href={checkoutHref}>
                  <Button
                    data-deco="buy-button"
                    class="rounded-full bg-success-300 hover:bg-success-400 text-neutral-100 font-extrabold h-[42px] min-h-[42px] w-full px-0"
                    disabled={loading || isEmpty}
                    onClick={() => {
                      sendEvent({
                        name: "begin_checkout",
                        params: {
                          coupon,
                          currency,
                          value: total,
                          items: items
                            .map((_, index) => itemToAnalyticsItem(index))
                            .filter((x): x is AnalyticsItem => Boolean(x)),
                        },
                      });
                    }}
                  >
                    Finalizar compra
                  </Button>
                </a>
              </div>
            </footer>
          </>
        )}
    </div>
  );
}

export default Cart;
