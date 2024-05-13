/**
 * Theme generator inspired by Daisy UI:
 * Copyright (c) 2020 Pouya Saadeghi
 * License: MIT (https://github.com/saadeghi/daisyui/blob/37bca23444bc9e4d304362c14b7088f9a08f1c74/LICENSE)
 * https://github.com/saadeghi/daisyui/blob/37bca23444bc9e4d304362c14b7088f9a08f1c74/src/docs/src/routes/theme-generator.svelte
 */
import SiteTheme, { Font } from "apps/website/components/Theme.tsx";
// import BrowserLog from "deco-sites/fast-fashion/islands/BrowserLog.tsx";
import { Page as PageType } from "deco/blocks/page.tsx";
import Color from "npm:colorjs.io";
import type { ComplementaryColors, ThemeColors } from "./theme.d.ts";
import { defaultColors } from "./defaultColors.ts";

export interface Button {
  /**
   * @default 1px
   * @title Border width
   */
  "--border-btn": "1px" | "2px" | "3px" | "4px" | "5px" | "6px" | "7px" | "8px";
  /**
   * @default 0.2rem
   * @title Radius
   * @description Button and similar elements
   */
  "--rounded-btn": "0" | "0.2rem" | "0.4rem" | "0.8rem" | "2rem";
  /**
   * @default 0.95
   * @title Scale on click
   */
  "--btn-focus-scale": "0.9" | "0.95" | "1" | "1.05" | "1.1";
  /**
   * @default 0.25s
   * @title Animation
   * @description Duration when you click
   */
  "--animation-btn": "0.1s" | "0.15s" | "0.2s" | "0.25s" | "0.3s" | "0.35s";
}

export interface Miscellaneous {
  /**
   * @default 1rem
   * @title Rounded box
   * @description border radius rounded-box utility class, used in card and other large boxes
   */
  "--rounded-box": string;
  /**
   * @default 1.9rem
   * @title Rounded badge
   * @description border radius rounded-badge utility class, used in badges and similar
   */
  "--rounded-badge": string;
  /**
   * @default 0.2s
   * @title Animation input
   * @description duration of animation for inputs like checkbox, toggle, radio, etc
   */
  "--animation-input": string;
  /**
   * @default 1px
   * @title Tab border
   * @description border width of tabs
   */
  "--tab-border": string;
  /**
   * @default 0.5rem
   * @title Tab radius
   * @description border radius of tabs
   */
  "--tab-radius": string;
}

export interface Props {
  /**
   * @description Cores principais do tema
   */
  colors?: ThemeColors;
  /**
   * @description Cores complementares do tema, cores não preenchidas serão
   */
  complementaryColors?: ComplementaryColors;
  /**
   * @description Estilo dos botões
   */
  buttonStyle?: Button;
  /**
   * @description Estilo de outros elementos
   */
  otherStyles?: Miscellaneous;
  /**
   * @description Fonte do tema
   */
  font?: Font;
  /**
   * @description Pagina de exemplo
   */
  page?: PageType;
}

const CMY_HUES = [180, 300, 60];
const RGB_HUES = [360, 240, 120, 0];

type Theme = ThemeColors & ComplementaryColors & Button & Miscellaneous;

function hueShift(hues: Array<number>, hue: number, intensity: number) {
  const closestHue =
      hues.sort((a, b) => (Math.abs(a - hue) - Math.abs(b - hue)))[0],
    hueShift = closestHue - hue;
  return Math.round(intensity * hueShift * 0.5);
}

function lighten(hex: string, intensity: number) {
  if (!hex) {
    return "";
  }

  const color = new Color(hex);

  const [h, s, v] = color.hsv;
  const hue = h + hueShift(CMY_HUES, h, intensity);
  const saturation = s - Math.round(s * intensity);
  const value = v + Math.round((100 - v) * intensity);

  return new Color("hsv", [hue, saturation, value]);
}

const isDark = (c: Color) =>
  c.contrast("black", "WCAG21") < c.contrast("white", "WCAG21");

const contrasted = (color: string, percentage = 0.8) => {
  const c = new Color(color);

  return isDark(c) ? c.mix("white", percentage) : c.mix("black", percentage);
};

const getBetterContrastingColor = (
  color: string | Color,
  ...colors: string[]
) => {
  const c = new Color(color);
  const [betterColor] = colors.sort((a, b) => {
    const colorA = new Color(a);
    const colorB = new Color(b);

    return (
      Math.abs(colorB.contrast(c, "APCA")) -
      Math.abs(colorA.contrast(c, "APCA"))
    );
  });

  return betterColor;
};

