import { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import { AppContext } from "deco-sites/todo-livro/apps/site.ts";
import Icon from "deco-sites/todo-livro/components/ui/Icon.tsx";

export interface Props {
  page: ProductDetailsPage | null;
  /**
   * @title Especificações a serem exibidas
   */
  specificationsToShow?: string[];
}

export function loader(props: Props, _req: Request, ctx: AppContext) {
  return { ...props, isMobile: ctx.device !== "desktop" };
}

function ProductDescription({
  page,
  isMobile,
  specificationsToShow,
}: ReturnType<typeof loader>) {
  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { product } = page;
  const { description } = product;
  const propertiesMap = new Map(
    [
      ...(product.additionalProperty ?? []),
      ...(product.isVariantOf?.additionalProperty ?? []),
    ].map((property) => [property.name, property.value]),
  );

  propertiesMap.forEach((value, key) => {
    if (
      specificationsToShow &&
      !specificationsToShow.map((str) => str.toLowerCase()).includes(
        key!.toLowerCase(),
      )
    ) {
      propertiesMap.delete(key);
    }
  });

  if ((!description || description === "") && propertiesMap.size === 0) {
    return null;
  }

  return (
    <div class="w-full max-w-container mx-auto mb-8 lg:mb-14">
      {isMobile
        ? (
          <div>
            <div class="bg-secondary-400 text-neutral-100 flex px-6 items-center font-bold h-12">
              <span>Navegue por:</span>
            </div>
            {description && (
              <div class="collapse rounded-none border-b border-base-300 group">
                <input
                  type="checkbox"
                  name="description_acordeon"
                  class="min-h-0"
                  checked
                />
                <div class="collapse-title min-h-0 px-5 py-[14px] h-auto relative">
                  <h2 class="font-bold">Sobre este livro</h2>
                  <Icon
                    id="ChevronDown"
                    size={24}
                    class="absolute right-5 top-3 group-has-[:checked]:rotate-180 transition-transform"
                  />
                </div>
                <div class="collapse-content px-5 text-neutral-500">
                  {description}
                </div>
              </div>
            )}
            {propertiesMap.size > 0 && (
              <div class="collapse rounded-none border-b border-base-300 group">
                <input
                  type="checkbox"
                  name="description_acordeon"
                  class="min-h-0"
                />
                <div class="collapse-title min-h-0 px-5 py-[14px] h-auto relative">
                  <h2 class="font-bold">Detalhes do Produto</h2>{" "}
                  <Icon
                    id="ChevronDown"
                    size={24}
                    class="absolute right-5 top-3 group-has-[:checked]:rotate-180 transition-transform"
                  />
                </div>
                <div class="collapse-content px-5">
                  <table class="w-full">
                    {Array.from(propertiesMap).map(([key, value]) => (
                      <tr class="">
                        <td class="pr-20 py-1.5 font-bold">
                          {key!.toLowerCase().replace(
                            /(^\w{1})|(\s+\w{1})/g,
                            (letter) => letter.toUpperCase(),
                          )}:
                        </td>
                        <td class="w-full py-1.5">{value}</td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            )}
            <div class="collapse rounded-none border-b border-base-300 group">
              <input
                type="checkbox"
                name="description_acordeon"
                class="min-h-0"
              />
              <div class="collapse-title min-h-0 px-5 py-[14px] h-auto relative">
                <h2 class="font-bold">Avaliações</h2>
                <Icon
                  id="ChevronDown"
                  size={24}
                  class="absolute right-5 top-3 group-has-[:checked]:rotate-180 transition-transform"
                />
              </div>
              <div class="collapse-content px-5">
                <span class="text-neutral-700 text-xl">
                  Avaliações do Produto
                </span>
              </div>
            </div>
          </div>
        )
        : (
          <div class="group">
            <div class="flex justify-center bg-neutral-200 border border-neutral-300 rounded-full gap-24 py-3">
              <div class="flex justify-center">
                <input
                  type="radio"
                  name="description_tabs"
                  id="description"
                  class="hidden peer"
                  checked
                />
                <label
                  htmlFor="description"
                  class="text-lg text-neutral-400 border-b-2 border-solid border-transparent peer-checked:border-success-300 peer-checked:font-bold peer-checked:text-neutral-700 flex items-center justify-center w-full max-w-64 cursor-pointer transition-all select-none"
                >
                  <h2>Sobre este livro</h2>
                </label>
              </div>
              {
                // Only show specification tab if there are properties to show
                propertiesMap.size > 0 && (
                  <div class="flex justify-center">
                    <input
                      type="radio"
                      name="description_tabs"
                      id="specification"
                      class="hidden peer"
                    />
                    <label
                      htmlFor="specification"
                      class="text-lg text-neutral-400 border-b-2 border-solid border-transparent peer-checked:border-success-300 peer-checked:font-bold peer-checked:text-neutral-700 flex items-center justify-center w-full max-w-64 cursor-pointer transition-all select-none"
                    >
                      <h2>Detalhes do Produto</h2>
                    </label>
                  </div>
                )
              }
              <div class="flex justify-center">
                <input
                  type="radio"
                  name="description_tabs"
                  id="reviews"
                  class="hidden peer"
                />
                <label
                  htmlFor="reviews"
                  class="text-lg text-neutral-400 border-b-2 border-solid border-transparent peer-checked:border-success-300 peer-checked:font-bold peer-checked:text-neutral-700 flex items-center justify-center w-full max-w-64 cursor-pointer transition-all select-none"
                >
                  <h2>Avaliações</h2>
                </label>
              </div>
            </div>
            <div class="pt-6">
              <div class="group-has-[#description:checked]:block hidden text-neutral-500 px-8">
                {description}
              </div>
              {
                // Only show specification tab if there are properties to show
                propertiesMap.size > 0 && (
                  <div class="group-has-[#specification:checked]:block hidden px-8">
                    <table class="w-full">
                      {Array.from(propertiesMap).map(([key, value]) => (
                        <tr class="">
                          <td class="pr-20 py-1.5 font-bold">
                            {key!.toLowerCase().replace(
                              /(^\w{1})|(\s+\w{1})/g,
                              (letter) => letter.toUpperCase(),
                            )}:
                          </td>
                          <td class="w-full py-1.5">{value}</td>
                        </tr>
                      ))}
                    </table>
                  </div>
                )
              }
              <div class="group-has-[#reviews:checked]:block hidden text-neutral-500">
                <strong class="text-2xl text-neutral-700">
                  Avaliações do Produto
                </strong>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default ProductDescription;
