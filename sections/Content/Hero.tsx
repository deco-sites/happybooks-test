import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface CTA {
  id?: string;
  href: string;
  text: string;
  variant: "Normal" | "Reverse";
}

export interface Props {
  /**
   * @format html
   */
  title: string;

  /**
   * @format textarea
   */
  description: string;
  image?: ImageWidget;
  placement: "left" | "right";
  cta: CTA[];
}

const PLACEMENT = {
  left: "flex-col text-left lg:flex-row-reverse",
  right: "flex-col text-left lg:flex-row",
};

export default function HeroFlats({
  title = "Hero",
  description = "Your description here",
  image,
  placement,
  cta,
}: Props) {
  return (
    <div class="w-full max-w-container pb-8 md:mb-11 px-2 lg:px-0 mx-auto flex flex-col gap-8 relative">
      <div class="flex flex-col md:flex-row gap-4 md:gap-5 md:items-end">
        {image && (
          <Image
            width={374}
            height={335}
            class="w-full lg:w-[507px] max-w-[507px] object-fit hover:brightness-125 transition"
            sizes="(max-width: 640px) 100vw, 30vw"
            src={image}
            alt={image}
            decoding="async"
            loading="lazy"
          />
        )}
        <div
          class={`md:mx-2 w-full lg:flex-1 gap-2 flex flex-col justify-end`}
        >
          <div
            class="inline-block text-[32px] text-center md:text-right font-extrabold text-neutral-100 md:text-neutral-700"
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          >
          </div>

          <p
            class="text-neutral-100 md:text-neutral-700 text-base text-center md:text-right"
            dangerouslySetInnerHTML={{
              __html: description.replace(/\n/g, "<br>"),
            }}
          />
          <div class="flex flex-col items-center lg:items-start justify-end lg:flex-row gap-4">
            {cta?.map((item) => (
              <a
                key={item?.id}
                id={item?.id}
                href={item?.href}
                target={item?.href.includes("http") ? "_blank" : "_self"}
                class={`group relative overflow-hidden rounded-full hover:bg-neutral-600 transition-all ease-out flex items-center justify-center px-7 h-[42px] text-neutral-100 bg-neutral-400`}
              >
                <span class="relative font-extrabold">
                  {item?.text}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div class="md:hidden bottom-0 top-[37%] left-0 right-0 bg-secondary-400 absolute -z-[1]" />
    </div>
  );
}
