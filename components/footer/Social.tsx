import ImageOrIcon, {
  ImageOrIconType,
} from "$store/components/ui/ImageOrIcon.tsx";
import { clx } from "deco-sites/todo-livro/sdk/clx.ts";

/** @title {{ name }} */
export interface SocialItem {
  image: ImageOrIconType;
  name: string;
  link: string;
}

export default function Social(
  { items, title }: {
    title?: string;
    items?: SocialItem[];
  },
) {
  if (!items?.length) return null;

  return (
    <div class="flex flex-col items-center py-5 md:py-0 bg-secondary-400 md:bg-transparent">
      {title && <h4 class="text-lg text-neutral-700 mb-4">{title}</h4>}
      <ul class="flex gap-6 md:gap-3.5">
        {items.map((item) => {
          return (
            <li>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.name} Logo`}
                class="flex text-neutral-100 md:text-neutral-500"
              >
                <ImageOrIcon
                  alt={item.name}
                  width={30}
                  // optimize
                  height={30}
                  {...item.image}
                  class={clx(
                    "md:size-[30px] size-[35px]",
                    item.image.image && "brightness-[10]",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
