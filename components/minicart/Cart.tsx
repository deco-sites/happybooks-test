// import { platform } from "../../apps/storefront.ts";
import { lazy } from "preact/compat";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { Props as VTEXCartProps } from "./vtex/Cart.tsx";

const CartVTEX = lazy(() => import("./vtex/Cart.tsx"));
const CartVNDA = lazy(() => import("./vnda/Cart.tsx"));
const CartWake = lazy(() => import("./wake/Cart.tsx"));
const CartLinx = lazy(() => import("./linx/Cart.tsx"));
const CartShopify = lazy(() => import("./shopify/Cart.tsx"));
const CartNuvemshop = lazy(() => import("./nuvemshop/Cart.tsx"));

export interface Props extends VTEXCartProps {
  platform: ReturnType<typeof usePlatform>;
}

function Cart({ platform, ...props }: Props) {
  if (platform === "vtex") {
    return <CartVTEX {...props} />;
  }

  if (platform === "vnda") {
    return <CartVNDA />;
  }

  if (platform === "wake") {
    return <CartWake />;
  }

  if (platform === "linx") {
    return <CartLinx />;
  }

  if (platform === "shopify") {
    return <CartShopify />;
  }

  if (platform === "nuvemshop") {
    return <CartNuvemshop />;
  }

  return null;
}

export default Cart;
