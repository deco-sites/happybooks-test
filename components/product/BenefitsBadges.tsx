import { ImageWidget } from "apps/admin/widgets.ts";
import { Product } from "apps/commerce/types.ts";
import CustomImage from "deco-sites/todo-livro/components/ui/CustomImage.tsx";

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

export default function BenefitsBadges({ badges }: Props) {
  return (
    <ul class="px-2 flex flex-wrap gap-2 align-start">
      {badges.map((badge) => (
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
