import { Section } from "deco/blocks/section.ts";
import { renderSection } from "apps/website/pages/Page.tsx";

export interface Props {
  Menu: Section;
  contentSections?: Section[];
}

export default function Institutional(
  { Menu, contentSections = [] }: Props,
) {
  return (
    <>
      {/* <Breadcrumb /> */}
      {/* <Breadcrumb itemListElement={itemListElement} /> */}
      <div class="flex flex-col lg:flex-row max-w-container px-2 container:px-0 mx-auto w-full gap-6 lg:gap-[60px] pb-[100px]">
        <aside class="w-full lg:w-[300px] ">
          {renderSection(Menu)}
        </aside>
        <div class="flex flex-col flex-1">
          {contentSections.map(renderSection)}
        </div>
      </div>
    </>
  );
}
