import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import SectionTitle from "deco-sites/happybooks-test/components/footer/SectionTitle.tsx";
import { clx } from "deco-sites/happybooks-test/sdk/clx.ts";

export type Item = { label: string; href: string };

export interface ListSection {
  /** @hide */
  readonly kind: "list";

  desktopMarginRight?: number;
  items?: Item[];
}

export interface TextSection {
  /** @hide */
  readonly kind: "text";

  /** @format html */
  text: string;
}

export type SectionContent = ListSection | TextSection;

/** @title {{title}} */
export interface FooterSection {
  title: string;

  /**
   * @title Tipo
   * @description Tipo de conteúdo
   */
  content: SectionContent;
}

export default function FooterItems(
  { sections, justify = false }: {
    sections: FooterSection[];
    justify: boolean;
  },
) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            // class={`hidden md:flex flex-row gap-6 lg:gap-10 ${
            //   justify && "sm:justify-between"
            // }`}
            class={clx(
              "hidden md:flex md:flex-wrap lg:flex-nowrap md:justify-center lg:justify-normal flex-row gap-6 lg:gap-8",
              justify && "sm:justify-between",
            )}
          >
            {sections.map(({ title, content }) => (
              <li
                style={{
                  marginRight:
                    (content.kind === "list" && content.desktopMarginRight)
                      ? `${content.desktopMarginRight}px`
                      : undefined,
                }}
              >
                <div class="flex flex-col gap-4">
                  <SectionTitle>
                    {title}
                  </SectionTitle>
                  {content.kind === "list"
                    ? (
                      <ul class={`flex flex-col flex-wrap text-sm gap-2`}>
                        {content.items?.map((item) => (
                          <li>
                            <a
                              href={item.href}
                              class="block hover:underline hover:font-bold before-bold transition-all"
                              title={item.label}
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )
                    : (
                      <div
                        class="[&_p]:mb-4 text-sm"
                        dangerouslySetInnerHTML={{ __html: content.text }}
                      />
                    )}
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col md:hidden border-x border-x-transparent bg-neutral-100 divide-y">
            {sections.map(({ title, content }, index) => (
              <li class="">
                <div class="custom-collapse collapse">
                  <input
                    type="checkbox"
                    class="min-h-[0]"
                  />
                  <div class="collapse-title min-h-12 h-12 !p-0 !px-5 flex items-center">
                    <SectionTitle>{title}</SectionTitle>
                    <Icon
                      id="ChevronUp"
                      size={24}
                      strokeWidth={1}
                      class="rotate-180 transition-transform custom-collapse-arrow ml-auto"
                    />
                  </div>
                  <div class="collapse-content !p-0">
                    {content.kind === "list"
                      ? (
                        <ul
                          class={`flex flex-col text-xs text-neutral-500`}
                        >
                          {content.items?.map((item) => (
                            <li>
                              <a
                                href={item.href}
                                class="min-h-12 px-5 flex items-center bg-neutral-200"
                              >
                                {item.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )
                      : (
                        <div
                          class="prose [&_p]:mb-4 text-xs"
                          dangerouslySetInnerHTML={{ __html: content.text }}
                        />
                      )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
