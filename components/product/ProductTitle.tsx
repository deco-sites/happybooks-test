import { Product } from "apps/commerce/types.ts";

function ProductTitle(
  { product, layoutName }: {
    product: Product;
    layoutName?: "concat" | "productGroup" | "product";
  },
) {
  const { gtin, isVariantOf, name } = product;

  return (
    <div class="flex flex-col gap-2">
      <h1>
        <span class="font-bold text-2xl capitalize text-neutral-700 line-clamp-2">
          {layoutName === "concat"
            ? `${isVariantOf?.name} ${name}`
            : layoutName === "productGroup"
            ? isVariantOf?.name
            : name}
        </span>
      </h1>
      {gtin && (
        <span class="text-neutral-400 mt-2">
          <strong>Cód.:</strong> {gtin}
        </span>
      )}
    </div>
  );
}

export default ProductTitle;
