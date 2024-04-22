import Icon from "deco-sites/todo-livro/components/ui/Icon.tsx";
import { headerHeight } from "./constants.tsx";
import { Navigation } from "deco-sites/todo-livro/components/header/Header.tsx";

function NavItemColumn(
  { column }: { column: Navigation["navItems"][number]["columns"][number] },
) {
  return (
    <div class="flex flex-col gap-[14px]">
      {column.items?.map((item) => (
        <li class="flex">
          <a
            href={item.url}
            data-highlight={item.highlight ? "true" : undefined}
            class="text-sm text-neutral-700 hover:font-bold transition-all text-nowrap data-[highlight='true']:font-bold  data-[highlight='true']:underline"
          >
            {item.name}
          </a>
        </li>
      ))}
    </div>
  );
}

function NavItem({ item }: { item: Navigation["navItems"][number] }) {
  const { url, name, columns } = item;

  const hasChildren = Boolean(
    columns[0]?.items?.length || columns[1]?.items?.length,
  );

  const label = (
    <>
      <div class="text-neutral-700 flex items-center gap-[5px] flex-1 cursor-pointer">
        <span class="text-sm transition-all">{name}</span>
        {hasChildren && (
          <Icon
            id="ChevronDown"
            size={16}
            class="group-hover:rotate-180 transition-all"
          />
        )}
      </div>

      <div class="rounded-full w-full -translate-x-[7px] bg-primary-500 transition-all opacity-0 group-hover:opacity-100 h-2 scale-0 group-hover:scale-100" />
    </>
  );

  if (!hasChildren) {
    if (url) {
      return <a class="h-full flex flex-col group" href={url}>{label}</a>;
    }

    return <div class="h-full flex flex-col group">{label}</div>;
  }

  return (
    <div class="dropdown dropdown-hover h-full flex flex-col group">
      {label}
      <div class="dropdown-content min-w-[138px] top-full left-1/2 -translate-x-1/2 bg-base-100 rounded-b-[20px] pt-[18px] pb-7 shadow-[0px_42px_12px_0px_rgba(0,0,0,0.00),0px_27px_11px_0px_rgba(0,0,0,0.01),0px_15px_9px_0px_rgba(0,0,0,0.05),0px_7px_7px_0px_rgba(0,0,0,0.09),0px_2px_4px_0px_rgba(0,0,0,0.10),0px_0px_0px_0px_rgba(0,0,0,0.10)]">
        <ul
          class={`px-6 mr-1 max-h-[316px] flex gap-8 overflow-y-auto overflow-x-hidden scrollbar`}
        >
          {!!columns[0]?.items?.length && <NavItemColumn column={columns[0]} />}
          {!!columns[1]?.items?.length && <NavItemColumn column={columns[1]} />}
        </ul>
      </div>
    </div>
  );

  // return (
  //   <li class="group flex items-center">
  //     <a href={url} class="">
  //       <span class="group-hover:underline text-xs font-thin">
  //         {name}
  //       </span>
  //     </a>

  //     {children && children.length > 0 &&
  //       (
  //         <div
  //           class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 w-screen"
  //           style={{ top: "0px", left: "0px", marginTop: headerHeight }}
  //         >
  //           <ul class="flex items-start justify-center gap-6">
  //             {children.map((node) => (
  //               <li class="p-6">
  //                 <a class="hover:underline" href={node.url}>
  //                   <span>{node.name}</span>
  //                 </a>
  //               </li>
  //             ))}
  //           </ul>
  //         </div>
  //       )}
  //   </li>
  // );
}

export default NavItem;
