import type { Props as MenuProps } from "../../components/header/Menu.tsx";
import Cart from "../../components/minicart/Cart.tsx";
import Button from "../../components/ui/Button.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { useUI } from "../../sdk/useUI.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";
import type { Props as VTEXCartProps } from "$store/components/minicart/vtex/Cart.tsx";

const Menu = lazy(() => import("../../components/header/Menu.tsx"));

export interface Props {
  menu: MenuProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
}

const Aside = (
  { title, onClose, children, class: _class }: {
    title?: string;
    onClose?: () => void;
    children: ComponentChildren;
    class?: string;
  },
) => (
  <div
    class={`bg-base-100 grid grid-rows-[auto_1fr] h-full divide-y max-w-[100vw] ${_class}`}
  >
    <div class="flex justify-between items-center">
      {title && (
        <h2 class="px-4 py-3">
          <span class="font-medium text-2xl">{title}</span>
        </h2>
      )}
      {onClose && (
        <Button aria-label="X" class="btn btn-ghost" onClick={onClose}>
          <Icon id="XMark" size={24} strokeWidth={2} />
        </Button>
      )}
    </div>
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

export type CartDrawerProps =
  & Pick<Props, "platform" | "children">
  & VTEXCartProps;

export function CartDrawer(
  { children, ...props }: CartDrawerProps,
) {
  const { displayCart } = useUI();

  return (
    <Drawer // right drawer
      class="drawer-end"
      open={displayCart.value !== false}
      onClose={() => displayCart.value = false}
      aside={
        <Aside // title="Minha sacola"
         // onClose={() => displayCart.value = false}
        class="!bg-transparent pt-12 lg:pt-[30px] group-data-[micro-header='true']/header:!pt-0 transition-all">
          <Cart {...props} />
        </Aside>
      }
    >
      {children}
    </Drawer>
  );
}

export type MenuDrawerProps = Pick<Props, "menu" | "children">;

export function MenuDrawer(
  { menu, children }: MenuDrawerProps,
) {
  const { displayMenu } = useUI();

  return (
    <Drawer // left drawer
      open={displayMenu.value}
      onClose={() => {
        displayMenu.value = false;
      }}
      aside={
        <Aside // onClose={() => {
         //   displayMenu.value = false;
        // }}
        // title={displayMenu.value ? "Menu" : "Buscar"}
        class="relative !bg-transparent !max-w-[440px] w-full !block">
          {displayMenu.value && <Menu {...menu} />}
        </Aside>
      }
    >
      {children}
    </Drawer>
  );
}
