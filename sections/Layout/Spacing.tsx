import { AppContext } from "deco-sites/todo-livro/apps/site.ts";

export function loader(props: Props, req: Request, ctx: AppContext) {
  return {
    ...props,
    isMobile: ctx.device === "mobile",
  };
}

export interface Props {
  /**
   * @title Espaçamento
   * @description Tamanho do espaçamento, e.g. 100px
   * @default 32px
   */
  size: string;
  /**
   * @title Espaçamento no mobile
   * @description Tamanho do espaçamento, e.g. 100px
   */
  sizeMobile?: string;
  /**
   * @ignore
   */
  isMobile: boolean;
}

export default function Spacing(
  { size = "32px", sizeMobile, isMobile }: Props,
) {
  if (isMobile && sizeMobile) {
    return <div style={{ height: sizeMobile, width: "100%" }} />;
  }

  return <div style={{ height: size, width: "100%" }} />;
}
