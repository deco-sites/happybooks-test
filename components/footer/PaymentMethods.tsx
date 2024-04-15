import Icon from "$store/components/ui/Icon.tsx";
import SectionTitle from "deco-sites/todo-livro/components/footer/SectionTitle.tsx";
import ImageOrIcon, {
  ImageOrIconType,
} from "deco-sites/todo-livro/components/ui/ImageOrIcon.tsx";

/** @title {{ name }} */
export interface PaymentItem {
  name: string;
  image: ImageOrIconType;
}

export default function PaymentMethods(
  { content }: { content?: { title?: string; items?: PaymentItem[] } },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col md:flex-row md:items-center gap-2.5 py-2.5 px-5 md:pl-10 md:pr-6 bg-neutral-100 rounded-[10px]">
          {content.title && <SectionTitle>{content.title}</SectionTitle>}
          <ul class="flex items-center justify-center md:justify-between flex-wrap gap-x-8 gap-y-2">
            {content.items.map((item) => {
              return (
                <li
                  class=""
                  title={item.name}
                >
                  <ImageOrIcon
                    class="!w-auto"
                    width={40}
                    height={25}
                    alt={item.name}
                    {...item.image}
                    loading="lazy"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
