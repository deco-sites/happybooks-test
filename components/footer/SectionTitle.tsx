import type { ComponentChildren } from "preact";

function SectionTitle({ children }: { children: ComponentChildren }) {
  return (
    <h4 class="text-neutral-500 font-bold text-base relative w-fit whitespace-nowrap">
      {children}
    </h4>
  );
}

export default SectionTitle;
