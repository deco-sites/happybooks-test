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
    <div class="group/order-by flex flex-col justify-between lg:gap-4 md:flex-row">
      <div>
        <h3 class="flex items-center gap-5 text-sm text-neutral-600 font-bold">
          {foundOption?.label ?? "Ordenar por"}{" "}
          <Icon
            class=""
            id="ChevronDown"
            size={12}
          />
        </h3>
        <ul class="flex flex-col gap-4 absolute z-20 bg-neutral-200 p-4 duration-150 opacity-0 invisible group-hover/order-by:visible group-hover/order-by:opacity-100">
          {OPTIONS.map(({ value, label }) => {
            url.searchParams.set("sort", value);

            return (
              <li class="text-sm text-neutral-600 hover:font-bold">
                <a href={url.toString()}>{label}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
