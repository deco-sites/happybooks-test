import { SendEventOnView } from "../../components/Analytics.tsx";
import OutOfStock from "../../islands/OutOfStock.tsx";
import AddToCartButtonLinx from "../../islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "../../islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "../../islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "../../islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "../../islands/AddToCartButton/wake.tsx";
import AddToCartButtonNuvemshop from "../../islands/AddToCartButton/nuvemshop.tsx";
import ShippingSimulation from "../../islands/ShippingSimulation.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
import WishlistButtonWake from "../../islands/WishlistButton/wake.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import Icon from "deco-sites/todo-livro/components/ui/Icon.tsx";
import AddToCartButton from "$islands/AddToCartButton/AddToCartButton.tsx";
import ProductActions from "deco-sites/todo-livro/components/product/Actions/ProductActions.tsx";
import BenefitsBadges, {
  BenefitBadge,
} from "deco-sites/todo-livro/components/product/BenefitsBadges.tsx";
import ProductTitle from "deco-sites/todo-livro/components/product/ProductTitle.tsx";

interface Props {
  page: ProductDetailsPage | null;
  benefitBadges?: BenefitBadge[];
  layout?: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
  isMobile: boolean;
}

function ProductInfo({ page, layout, benefitBadges, isMobile }: Props) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const {
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
    additionalProperty = [],
  } = product;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const discountPercentage = (listPrice && price)
    ? Math.round(
      ((listPrice - price) / listPrice) * 100,
    )
    : 0;

  const differentials = isVariantOf?.additionalProperty?.find(
    (prop) => prop.name === "Diferenciais",
  )?.value?.replace(/\r\n/g, "\n").split("\n") ?? [];

  return (
    <div class="flex flex-col flex-1" id={id}>
      {/* Code and name */}
      {!isMobile && (
        <ProductTitle
          product={product}
          layoutName={layout?.name}
        />
      )}
      {/* Badges */}
      <div class="mt-4 flex gap-2 flex-wrap">
        <div class="flex items-center px-2.5 h-[26px] rounded-full text-xs font-bold text-neutral-700 bg-tertiary-200">
          Pronta Entrega
        </div>
        <div class="flex items-center px-2.5 h-[26px] rounded-full text-xs font-bold text-neutral-600 bg-secondary-100">
          Frete Grátis
        </div>
        <div class="flex items-center px-2.5 h-[26px] rounded-full text-xs font-bold text-neutral-100 bg-neutral-600">
          Black Friday
        </div>
      </div>
      {/* Wishlist & Reviews */}
      <div class="mt-4 flex flex-row gap-2.5 items-center">
        {platform === "vtex" && (
          <>
            <WishlistButtonVtex
              variant="full"
              productID={productID}
              productGroupID={productGroupID}
            />
            <span class="text-xs text-neutral-400 font-bold">|</span>
          </>
        )}
        {platform === "wake" && (
          <>
            <WishlistButtonWake
              variant="full"
              productID={productID}
              productGroupID={productGroupID}
            />
            <span class="text-xs text-neutral-400 font-bold">|</span>
          </>
        )}
        <div class="flex gap-1 h-4 w-full text-primary-500">
          <Icon size={16} id="Star" />
          <Icon size={16} id="Star" />
          <Icon size={16} id="Star" />
          <Icon size={16} id="Star" />
          <Icon size={16} id="Star" />
          <span class="text-xs text-neutral-400 font-bold">(10)</span>
        </div>
      </div>

      {/* Available */}

      {availability === "https://schema.org/InStock"
        ? (
          <>
            <div class="mt-4 flex items-center gap-4">
              <span class="font-extrabold text-2xl text-success-300">
                {formatPrice(price, offers?.priceCurrency)}
              </span>
              {(listPrice ?? 0) > price && (
                <>
                  <span class="line-through text-neutral-400 text-sm font-bold">
                    {formatPrice(listPrice, offers?.priceCurrency)}
                  </span>
                  <div class="rounded-full bg-primary-400 h-[26px] px-2.5">
                    <span class="text-neutral-600 text-xs font-bold">
                      -{discountPercentage}%
                    </span>
                  </div>
                </>
              )}
            </div>
            {/* Benefits */}
            {!!differentials.length && (
              <div class="mt-4 p-4 w-full rounded-[10px] bg-[#F9F9F9]">
                <ul class="list-disc flex flex-col gap-2.5 pl-4">
                  {differentials.map((differential) => (
                    <li class="list-item font-bold text-neutral-500 text-sm">
                      {differential}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Sku Selector */}
            {
              /* <div class="mt-4 sm:mt-6">
                <ProductSelector product={product} />
              </div> */
            }
            {/* Add to Cart and Favorites button */}
            <div class="mt-4 pb-4 border-b border-b-neutral-200">
              <ProductActions
                eventItem={eventItem}
                productID={productID}
                seller={seller}
                variant="pdp"
                quantitySelector
              />
            </div>
            {!!benefitBadges?.length && (
              <div class="">
                <BenefitsBadges
                  additionalProperty={isVariantOf?.additionalProperty}
                  badges={benefitBadges}
                />
              </div>
            )}
            {/* Shipping Simulation */}
            {platform === "vtex" && (
              <div class="mt-4">
                <ShippingSimulation
                  items={[
                    {
                      id: Number(product.sku),
                      quantity: 1,
                      seller: seller,
                    },
                  ]}
                />
              </div>
            )}
          </>
        )
        : <OutOfStock productID={productID} />}
      {/* Description card */}
      {
        /* <div class="mt-4 sm:mt-6">
        <span class="text-sm">
          {description && (
            <details>
              <summary class="cursor-pointer">Descrição</summary>
              <div
                class="ml-2 mt-2"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </details>
          )}
        </span>
      </div> */
      }
      {/* Analytics Event */}
      <SendEventOnView
        id={id}
        event={{
          name: "view_item",
          params: {
            item_list_id: "product",
            item_list_name: "Product",
            items: [eventItem],
          },
        }}
      />
    </div>
  );
}

export default ProductInfo;
