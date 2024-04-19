export interface Props {
  /**
   * @title Text
   * @format html
   */
  text: string;
}

export function TextSeo({ text }: Props) {
  return (
    <div class="w-full max-w-container mb-8 px-2 lg:px-0 mx-auto">
      <div
        class="prose plp-seo"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}

export default TextSeo;
