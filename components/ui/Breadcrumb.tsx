import type { BreadcrumbList } from "apps/commerce/types.ts";
import Icon from "deco-sites/todo-livro/components/ui/Icon.tsx";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = itemListElement;

  return (
    <div class="w-full bg-neutral-200 text-neutral-400 py-2 text-sm mt-4">
      <ul class="flex gap-2 items-center max-w-container mx-2 container:mx-auto">
        <li>
          <a href="/" class="flex items-center gap-1">
            <Icon id="House" size={16} />
            Home
          </a>
        </li>
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }) => (
            <li class="flex items-center gap-2 before:content-['/'] last:text-secondary-400 last:font-bold">
              <a href={item}>
                {name}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );

  // return (
  //   <div class="breadcrumbs">
  //     <ul>
  //       {items
  //         .filter(({ name, item }) => name && item)
  //         .map(({ name, item }) => (
  //           <li>
  //             <a href={item}>{name}</a>
  //           </li>
  //         ))}
  //     </ul>
  //   </div>
  // );
}

export default Breadcrumb;
