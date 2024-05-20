import { useId } from "../../sdk/useId.ts";
import Icon from "deco-sites/todo-livro/components/ui/Icon.tsx";

const script = (id: string) => {
  const callback = () => {
    const KEY = "store-cookie-consent";
    const ACCEPTED = "accepted";
    const HIDDEN = "translate-y-[200%]";

    const consent = localStorage.getItem(KEY);
    const $elem = document.getElementById(id);
    const $icon = $elem?.querySelector("[data-icon-cc]");
    const $content = $elem?.querySelector("[data-content-cc]");

    $icon &&
      $icon.addEventListener("click", () => {
        $icon.classList.add(HIDDEN);
        $content && $content.classList.remove(HIDDEN);
      });

    if ($elem) {
      const $accept = $elem.querySelector("[data-button-cc-accept]");
      $accept && $accept.addEventListener("click", () => {
        localStorage.setItem(KEY, ACCEPTED);
        $content && $content.classList.add(HIDDEN);
        $icon && $icon.classList.remove(HIDDEN);
      });
      const $close = $elem.querySelector("[data-button-cc-close]");
      $close &&
        $close.addEventListener(
          "click",
          () => $content && $content.classList.add(HIDDEN),
        );

      if (consent === ACCEPTED) {
        $icon && $icon.classList.remove(HIDDEN);
      } else {
        $content && $content.classList.remove(HIDDEN);
      }
    }
  };

  addEventListener("scroll", callback, { once: true });
};

export interface Props {
  /** @format html */
  text?: string;
  allowButtonText?: string;
}

const DEFAULT_PROPS = {
  text:
    `Este site utiliza cookies para personalizar a sua experiência.<br/> Ao continuar navegando, você concorda com a nossa <strong><a href="/institucional/politica-privacidade">política de utilização de cookies</a></strong>.`,
  allowButtonText: "Aceitar",
};

function CookieConsent(props: Props) {
  const id = useId();
  const { text, allowButtonText } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  return (
    <>
      <div
        id={id}
      >
        <button
          type="button"
          data-icon-cc
          class={`transform-gpu translate-y-[200%] transition fixed bottom-0 lg:left-2 lg:bottom-2 size-[50px] rounded-full flex items-center justify-center text-neutral-100 bg-tertiary-400 z-50 lg:flex`}
        >
          <Icon id="Cookie" size={30} />
        </button>
        <div
          data-content-cc
          class={`transform-gpu translate-y-[200%] transition fixed bottom-0 lg:bottom-2 lg:left-2 w-screen z-50 lg:flex pointer-events-none`}
        >
          <div
            class={`p-4 lg:px-10 lg:py-6 flex flex-col gap-5 bg-neutral-600 rounded-[10px] pointer-events-auto`}
          >
            <div
              class={`flex-auto flex flex-col gap-4`}
            >
              {text && (
                <div
                  class="text-sm text-neutral-100"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              )}
            </div>

            <div
              class={`flex flex-col gap-2`}
            >
              <button
                class="btn bg-primary-400 hover:!bg-primary-500 text-neutral-600 sm:max-w-[170px] h-[45px] min-h-[45px] !border-none rounded-[10px]"
                data-button-cc-accept
              >
                {allowButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${script})("${id}");` }}
      />
    </>
  );
}

export default CookieConsent;
