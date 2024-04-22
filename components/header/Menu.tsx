import Icon from "../../components/ui/Icon.tsx";
import { Navigation } from "deco-sites/todo-livro/components/header/Header.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import CloseMenuButton from "./Buttons/CloseMenu.tsx";
import Image from "apps/website/components/Image.tsx";
import { clx } from "deco-sites/todo-livro/sdk/clx.ts";
import type { ComponentChildren } from "preact";
import { NAV_LINK_STYLE_DICT } from "deco-sites/todo-livro/components/header/constants.tsx";
import { AlertItem } from "deco-sites/todo-livro/components/header/Alert.tsx";
import ImageOrIcon from "deco-sites/todo-livro/components/ui/ImageOrIcon.tsx";

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export interface Props {
  navigation?: Navigation;
  logo?: Logo;
  alerts?: AlertItem[];
}

interface NavItem {
  name?: string;
  title?: string;
  url?: string;
  children?: NavItem[];
}

function MenuItem(
  { item, children: titleChildren, level, showSeeAll = true }: {
    level: number;
    item: NavItem;
    children?: ComponentChildren;
    showSeeAll?: boolean;
  },
) {
  const hasChildren = Boolean(item.children?.length);

  const name = item.name ?? item.title;

  const titleContent = (
    <div
      class={clx(
        "p-0 flex items-center pr-4 h-12 min-h-12 text-sm text-neutral-700",
        hasChildren && "collapse-title",
      )}
      style={{
        paddingLeft: `${level}rem`,
      }}
    >
      {titleChildren ?? <span>{name}</span>}
      {hasChildren && (
        <Icon
          id="ChevronUp"
          size={24}
          strokeWidth={1}
          class="rotate-180 transition-transform custom-collapse-arrow ml-auto"
        />
      )}
    </div>
  );

  return (
    <div
      class={clx(
        "custom-collapse w-full group",
        hasChildren && "collapse",
      )}
    >
      {hasChildren && <input type="checkbox" class="min-h-[0]" />}
      {hasChildren ? titleContent : (
        <a
          href={item.url}
        >
          {titleContent}
        </a>
      )}
      {hasChildren && (
        <div class="collapse-content p-0">
          <ul class="flex flex-col gap-[1px]">
            {showSeeAll && (
              <li
                class="bg-neutral-200"
                style={{
                  paddingLeft: `${level + 1}rem`,
                }}
              >
                <a
                  href={item.url}
                  class="flex items-center h-12 font-bold text-sm text-neutral-700"
                >
                  Ver tudo em {name}
                </a>
              </li>
            )}
            {item.children?.map((node) => (
              <li class="bg-neutral-200">
                <MenuItem item={node} level={level + 1} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Menu({ navigation, logo, alerts }: Props) {
  return (
    <div class="flex flex-col h-full bg-neutral-100 w-full max-h-screen overflow-auto">
      <div class="flex items-center justify-between pl-6">
        {logo && (
          <Image
            class="object-contain"
            src={logo.src}
            alt={logo.alt}
            width={120}
            height={24}
          />
        )}
        <CloseMenuButton />
      </div>
      <a
        href="/login"
        class="flex h-12 min-h-12 items-center px-4 gap-2 text-neutral-100 bg-secondary-400 text-sm"
      >
        <Icon id="User" width={20} height={25} class="text-success-300" />
        <span>
          <strong>Entre</strong>
          <span>{" "}ou{" "}</span>
          <strong>Cadastre-se</strong>
        </span>
      </a>
      <ul class="flex-grow flex flex-col divide-y divide-base-200">
        {!!navigation?.categories?.length && (
          <li>
            <MenuItem
              showSeeAll={false}
              level={1}
              item={{
                children: navigation.categories.flatMap((col) => col.items),
                name: "",
                url: "",
              }}
            >
              <div class="text-secondary-400 flex items-center gap-2">
                <Icon id="Hamburger" size={14} />
                <span class="text-sm font-bold">Categorias</span>
              </div>
            </MenuItem>
          </li>
        )}
        {navigation?.navItems.map((item) => (
          <li class="border-b border-b-neutral-200 last:border-b-transparent">
            <MenuItem
              level={1}
              item={{
                name: item.name,
                url: item.url,
                children: item.columns.flatMap((col) => col.items ?? []),
              }}
            />
          </li>
        ))}
      </ul>
      <a
        href="/wishlist"
        class="flex h-12 min-h-12 items-center px-4 gap-2 text-neutral-100 bg-secondary-400 text-sm mb-[1px]"
      >
        <Icon id="Heart" size={21} class="text-success-300" />
        <strong>
          Meus Favoritos
        </strong>
      </a>
      <a
        href="/account"
        class="flex h-12 min-h-12 items-center px-4 gap-2 text-neutral-100 bg-secondary-400 text-sm mb-[1px]"
      >
        <strong>
          Minha Conta
        </strong>
      </a>
      <a
        href="/account/orders"
        class="flex h-12 min-h-12 items-center px-4 gap-2 text-neutral-100 bg-secondary-400 text-sm mb-[1px]"
      >
        <strong>
          Meus Pedidos
        </strong>
      </a>

      <ul class="flex-grow flex flex-col divide-y divide-transparent">
        {navigation?.links.map((item) => (
          <li class="border-b border-b-neutral-200 last:border-b-transparent">
            <a
              href={item.url}
              class={clx(
                "flex h-12 min-h-12 items-center px-4 gap-2 text-neutral-600 text-sm font-bold",
                NAV_LINK_STYLE_DICT[item.style],
              )}
            >
              {item.name}
            </a>
          </li>
        ))}
        {alerts?.map((alert) => (
          <li class="border-b border-b-neutral-200 last:border-b-transparent">
            <a
              href={alert.href}
              class="flex h-12 min-h-12 items-center px-4 gap-2 text-neutral-100 bg-secondary-200 text-sm font-bold"
            >
              {alert.icon &&
                (
                  <ImageOrIcon
                    width={16}
                    height={16}
                    {...alert.icon}
                    loading="lazy"
                    class={alert.icon.image ? "brightness-[10]" : undefined}
                    alt={alert.text}
                  />
                )}
              {alert.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
