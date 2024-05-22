import { ImageWidget } from "apps/admin/widgets.ts";
import { Product } from "apps/commerce/types.ts";
import CustomImage from "deco-sites/todo-livro/components/ui/CustomImage.tsx";

const MAX_BADGES = 4;

/** @title {{#specification.value}} {{ specification.name }} = {{ specification.value }} {{/specification.value}} */
export interface BenefitBadge {
  specification: {
    name: string;
    value: string;
  };
  /** @title Image */
  image: ImageWidget;
}

export interface Props {
  badges: BenefitBadge[];
  additionalProperty: Product["additionalProperty"];
}

export default function BenefitsBadges({ badges, additionalProperty }: Props) {
  const badgesToShow = badges.filter((badge) => {
    const hasSpecification = additionalProperty?.some((prop) =>
      badge.specification.name.toLowerCase() === prop.name?.toLowerCase() &&
      badge.specification.value.toLowerCase() === prop.value?.toLowerCase()
    );

    return hasSpecification;
  }).slice(0, MAX_BADGES);

  if (!badgesToShow.length) {
    return null;
  }

  return (
    <ul class="px-2 flex flex-wrap gap-2 align-start">
      {badgesToShow.map((badge) => (
        <li class="flex">
          <CustomImage
            src={badge.image}
            width={74}
            height={74}
            factors={[1]}
            fit="contain"
            loading="lazy"
          />
        </li>
      ))}
    </ul>
  );
}
