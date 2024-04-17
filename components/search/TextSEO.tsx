export interface Props {
  /**
   * @title Text
   * @format html
   */
  text: string;
}

export function TextSeo({ text }: Props) {
  return (
    <div class="w-full max-w-container mb-8 mx-2 lg:mx-auto">
      <div
        class="prose plp-seo"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}

export default TextSeo;
