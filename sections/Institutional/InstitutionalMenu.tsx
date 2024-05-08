import type { SectionProps } from "deco/types.ts";
import Icon from "$store/components/ui/Icon.tsx";

/** @title {{ label }} */
export interface Link {
  /** @description Title */
  label: string;
  href: string;
}

export interface Props {
  links: Link[];
}

function checkIfValidURLSlug(str: string) {
  // Regular expression to check if string is a valid url slug
  const regexExp = /^\/[a-z0-9\/-]+(?:-[a-z0-9]\/-+)*$/g;

  return regexExp.test(str);
}

export default function InstitutionalMenu({
  links,
  activeItem,
}: SectionProps<ReturnType<typeof loader>>) {
  return (
    <nav class="w-full lg:max-w-[350px] lg:m-auto font-montserrat">
      <input
        id={"institucional-menu"}
        type={"checkbox"}
        class={"peer hidden"}
      />
      <label
        class={"select-none cursor-pointer lg:hidden w-[300px] mx-auto h-[36px] flex items-center justify-center text-base text-neutral-500 font-bold group peer-checked:mb-4 rounded-[5px] border border-primary-500 font-sans"}
        htmlFor="institucional-menu"
      >
        Institucional
      </label>
      <ul class="flex flex-col w-full max-w-[300px] gap-2.5 max-lg:transition-all duration-300 max-lg:h-0 max-lg:opacity-0 max-lg:pointer-events-none peer-checked:h-auto peer-checked:opacity-100 peer-checked:pointer-events-auto mx-auto lg:mx-0">
        {links?.map((link) => {
          return (
            <li
              data-item-active={activeItem?.href === link.href}
              class="border border-neutral-300 font-normal rounded-full hover:border-secondary-400 data-[item-active=true]:border-secondary-400 data-[item-active=true]:bg-secondary-400 data-[item-active=true]:text-neutral-100 data-[item-active=true]:font-bold hover:font-bold transition-all ease-in-out"
            >
              <a
                href={link.href}
                class="flex w-full h-full px-4 py-3 font-[inherit]"
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export const loader = ({ links }: Props, req: Request) => {
  const activeItem = links.find(
    ({ href }) =>
      checkIfValidURLSlug(href) &&
      new URLPattern({ pathname: href }).test(req.url),
  );

  return { links, activeItem };
};
