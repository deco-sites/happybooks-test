import { ImageWidget } from "apps/admin/widgets.ts";
import SectionTitle from "$store/components/footer/SectionTitle.tsx";
import Image from "apps/website/components/Image.tsx";

/** @title {{name}} */
export interface SecurityItem {
  name: string;
  image: ImageWidget;
  href?: string;
  width?: number;
  height?: number;
}

function Security({ items }: { items?: SecurityItem[] }) {
  return (
    <>
      {items && items.length > 0 && (
        <div class="flex flex-col gap-4">
          <SectionTitle>Segurança</SectionTitle>
          <ul class="flex justify-between gap-x-4 gap-y-2 flex-wrap py-2 px-4 rounded-[10px] bg-neutral-100 items-center">
            {items.map((item) => {
              const img = (
                <Image
                  src={item.image}
                  class="object-contain"
                  width={item.width ?? 53}
                  height={item.height ?? 53}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                />
              );

              if (item.href) {
                return (
                  <li
                    class="grayscale"
                    title={item.name}
                  >
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex"
                    >
                      {img}
                    </a>
                  </li>
                );
              }

              return (
                <li
                  class="grayscale"
                  title={item.name}
                >
                  {img}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default Security;
