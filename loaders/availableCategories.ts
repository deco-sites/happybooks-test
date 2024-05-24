import { allowCorsFor } from "deco/mod.ts";
import { AppContext } from "deco-sites/happybooks-test/apps/site.ts";

interface Category {
  id: number;
  name: string;
  children: Category[];
  url: string;
}

interface TransformedCategory {
  value: string;
  label: string;
}

function transformCategories(
  categories: Category[],
  parentName?: string,
): TransformedCategory[] {
  let transformedCategories: TransformedCategory[] = [];

  categories.forEach((category) => {
    const { id, name, children } = category;
    const label = parentName
      ? `${parentName}/${name} (ID: ${id})`
      : `${name} (ID: ${id})`;
    const transformedCategory: TransformedCategory = {
      value: new URL(category.url).pathname,
      label: label,
    };

    transformedCategories.push(transformedCategory);

    if (children.length > 0) {
      transformedCategories = transformedCategories.concat(
        transformCategories(children, name),
      );
    }
  });

  return transformedCategories;
}

// Used to load all available icons that will be used for IconSelect widgets.
export default async function AvailableCategoriesLoader(
  _props: unknown,
  req: Request,
  ctx: AppContext,
) {
  // Allow Cors
  Object.entries(allowCorsFor(req)).map(([name, value]) => {
    ctx.response.headers.set(name, value);
  });

  if (ctx.platform === "vtex") {
    const categoriesRes = await ctx.vtex?.vcs
      ?.["GET /api/catalog_system/pub/category/tree/:categoryLevels"]({
        categoryLevels: 3,
      });

    const data = await categoriesRes?.json();

    console.log({ data });

    if (!data) {
      return [];
    }

    const categoriesMap = transformCategories(data);

    return categoriesMap;
  }

  return [];
}
