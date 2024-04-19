import Icon from "deco-sites/todo-livro/components/ui/Icon.tsx";

function clearFilters() {
  const currentSearch = new URLSearchParams(window.location.search);
  const newUrl = new URL(window.location.pathname, window.location.origin);

  const s = currentSearch.get("s");
  const sort = currentSearch.get("sort");

  s && newUrl.searchParams.set("s", s);
  sort && newUrl.searchParams.set("sort", sort);

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
