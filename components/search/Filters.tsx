import Avatar from "../../components/ui/Avatar.tsx";
import ClearSearchFilters from "deco-sites/todo-livro/islands/ClearSearchFilters.tsx";
import { formatPrice } from "../../sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import Icon from "deco-sites/todo-livro/components/ui/Icon.tsx";

interface Props {
  filters: ProductListingPage["filters"];
  showClearFilters?: boolean;
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  const text = quantity ? `${label} (${quantity})` : label;

  return (
    <a
      href={url}
      rel="nofollow"
      class="flex items-center gap-2 text-sm text-neutral-500 group py-2"
    >
      <div
        aria-checked={selected}
        class="size-6 rounded-[1px] border border-neutral-300 group-hover:border-neutral-400 aria-[checked='true']:bg-success-300 aria-[checked='true']:!border-success-300 transition-colors flex items-center justify-center"
      >
        {selected && <Icon id="Check" size={16} class="text-neutral-100" />}
      </div>
      <span title={text} class="truncate">{text}</span>
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  // const flexDirection = key === "tamanho" || key === "cor"
  //   ? "flex-row"
  //   : "flex-col";

  return (
    <ul class={`flex flex-wrap flex-col`}>
      {values.map((item) => {
        // const { url, selected, value, quantity } = item;

        // if (key === "cor" || key === "tamanho") {
        //   return (
        //     <a href={url} rel="nofollow">
        //       <Avatar
        //         content={value}
        //         variant={selected ? "active" : "default"}
        //       />
        //     </a>
        //   );
        // }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              quantity={0}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters, showClearFilters }: Props) {
  return (
    <div class="flex flex-col pb-4">
      {showClearFilters && <ClearSearchFilters />}
      <ul class="flex flex-col gap-6">
        {filters
          .filter(isToggle)
          .map((filter) => (
            <li>
              <div class="custom-collapse collapse !rounded-none">
                <input
                  type="checkbox"
                  class="min-h-[0] peer"
                  checked
                />
                <div class="collapse-title min-h-[38px] h-[38px] !p-0 !px-4 flex items-center border-b peer-checked:border-b-transparent border-b-neutral-300 transition-all">
                  <strong class="text-neutral-600">{filter.label}</strong>
                  <Icon
                    id="ChevronUp"
                    size={24}
                    strokeWidth={1}
                    class="rotate-180 transition-transform custom-collapse-arrow ml-auto -mr-1"
                  />
                </div>
                <div class="collapse-content !p-0 scrollbar">
                  <div
                    class={`max-h-[240px] overflow-y-auto pl-4 mr-4 scrollbar`}
                  >
                    <FilterValues {...filter} />
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Filters;