const INTENSITY_MAP: {
  [key: number]: number;
} = {
  50: 0.95,
  100: 0.9,
  200: 0.75,
  300: 0.6,
  400: 0.3,
  500: 0.15,
  600: 0.05,
};

const toVariables = (t: Theme & Required<ThemeColors>): [string, string][] => {
  const toValue = (color: string | ReturnType<typeof lighten>) => {
    const [l, c, h] = new Color(color).oklch;

    return `${(l * 100).toFixed(0)}% ${c.toFixed(2)} ${(h || 0).toFixed(0)}deg`;
  };

  // console.log("primary", t["primary"]);

  const colorVariables = Object.entries({
    "--primary-500": t["primary"],
    "--primary-400": t["primaryShades"]?.["400"] ??
      lighten(t["primary"], INTENSITY_MAP[400]),
    "--primary-300": t["primaryShades"]?.["300"] ??
      lighten(t["primary"], INTENSITY_MAP[300]),
    "--primary-200": t["primaryShades"]?.["200"] ??
      lighten(t["primary"], INTENSITY_MAP[200]),
    "--primary-100": t["primaryShades"]?.["100"] ??
      lighten(t["primary"], INTENSITY_MAP[100]),

    "--secondary-500": t["secondary"],
    "--secondary-400": t["secondaryShades"]?.["400"] ??
      lighten(t["secondary"], INTENSITY_MAP[400]),
    "--secondary-300": t["secondaryShades"]?.["300"] ??
      lighten(t["secondary"], INTENSITY_MAP[300]),
    "--secondary-200": t["secondaryShades"]?.["200"] ??
      lighten(t["secondary"], INTENSITY_MAP[200]),
    "--secondary-100": t["secondaryShades"]?.["100"] ??
      lighten(t["secondary"], INTENSITY_MAP[100]),

    "--tertiary-500": t["tertiary"],
    "--tertiary-400": t["tertiaryShades"]?.["400"] ??
      lighten(t["tertiary"], INTENSITY_MAP[400]),
    "--tertiary-300": t["tertiaryShades"]?.["300"] ??
      lighten(t["tertiary"], INTENSITY_MAP[300]),
    "--tertiary-200": t["tertiaryShades"]?.["200"] ??
      lighten(t["tertiary"], INTENSITY_MAP[200]),
    "--tertiary-100": t["tertiaryShades"]?.["100"] ??
      lighten(t["tertiary"], INTENSITY_MAP[100]),

    "--neutral-700": t["neutral"],
    "--neutral-600": t["neutralShades"]?.["600"] ??
      lighten(t["neutral"], INTENSITY_MAP[600]),
    "--neutral-500": t["neutralShades"]?.["500"] ??
      lighten(t["neutral"], INTENSITY_MAP[500]),
    "--neutral-400": t["neutralShades"]?.["400"] ??
      lighten(t["neutral"], INTENSITY_MAP[400]),
    "--neutral-300": t["neutralShades"]?.["300"] ??
      lighten(t["neutral"], INTENSITY_MAP[300]),
    "--neutral-200": t["neutralShades"]?.["200"] ??
      lighten(t["neutral"], INTENSITY_MAP[200]),
    "--neutral-100": t["base"],

    "--danger-700": t["danger"],
    "--danger-600": t["dangerShades"]?.["600"] ??
      lighten(t["danger"], INTENSITY_MAP[600]),
    "--danger-500": t["dangerShades"]?.["500"] ??
      lighten(t["danger"], INTENSITY_MAP[500]),
    "--danger-400": t["dangerShades"]?.["400"] ??
      lighten(t["danger"], INTENSITY_MAP[400]),
    "--danger-300": t["dangerShades"]?.["300"] ??
      lighten(t["danger"], INTENSITY_MAP[300]),
    "--danger-200": t["dangerShades"]?.["200"] ??
      lighten(t["danger"], INTENSITY_MAP[200]),

    "--warning-700": t["warning"],
    "--warning-600": t["warningShades"]?.["600"] ??
      lighten(t["warning"], INTENSITY_MAP[600]),
    "--warning-500": t["warningShades"]?.["500"] ??
      lighten(t["warning"], INTENSITY_MAP[500]),
    "--warning-400": t["warningShades"]?.["400"] ??
      lighten(t["warning"], INTENSITY_MAP[400]),
    "--warning-300": t["warningShades"]?.["300"] ??
      lighten(t["warning"], INTENSITY_MAP[300]),
    "--warning-200": t["warningShades"]?.["200"] ??
      lighten(t["warning"], INTENSITY_MAP[200]),

    "--success-700": t["success"],
    "--success-600": t["successShades"]?.["600"] ??
      lighten(t["success"], INTENSITY_MAP[600]),
    "--success-500": t["successShades"]?.["500"] ??
      lighten(t["success"], INTENSITY_MAP[500]),
    "--success-400": t["successShades"]?.["400"] ??
      lighten(t["success"], INTENSITY_MAP[400]),
    "--success-300": t["successShades"]?.["300"] ??
      lighten(t["success"], INTENSITY_MAP[300]),
    "--success-200": t["successShades"]?.["200"] ??
      lighten(t["success"], INTENSITY_MAP[200]),

    "--info-700": t["info"],
    "--info-600": t["infoShades"]?.["600"] ??
      lighten(t["info"], INTENSITY_MAP[600]),
    "--info-500": t["infoShades"]?.["500"] ??
      lighten(t["info"], INTENSITY_MAP[500]),
    "--info-400": t["infoShades"]?.["400"] ??
      lighten(t["info"], INTENSITY_MAP[400]),
    "--info-300": t["infoShades"]?.["300"] ??
      lighten(t["info"], INTENSITY_MAP[300]),
    "--info-200": t["infoShades"]?.["200"] ??
      lighten(t["info"], INTENSITY_MAP[200]),

    "--p": t["primary"],
    "--pc": getBetterContrastingColor(t["primary"], t["neutral"], t["base"]),

    "--s": t["secondary"],
    "--sc": getBetterContrastingColor(t["secondary"], t["neutral"], t["base"]),

    "--t": t["tertiary"],
    "--tc": getBetterContrastingColor(t["tertiary"], t["neutral"], t["base"]),

    "--a": t["secondary"],
    "--ac": getBetterContrastingColor(t["secondary"], t["neutral"], t["base"]),

    "--n": t["neutral"]["600"] ?? lighten(t["neutral"], 0.5),
    "--nc": t["base"],

    "--b1": t["base"],
    "--b2": t["neutralShades"]?.["200"] ??
      lighten(t["base"], INTENSITY_MAP[200]),
    "--b3": t["neutralShades"]?.["300"] ??
      lighten(t["base"], INTENSITY_MAP[300]),
    "--bc": t["neutral"]["600"] ?? lighten(t["neutral"], INTENSITY_MAP[600]),

    "--su": t["success"],
    "--suc": getBetterContrastingColor(t["success"], t["neutral"], t["base"]),

    "--wa": t["warning"],
    "--wac": getBetterContrastingColor(t["secondary"], t["neutral"], t["base"]),

    "--er": t["danger"],
    "--erc": getBetterContrastingColor(t["danger"], t["neutral"], t["base"]),

    "--in": t["info"],
    "--inc": getBetterContrastingColor(t["info"], t["neutral"], t["base"]),
  }).map(([key, color]) => {
    return [key, toValue(color)] as [string, string];
  });

  const miscellaneousVariables = Object.entries({
    "--rounded-box": t["--rounded-box"],
    "--rounded-btn": t["--rounded-btn"],
    "--rounded-badge": t["--rounded-badge"],
    "--animation-btn": t["--animation-btn"],
    "--animation-input": t["--animation-input"],
    "--btn-focus-scale": t["--btn-focus-scale"],
    "--border-btn": t["--border-btn"],
    "--tab-border": t["--tab-border"],
    "--tab-radius": t["--tab-radius"],
  });

  return [...colorVariables, ...miscellaneousVariables];
};

const defaultTheme = {
  ...defaultColors,
  "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
  "--rounded-btn": "0.2rem" as const, // border radius rounded-btn utility class, used in buttons and similar element
  "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
  "--animation-btn": "0.25s" as const, // duration of animation when you click on button
  "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
  "--btn-focus-scale": "0.95" as const, // scale transform of button when you focus on it
  "--border-btn": "1px" as const, // border width of buttons
  "--tab-border": "1px", // border width of tabs
  "--tab-radius": "0.5rem", // border radius of tabs
};

function Section({
  colors,
  complementaryColors,
  buttonStyle,
  otherStyles,
  font,
}: Props) {
  const theme = {
    ...defaultTheme,
    ...colors,
    ...complementaryColors,
    ...buttonStyle,
    ...otherStyles,
  };

  const variables = [
    ...toVariables(theme),
    [
      "--font-family",
      font?.family ||
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
    ],
  ].map(([name, value]) => ({ name, value }));

  return (
    <>
      <SiteTheme fonts={font ? [font] : undefined} variables={variables} />
    </>
  );
}

export function Preview(props: Props) {
  const { page } = props;

  return (
    <div>
      {page && <page.Component {...page.props} />}
      <Section {...props} />
    </div>
  );
}

export default Section;
