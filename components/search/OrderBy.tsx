import Icon from "deco-sites/todo-livro/components/ui/Icon.tsx";

const OPTIONS = [
  {
    label: "Mais Vendidos",
    value: "orders:desc",
  },
  {
    label: "Mais Recentes",
    value: "release:desc",
  },
  {
    label: "Descontos",
    value: "discount:desc",
  },
  {
    label: "Maior Preço",
    value: "price:desc",
  },
  {
    label: "Menor Preço",
    value: "price:asc",
  },
  {
    label: "De A a Z",
    value: "name:asc",
  },
  {
    label: "De Z a A",
    value: "name:desc",
  },
  // {
  //   label: "Relevância",
  //   value: "relevance:desc",
  // },
];

export interface Props {
  url: string;
}

export default function OrderBy({ url: urlStr }: Props) {
  const url = new URL(urlStr);

  const sortValue = url.searchParams.get("sort");
  const foundOption = OPTIONS.find((option) => option.value === sortValue) ??
    null;
  // OPTIONS[0];

  return (
    <div class="flex">
      <label
        htmlFor="order-by"
        class="group relative h-[36px] w-[174px] flex items-center justify-center border border-secondary-100 bg-secondary-100 text-neutral-600 rounded-full select-none text-sm hover:border-success-300 hover:bg-neutral-100 transition-colors cursor-pointer"
      >
        <input type="checkbox" id="order-by" class="hidden" />
        <div class="flex items-center gap-2">
          <strong>
            {foundOption?.label ?? "Ordenar por"}
          </strong>
          <Icon
            class=""
            id="ChevronDown"
            size={16}
          />
        </div>
        <div class="flex flex-col items-center opacity-0 invisible group-has-[input:checked]:opacity-100 group-has-[input:checked]:visible absolute -top-[1px] -left-[1px] border border-success-300 rounded-[20px] transition-all w-[calc(100%+2px)] z-20 bg-neutral-100 text-neutral-400 pb-2.5 cursor-default">
          <div class="flex items-center gap-2 h-[36px] mb-1 mx-3.5 border-b border-b-neutral-200">
            <strong>Ordenar por</strong>
            <Icon
              class="text-neutral-600"
              id="ChevronUp"
              size={16}
            />
          </div>
          <ul class="flex flex-col w-full">
            {OPTIONS.map(({ value, label }) => {
              url.searchParams.set("sort", value);

              return (
                <li class="hover:font-bold transition-all text-center w-full">
                  <a href={url.toString()} class="block py-1 w-full">{label}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </label>
    </div>
  );

  // return (
  //   <div class="group/order-by flex flex-col justify-between lg:gap-4 md:flex-row">
  //     <div>
  //       <h3 class="flex items-center gap-5 text-sm text-neutral-600 font-bold">
  //         {foundOption?.label ?? "Ordenar por"}{" "}
  //         <Icon
  //           class=""
  //           id="ChevronDown"
  //           size={12}
  //         />
  //       </h3>
  //       <ul class="flex flex-col gap-4 absolute z-20 bg-neutral-200 p-4 duration-150 opacity-0 invisible group-hover/order-by:visible group-hover/order-by:opacity-100">
  //         {OPTIONS.map(({ value, label }) => {
  //           url.searchParams.set("sort", value);

  //           return (
  //             <li class="text-sm text-neutral-600 hover:font-bold">
  //               <a href={url.toString()}>{label}</a>
  //             </li>
  //           );
  //         })}
  //       </ul>
  //     </div>
  //   </div>
  // );
}
