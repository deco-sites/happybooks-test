export interface TotalPagesSelectorProps {
  recordsPerPage?: number;
  url: string;
}

function getUrl(value: number, currentURL: string) {
  const urlObj = new URL(currentURL);
  urlObj.searchParams.set("PS", String(value));
  return urlObj.toString();
}

function SelectorItem(
  { value, recordsPerPage, url }: { value: number } & TotalPagesSelectorProps,
) {
  return (
    <a
      href={recordsPerPage !== value ? getUrl(value, url) : undefined}
      class="h-6 px-3 flex items-center justify-center -translate-y-[1px]"
    >
      {value}
    </a>
  );
}

function TotalPagesSelector(props: TotalPagesSelectorProps) {
  const { recordsPerPage = 24 } = props;

  return (
    <div class="flex gap-2 items-center text-neutral-400 text-sm font-bold">
      <span>Exibir</span>
      <div class="group relative h-6 px-3 flex items-center justify-center border border-neutral-400 text-neutral-600 rounded-[2px]">
        <span>{recordsPerPage}</span>
        <div class="opacity-0 invisible group-hover:opacity-100 group-hover:visible !p-0 absolute -top-[1px] -left-[1px] border border-neutral-400 rounded-[2px] transition-all w-[calc(100%+2px)] flex flex-col z-[1] bg-neutral-100">
          <SelectorItem value={24} {...props} />
          <SelectorItem value={48} {...props} />
          <SelectorItem value={96} {...props} />
        </div>
      </div>
      <span>por páginas</span>
    </div>
  );
}

export default TotalPagesSelector;
