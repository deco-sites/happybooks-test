import Icon from "$store/components/ui/Icon.tsx";
import { Section } from "deco/blocks/section.ts";
import Image from "apps/website/components/Image.tsx";
import { asset } from "$fresh/runtime.ts";
import CustomImage from "deco-sites/todo-livro/components/ui/CustomImage.tsx";

export interface Props {
  /**
   *  @title Telefone
   */
  phone?: string;

  /**
   *  @title Email
   */
  email?: string;

  /**
   *  @title hide
   * @ignore
   */
  term?: string;
  /**
   *  @title Prateleira da página não encontrada
   */
  notFoundShelf?: Section;
}

export default function NotFound(
  {
    phone = "(00) 0000-0000",
    email = "atendimento@loja.com.br",
    term,
    notFoundShelf,
  }: Props,
) {
  const ShelfComponent = notFoundShelf?.Component;
  const shelfProps = notFoundShelf?.props;

  return (
    <div class="flex flex-col gap-8 w-full">
      <div class="bg-secondary-100 w-full">
        <div class="max-w-container px-2 container:px-0 mx-auto mb-12 grid grid-cols-[100px_auto] md:grid-cols-[152px_auto] max-md:gap-x-2 justify-center items-center md:items-start text-neutral-600 md:text-left text-center gap-y-9">
          <img
            alt="Busca vazia"
            width={152}
            height={253}
            src={asset("/busca-vazia.png")}
            loading="lazy"
            class="max-md:row-start-2 md:row-span-3 max-md:self-start md:my-auto h-auto"
          />
          <div class="font-bold text-2xl text-neutral-700 max-w-[386px] max-md:col-span-2 md:col-start-2">
            {term
              ? (
                <h1>
                  Não foram encontrados resultados para a busca{" "}
                  <span class="text-neutral-400">“{term}”</span>
                </h1>
              )
              : (
                <h1>
                  Não foram encontrados resultados para a busca
                </h1>
              )}
            <p class="mt-8 text-base text-neutral-600 font-normal">
              Tente seguir estas dicas e realize a busca novamente:
            </p>
          </div>

          <div class="flex flex-col gap-8 max-md:row-start-2 md:col-start-2">
            <ul class="list-disc pl-4 -mt-3 text-left">
              <li>
                Verifique se você digitou as{" "}
                <strong>palavras corretamente;</strong>
              </li>
              <li>
                Tente utilizar uma <strong>única palavra;</strong>
              </li>
              <li>
                Busque por <strong>termos menos específicos;</strong>
              </li>
              <li>
                <strong>Utilize sinônimos</strong> ao termo desejado.
              </li>
            </ul>

            <a
              href="/"
              class="text-neutral-100 bg-neutral-400 hover:bg-neutral-600 rounded-full h-[42px] px-7 font-bold flex items-center justify-center transition-colors w-fit"
            >
              Voltar para home
            </a>
          </div>

          <p class="text-sm max-w-[536px] max-md:col-span-2 md:col-start-2">
            Se ainda não encontrar o que procura, entre em contato conosco
            através do e-mail: <strong>{email}</strong> ou pelo nosso telefone:
            {" "}
            <strong>{phone}</strong>
          </p>
        </div>
      </div>

      {ShelfComponent && <ShelfComponent {...shelfProps} />}
    </div>
  );
}
