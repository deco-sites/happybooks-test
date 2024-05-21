import ImageOrIcon, {
  ImageOrIconType,
} from "deco-sites/todo-livro/components/ui/ImageOrIcon.tsx";
import { usePlatform } from "deco-sites/todo-livro/sdk/usePlatform.tsx";
import FreeShippingProgressBar from "deco-sites/todo-livro/islands/Header/FreeShippingProgressBar.tsx";
import { Device } from "apps/website/matchers/device.ts";

/** @titleBy text */
export interface AlertItem {
  /** @title Image or Icon */
  icon?: ImageOrIconType;
  text: string;
  href?: string;
}

export interface Props {
  alerts?: AlertItem[];
  device: Device;

  freeShippingTarget?: number;
}

function AlertI({ icon, text, href }: AlertItem) {
  const content = (
    <div class="flex items-center gap-1 text-neutral-100">
      {icon &&
        (
          <ImageOrIcon
            width={16}
            height={16}
            {...icon}
            loading="lazy"
            alt={text}
          />
        )}
      <span class="text-sm font-bold underline">{text}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} class="flex">
        {content}
      </a>
    );
  }

  return content;
}

function Alert({ alerts = [], device, freeShippingTarget }: Props) {
  const platform = usePlatform();

  const isMobile = device === "mobile" || device === "tablet";

  const shouldShowAlerts = !isMobile && alerts.length > 0;
  const shouldShowFreeShipping = (freeShippingTarget ?? 0) > 0;

  return (
    <div class="grid group-data-[micro-header='true']/header:opacity-0 group-data-[micro-header='true']/header:invisible group-data-[micro-header='true']/header:grid-rows-[0fr] grid-rows-[1fr] transition-all">
      <div class="overflow-hidden">
        <div class="flex h-12 lg:h-[30px]">
          {shouldShowAlerts && (
            <ul class="flex items-center pl-[calc(50vw-610px)] pr-8 bg-secondary-200 h-full">
              {alerts.map((alert) => (
                <li class="flex items-center h-[19px] pr-6 mr-6 border-r border-r-neutral-100 last:pr-0 last:mr-[unset] last:border-r-0">
                  <AlertI {...alert} />
                </li>
              ))}
            </ul>
          )}
          {shouldShowFreeShipping && (
            <div class="h-full w-full flex-1">
              <FreeShippingProgressBar
                platform={platform}
                target={freeShippingTarget!}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Alert;
