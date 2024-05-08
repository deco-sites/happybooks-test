export interface Props {
  /** @format html */
  content: string;
  align?: "center" | "left" | "right";
}

export default function InstitucionalText({ content, align = "left" }: Props) {
  return (
    <div
      class={`markdown-body prose inst-text ${
        align === "center"
          ? "text-center items-center"
          : align === "right"
          ? "text-right items-end"
          : ""
      }`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
