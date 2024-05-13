/**
 * @titleBy name
 */
export interface CategoryItemChild {
  name: string;
  url: string;
}
/**
 * @titleBy title
 */
export interface CategoryItem {
  title: string;
  url: string;
  children: CategoryItemChild[];
}
export interface CategoryColumn {
  items: CategoryItem[];
}

/**
 * @titleBy name
 */
export interface NavItemChild {
  name: string;
  url: string;
  /**
   * @description Itens destacados terão underline em desktop, e aparecerão primeiro em mobile
   */
  highlight?: boolean;
}

export interface NavColumn {
  items?: NavItemChild[];
}

/**
 * @titleBy name
 */
export interface NavItem {
  name: string;
  url?: string;
  /**
   * @maxItems 2
   */
  columns: NavColumn[];
}

/**
 * @titleBy title
 */
export interface NavigationLinkItem {
  name: string;
  url: string;
  style: "primary" | "secondary" | "tertiary";
}

export interface Navigation {
  categories: CategoryColumn[];
  navItems: NavItem[];
  links: NavigationLinkItem[];
}

export type HeaderNavigation = Navigation | null;

export interface Props {
  navigation?: Navigation;
}

const loader = ({ navigation }: Props): HeaderNavigation => navigation ?? null;

export default loader;
