import { ImageWidget } from "apps/admin/widgets.ts";
import SectionTitle from "deco-sites/todo-livro/components/footer/SectionTitle.tsx";
import Image from "apps/website/components/Image.tsx";

/** @title {{name}} */
export interface DeliveryOption {
  name: string;
  image: ImageWidget;
  width?: number;
  height?: number;
}

function DeliveryOptions({ items }: { items?: DeliveryOption[] }) {
  return (
    <>
      {items && items.length > 0 && (
        <div class="flex items-center flex-wrap md:flex-nowrap gap-2 md:gap-2.5 pl-2 pr-1 md:px-4 bg-neutral-100 rounded-[10px] py-0.5">
          <SectionTitle>Formas de entrega</SectionTitle>
          <ul class="flex items-center justify-between flex-wrap gap-2 md:gap-2.5 ">
            {items.map((item) => {
              return (
                <li
                  class="grayscale"
                  title={item.name}
                >
                  <Image
                    src={item.image}
                    class="object-cover"
                    width={item.width ?? 67}
                    height={item.height ?? 46}
                    style={{
                      width: item.width ?? 67,
                      height: item.height ?? 46,
                    }}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                  />
                  {
                    /* <img
                    src={item.image}
                    class="!w-[unset] !h-[unset] object-contain"
                    width={124}
                    height={31}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                  /> */
                  }
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default DeliveryOptions;
