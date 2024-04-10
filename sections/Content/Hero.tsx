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
    <div class="w-full max-w-container mb-11 mx-auto flex flex-col gap-8">
      <div class="flex gap-5 md:items-end">
        {image && (
          <Image
            width={374}
            height={335}
            class="w-full lg:w-[507px] object-fit"
            sizes="(max-width: 640px) 100vw, 30vw"
            src={image}
            alt={image}
            decoding="async"
            loading="lazy"
          />
        )}
        <div
          class={`mx-2 w-full lg:flex-1 gap-2 flex flex-col justify-end`}
        >
          <div
            class="inline-block text-[32px] text-right font-extrabold text-neutral-700"
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          >
          </div>

          <p
            class="text-neutral-700 text-base text-right"
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
                class={`group relative overflow-hidden rounded-full hover:bg-gradient-to-r transition-all duration-300 ease-out flex items-center justify-center px-7 h-[42px] text-neutral-100 bg-neutral-400`}
              >
                <span class="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 group-hover:-translate-x-40">
                </span>
                <span class="relative font-extrabold">
                  {item?.text}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
