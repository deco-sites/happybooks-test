interface Props {
  localeMapLink: string;
  /** @format html */
  localeDescription: string;
}

function LocaleInfo({ localeMapLink, localeDescription }: Props) {
  return (
    <div class="max-w-[1012px] px-2 min-[1012px]:px-0 mx-auto w-full lg:flex-row flex-col flex gap-8 lg:gap-14 mb-14">
      <div class="w-full lg:w-1/2">
        <iframe
          src={localeMapLink}
          width={495}
          height={340}
          class="lg:w-[495px] w-full h-[340px]"
          loading="lazy"
        />
      </div>
      <div class="w-full lg:w-1/2 lg:my-auto">
        <div
          class={`prose locale-info`}
          dangerouslySetInnerHTML={{ __html: localeDescription }}
        />
      </div>
    </div>
  );
}

export default LocaleInfo;
