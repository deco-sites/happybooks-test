import { useId } from "../../sdk/useId.ts";

const script = (id: string) => {
  const callback = () => {
    const KEY = "store-cookie-consent";
    const ACCEPTED = "accepted";
    const HIDDEN = "translate-y-[200%]";

    const consent = localStorage.getItem(KEY);
    const elem = document.getElementById(id);

    if (consent !== ACCEPTED && elem) {
      const accept = elem.querySelector("[data-button-cc-accept]");
      accept && accept.addEventListener("click", () => {
        localStorage.setItem(KEY, ACCEPTED);
        elem.classList.add(HIDDEN);
      });
      const close = elem.querySelector("[data-button-cc-close]");
      close &&
        close.addEventListener("click", () => elem.classList.add(HIDDEN));
      elem.classList.remove(HIDDEN);
    }
  };

  addEventListener("scroll", callback, { once: true });
};

export interface Props {
  title?: string;
  /** @format html */
  text?: string;
  policy?: {
    text?: string;
    link?: string;
  };
  allowButtonText?: string;
}

const DEFAULT_PROPS = {
  title: "Cookies",
  text:
    "Guardamos estatísticas de visitas para melhorar sua experiência de navegação.",
  policy: {
    text: "Saiba mais sobre sobre política de privacidade",
    link: "/politica-de-privacidade",
  },
  allowButtonText: "Aceitar",
};

function CookieConsent(props: Props) {
  const id = useId();
  const { title, text, policy, allowButtonText } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  return (
    <>
      <div
        id={id}
        class={`
          transform-gpu translate-y-[200%] transition fixed bottom-0 lg:bottom-2 w-screen z-50 lg:flex
        `}
      >
        <div
          class={`
          p-4 mx-4 my-2 flex flex-col gap-4 shadow bg-base-100 rounded border border-base-200 
          `}
        >
          <div
            class={`flex-auto flex flex-col gap-4`}
          >
            <h3 class="text-xl">{title}</h3>
            {text && (
              <div
                class="text-base"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            )}

            <a href={policy.link} class="text-sm link link-secondary">
              {policy.text}
            </a>
          </div>

          <div
            class={`flex flex-col gap-2`}
          >
            <button class="btn" data-button-cc-accept>
              {allowButtonText}
            </button>
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
