import ImageOrIcon, {
  ImageOrIconType,
} from "$store/components/ui/ImageOrIcon.tsx";

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
    <div class="flex flex-col items-center">
      {title && <h4 class="text-lg text-neutral-700 mb-4">{title}</h4>}
      <ul class="flex gap-3.5">
        {items.map((item) => {
          return (
            <li>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.name} Logo`}
                class="flex text-neutral-500"
              >
                <ImageOrIcon
                  alt={item.name}
                  width={30}
                  // optimize
                  height={30}
                  {...item.image}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
