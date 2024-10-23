import React, { ReactNode } from "react";
import { createComponent } from '@lit/react';
import { AuroTheme as AuroThemeElement } from './Theme';

// Type for the custom event detail
type ThemeChangeEventDetail = {
  theme: 'light' | 'dark';
  tokens: Record<string, unknown>;
};

// Props including HTML attributes and custom props
type ReactAuroThemeProps = {
  theme?: 'light' | 'dark';
  children?: ReactNode;
  onAuroThemeChanged?: (e: CustomEvent<ThemeChangeEventDetail>) => void;
} & React.HTMLAttributes<HTMLElement>;

// Create the component with proper typing
export const AuroTheme = createComponent({
  tagName: 'auro-theme',
  elementClass: AuroThemeElement,
  react: React,
  events: {
    onAuroThemeChanged: 'auroThemeChanged',
  },
} as const);

// Re-export types and constants
export type { Theme } from './Theme';
export { THEMES } from './Theme';

// Export props type for consumers
export type { ReactAuroThemeProps as AuroThemeProps };