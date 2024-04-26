import Icon from "deco-sites/todo-livro/components/ui/Icon.tsx";

function clearFilters() {
  const currentSearch = new URLSearchParams(window.location.search);
  const newUrl = new URL(window.location.pathname, window.location.origin);

  const q = currentSearch.get("q");
  const sort = currentSearch.get("sort");
  const ps = currentSearch.get("PS");

  q && newUrl.searchParams.set("q", q);
  sort && newUrl.searchParams.set("sort", sort);
  ps && newUrl.searchParams.set("PS", ps);

  window.location.href = newUrl.toString();
}

function ClearSearchFilters() {
  return (
    <button
      class="text-secondary-400 flex items-center gap-1 mx-auto mb-4 text-xs"
      onClick={clearFilters}
    >
      <span class="underline">Limpar todos os filtros</span>
      <Icon id="Close" size={16} />
    </button>
  );
}

export default ClearSearchFilters;
