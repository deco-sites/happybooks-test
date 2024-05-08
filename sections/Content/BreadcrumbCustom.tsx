import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface Props {
  items: BreadcrumbItem[];
}

export default function BreadcrumbCustomSection({ items }: Props) {
  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem" as const,
    name: item.label,
    item: item.href,
    position: index + 1,
  }));

  return <Breadcrumb itemListElement={itemListElement} />;
}
