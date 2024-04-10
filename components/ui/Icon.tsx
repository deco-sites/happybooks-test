import { asset } from '$fresh/runtime.ts';
import type { JSX } from 'preact';

export type AvailableIcons = 
    | 'Alert'
    | 'AlertError'
    | 'AlertInfo'
    | 'AlertSuccess'
    | 'AlertWarning'
    | 'ArrowsPointingOut'
    | 'Bars3'
    | 'ChevronDown'
    | 'ChevronLeft'
    | 'ChevronRight'
    | 'ChevronUp'
    | 'Close'
    | 'CreditCards'
    | 'Deco'
    | 'Diners'
    | 'Discord'
    | 'Discount'
    | 'Elo'
    | 'Elos'
    | 'Facebook'
    | 'FilterList'
    | 'Hamburger'
    | 'Heart'
    | 'House'
    | 'Instagram'
    | 'Linkedin'
    | 'Lock'
    | 'MagnifyingGlass'
    | 'MapPin'
    | 'Mastercard'
    | 'Mastercards'
    | 'Message'
    | 'Minus'
    | 'Newsletter'
    | 'OpenBook'
    | 'Phone'
    | 'Pix'
    | 'Pixs'
    | 'Plus'
    | 'QuestionMarkCircle'
    | 'Return'
    | 'Ruler'
    | 'ShoppingBag'
    | 'ShoppingCart'
    | 'Star'
    | 'Tiktok'
    | 'Trash'
    | 'Truck'
    | 'Twitter'
    | 'User'
    | 'Visa'
    | 'Visas'
    | 'WhatsApp'
    | 'XMark'
    | 'Youtube'
    | 'Zoom'
    | 'share';

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
	id: AvailableIcons
	size?: number
};

function Icon(
	{ id, strokeWidth = 16, size, width, height, ...otherProps }: Props,
) {
	return (
		<svg
			{...otherProps}
			width={width ?? size}
			height={height ?? size}
			strokeWidth={strokeWidth}
		>
			<use href={asset(`/sprites.svg#${id}`)} />
      {/* <title>{id}</title> */}
		</svg>
	);
}

export default Icon;