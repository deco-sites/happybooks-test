import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";

interface InputProps {
  id: string;
  name?: string;
  placeholder: string;
  label: string;
  type?: "text" | "email";
}

function Input(
  { id, name = id, placeholder, label, type = "text" }: InputProps,
) {
  return (
    <div class="w-full relative">
      <div class="flex w-full mb-2 justify-between items-center">
        <label
          htmlFor={id}
          class="text-black text-sm font-normal leading-[15px]"
        >
          {label}
        </label>
      </div>

      <input
        required
        type={type}
        name={name}
        id={`fc_${id}`}
        class="h-11 w-full font-normal text-base text-neutral-600 placeholder:text-neutral-400 bg-transparent border-[2px] focus:outline-neutral-200 border-neutral-200 rounded p-3"
        placeholder={placeholder}
      />
    </div>
  );
}

export interface Props {
  form?: {
    /**
     * @title Texto do botão de enviar
     */
    submitText?: string;
  };
}

function ContactForm({ form = { submitText: "Enviar" } }: Props) {
  const succeeded = useSignal(false);
  const loading = useSignal(false);

  const onSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    loading.value = true;

    const email = (e.currentTarget.elements.namedItem("email") as RadioNodeList)
      ?.value;
    const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
      ?.value;
    const message =
      (e.currentTarget.elements.namedItem("message") as RadioNodeList)
        ?.value;

    const data = {
      email,
      name,
      message,
    };

    try {
      await invoke.vtex.actions.masterdata.createDocument({
        acronym: "FC",
        data,
      });

      succeeded.value = true;
    } catch (error) {
      console.error("ERROR", error);
      alert("Erro ao enviar mensagem");
    }

    loading.value = false;
  };

  return (
    <div class="">
      <h1
        class={"font-bold text-2xl text-neutral-700 pb-4 border-b border-b-neutral-200 mb-4"}
      >
        Fale Conosco
      </h1>
      <div class="container-center flex flex-col mt-7">
        {succeeded.value
          ? (
            <div class="text-neutral-600 w-full flex flex-col justify-center items-center">
              <span class="my-4">Formulário enviado com sucesso</span>
              <button
                class="my-4 w-full rounded-full bg-secondary-400 font-bold text-neutral-100 h-[40px] disabled:bg-disabled-btn disabled:cursor-pointer max-w-[350px]"
                onClick={() => window.location.reload()}
              >
                Enviar Novo Formulário
              </button>
            </div>
          )
          : (
            <form onSubmit={onSubmit} class="w-full">
              <div class="flex flex-col gap-7 mb-1">
                <Input
                  id="name"
                  label="Nome"
                  placeholder="Digite seu nome"
                />
                <Input
                  id="email"
                  label="E-mail"
                  placeholder="Digite seu e-mail"
                  type="email"
                />

                <div class="flex items-center relative">
                  <label htmlFor="message" class="xl:pb-0 w-full">
                    <span class="text-black text-sm leading-[15px] mb-2 block">
                      Mensagem
                    </span>
                    <textarea
                      required
                      id="fc_message"
                      name="message"
                      placeholder={"Digite sua mensagem"}
                      class="w-full font-normal text-base text-neutral-600 placeholder:text-neutral-400 bg-transparent border-[2px] rounded border-neutral-200 py-2 px-4"
                      rows={4}
                      cols={50}
                    />
                  </label>
                </div>
                <div class="w-full flex mb-7 lg:max-w-[200px]">
                  <button
                    disabled={loading}
                    type="submit"
                    class="w-full rounded-full bg-secondary-400 font-bold text-neutral-100 h-[40px] disabled:bg-disabled-btn disabled:cursor-pointer group"
                  >
                    <span class="group-disabled:loading">
                      {form?.submitText}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          )}
      </div>
    </div>
  );
}

export default ContactForm;
