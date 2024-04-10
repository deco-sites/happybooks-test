import { invoke } from "../../runtime.ts";
import { clx } from "../../sdk/clx.ts";
import { Signal, useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { useId } from "deco-sites/todo-livro/sdk/useId.ts";
import Icon from "deco-sites/todo-livro/components/ui/Icon.tsx";
import Button from "deco-sites/todo-livro/components/ui/Button.tsx";

export interface Input {
  /**
   * @title Label
   */
  label: string;
  /**
   * @title Nome
   * @description Assim como cadastrado no MasterData
   */
  name: string;
  placeholder?: string;
  /**
   * @ignore
   */
  type: "text" | "email";
  /**
   * @ignore
   */
  error?: string;
}

export interface Form {
  name: Input;
  email: Input;
  buttonText?: string;
}

export interface Props {
  title?: string;
  /** @format textarea */
  description?: string;
  form?: Form;
}

function Input({
  label,
  placeholder,
  type,
  name,
  loading,
  error,
}: Input & {
  loading: boolean | Signal<boolean>;
}) {
  const id = useId();
  return (
    <div class="flex flex-col gap-[6px] w-full relative">
      <label htmlFor={id} class="font-bold text-sm text-neutral-100">
        {label}
      </label>
      <div class="relative flex h-fit">
        <input
          id={id}
          data-error={error ? "true" : undefined}
          data-loading={loading ? "true" : undefined}
          class={"w-full px-3 py-[11px] h-[41px] text-sm placeholder:text-neutral-400 text-neutral-500 rounded-[5px] bg-neutral-100 border border-neutral-300"}
          type={type}
          placeholder={placeholder}
          name={name}
          disabled={loading}
        />
      </div>
      {error && (
        <span class="text-sm absolute left-0 top-[calc(100%+0.5rem)] text-danger-600">
          {error}
        </span>
      )}
    </div>
  );
}

function Newsletter(
  {
    title = "Fique por dentro das novidades!",
    description =
      "Assine a newsletter e receba primeiro\n as nossas novidades e promoções.",
    form = {
      name: {
        label: "Nome",
        name: "name",
        type: "text",
        placeholder: "Digite seu nome",
      },
      email: {
        label: "E-mail",
        name: "email",
        type: "email",
        placeholder: "Digite seu e-mail",
      },
      buttonText: "Cadastrar",
    },
  }: Props,
) {
  const errors = useSignal<Record<string, string>>({});
  const loading = useSignal(false);
  const success = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    errors.value = {};

    try {
      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;
      const email = (
        e.currentTarget.elements.namedItem("email") as RadioNodeList
      )?.value;

      const currErrors: Record<string, string> = {};

      if (!name) {
        currErrors.name = "Por favor, insira um nome";
      }

      if (!email) {
        currErrors.email = "Por favor, insira um e-mail";
      }

      if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        currErrors.email = "Digite um e-mail válido";
      }

      if (Object.keys(currErrors).length > 0) {
        errors.value = currErrors;
        return;
      }

      loading.value = true;

      await invoke.vtex.actions.newsletter.subscribe({ email, name });

      success.value = true;
    } finally {
      loading.value = false;
    }
  };

  if (success.value) {
    return (
      <div class="mx-auto max-w-container flex bg-secondary-500 rounded-[10px] px-8 lg:h-[145px] justify-center text-neutral-100 lg:mb-[44px]">
        <div class="flex flex-col gap-2 justify-center items-center">
          <div class="flex gap-2 items-center">
            <Icon
              id="Newsletter"
              width={50}
              height={20}
              strokeWidth={0}
            />
            <strong class="text-[32px] font-extrabold">
              Inscrição realizada com sucesso!
            </strong>
          </div>
          <Button
            class="btn btn-primary rounded-full min-h-[41px] h-[41px] px-7 min-w-[unset] w-[120px]"
            onClick={() => {
              success.value = false;
            }}
          >
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div class="mx-auto max-w-container flex bg-secondary-500 rounded-[10px] px-8 lg:h-[145px] pt-6 text-neutral-100 lg:mb-[44px]">
      <Icon
        id="Newsletter"
        width={50}
        height={20}
        strokeWidth={0}
        class="mt-2 mr-2"
      />
      <div class="flex flex-col mr-[60px]">
        <h3
          class="max-w-[300px] text-[32px] font-extrabold"
          style={{
            lineHeight: "31px",
          }}
        >
          {title}
        </h3>
        <p
          class="text-lg"
          dangerouslySetInnerHTML={{
            __html: description.replace(/\n/g, "<br>"),
          }}
        />
      </div>

      <div class="flex justify-center flex-1 mt-4 mr-24">
        {form
          ? (
            <form
              onSubmit={handleSubmit}
              autocomplete="on"
              class="flex flex-col gap-6 md:gap-4 w-full"
              noValidate
            >
              <div class="flex flex-col md:flex-row gap-3">
                <Input
                  type="text"
                  label="Nome"
                  name="name"
                  loading={loading}
                  placeholder="Digite seu nome"
                  error={errors.value["name"]}
                />

                <div class="w-full relative">
                  <Input
                    type="email"
                    label="E-mail"
                    name="email"
                    placeholder="Digite seu email"
                    loading={loading}
                    error={errors.value["email"]}
                  />
                  <Button
                    class="btn btn-primary rounded-full min-h-[41px] h-[41px] px-7 min-w-[unset] absolute right-0 bottom-0 !translate-x-1/2 !opacity-100"
                    loading={loading.value}
                    type="submit"
                  >
                    {form.buttonText}
                  </Button>
                </div>
              </div>
            </form>
          )
          : null}
      </div>
    </div>
  );
}

export default Newsletter;
