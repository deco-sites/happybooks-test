export interface ThemeColors {
  /** @format color-input */
  base: string;
  /** @format color-input */
  primary: string;
  /** @format color-input */
  secondary: string;
  /** @format color-input */
  neutral: string;
  /** @format color-input */
  danger: string;
  /** @format color-input */
  success: string;
  /** @format color-input */
  warning: string;
  /** @format color-input */
  info: string;
}

export interface ComplementaryColors {
  primaryShades?: ColorShades;
  secondaryShades?: ColorShades;
  neutralShades?: ExtendedColorShades;
  dangerShades?: ExtendedColorShades;
  successShades?: ExtendedColorShades;
  warningShades?: ExtendedColorShades;
  infoShades?: ExtendedColorShades;
}

export interface ColorShades {
  /** @format color-input */
  "400"?: string;
  /** @format color-input */
  "300"?: string;
  /** @format color-input */
  "200"?: string;
  /** @format color-input */
  "100"?: string;
}

export interface ExtendedColorShades {
  /** @format color-input */
  "600"?: string;
  /** @format color-input */
  "500"?: string;
  /** @format color-input */
  "400"?: string;
  /** @format color-input */
  "300"?: string;
  /** @format color-input */
  "200"?: string;
}
