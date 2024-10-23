import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { lightTheme } from './tokens/lightTheme';
import { darkTheme } from './tokens/darkTheme';

/** Available theme options */
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type Theme = typeof THEMES[keyof typeof THEMES]

/** Map theme names to their respective token sets */
const themeTokenMap: Record<Theme, typeof lightTheme> = {
  [THEMES.LIGHT]: lightTheme,
  [THEMES.DARK]: darkTheme,
};

const DEFAULT_THEME = THEMES.LIGHT;
const THEME_STORAGE_KEY = 'auro-theme-preference'

interface ThemeContext {
  getTheme: () => Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  tokens: typeof lightTheme;
}

declare global {
  interface Window {
    auroThemeContext: ThemeContext;
  }

  interface HTMLElementTagNameMap {
    'auro-theme': AuroTheme;
  }
}

/**
 * The auro-theme component provides theming capabilities for Auro components.
 * It manages theme switching, system preference detection, and persistent theme storage.
 * 
 * @slot - Default slot for themed content
 * 
 * @fires auroThemeChanged - Fires when the theme changes with detail containing new theme and tokens
 * 
 * @example
 * Basic usage:
 * ```html
 * <auro-theme theme="light">
 *   <auro-component>Themed content here</auro-component>
 * </auro-theme>
 * ```
 * 
 * @example
 * Using theme context:
 * ```js
 * window.auroThemeContext.toggleTheme();
 * ```
 */
@customElement('auro-theme')
export class AuroTheme extends LitElement {
  /** The current theme */
  @property({ type: String, reflect: true, attribute: 'theme' })
  theme?: Theme = DEFAULT_THEME;

  @state()
  private mediaQuery: MediaQueryList;

  private themeContext: ThemeContext = {
    getTheme: () => this.theme as Theme,
    setTheme: (theme: Theme) => {
      this.theme = theme;
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    },
    toggleTheme: () => {
      const themes = Object.values(THEMES);
      const currentIndex = themes.indexOf(this.theme as Theme);
      const nextIndex = (currentIndex + 1) % themes.length;
      const newTheme = themes[nextIndex];
      
      this.theme = newTheme;
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    },
    tokens: themeTokenMap[DEFAULT_THEME]
  };

  constructor() {
    super();
    /** Look for user system setting */
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    /** Listen for theme changes */
    this.handleSystemThemeChange = this.handleSystemThemeChange.bind(this);
  }

  /** Return the initial theme based on stored preference or system setting */
  private getInitialTheme(): Theme {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;

    if (storedTheme && Object.values(THEMES).includes(storedTheme)) {
      return storedTheme as Theme;
    }

    return this.mediaQuery.matches ? THEMES.DARK : THEMES.LIGHT;
  }

  /** Set up event listeners and initializes theme */
  override connectedCallback(): void {
    super.connectedCallback();
    
    if (!this.theme) {
      this.theme = this.getInitialTheme();
    }

    this.mediaQuery.addEventListener('change', this.handleSystemThemeChange);
    
    this.themeContext.tokens = this.getThemeTokens();
    window.auroThemeContext = this.themeContext;

    window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

  /** Clean up event listeners */
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.mediaQuery.removeEventListener('change', this.handleSystemThemeChange);
    window.removeEventListener('storage', this.handleStorageChange.bind(this));
  }

  /** Handle theme changes from other windows/tabs */
  private handleStorageChange(e: StorageEvent): void {
    if (e.key === THEME_STORAGE_KEY) {
      const newTheme = e.newValue as Theme | null;
      if (newTheme && this.theme !== newTheme) {
        this.theme = newTheme;
      }
    }
  }

  /** Handle system theme preference changes */
  private handleSystemThemeChange(e: MediaQueryListEvent): void {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      this.theme = e.matches ? THEMES.DARK : THEMES.LIGHT;
      this.dispatchThemeChange();
    }
  }

  /** Return the token set for the current theme */
  private getThemeTokens() {
    return themeTokenMap[this.theme as Theme];
  }

  /** Reset theme to system preference */
  public resetTheme(): void {
    localStorage.removeItem(THEME_STORAGE_KEY);
    this.theme = this.mediaQuery.matches ? THEMES.DARK : THEMES.LIGHT;
  }

  /** Generate CSS variables from theme tokens */
  private generateCSSVariables(tokens: Record<string, any>, prefix = ''): Record<string, string> {
    return Object.entries(tokens).reduce((vars, [key, value]) => {
      const varName = prefix ? `--${prefix}-${key}` : `--${key}`;
      
      if (value && typeof value === 'object') {
        return {
          ...vars,
          ...this.generateCSSVariables(value, key)
        };
      }
      
      return {
        ...vars,
        [varName]: value as string
      };
    }, {});
  }

  /** Dispatche theme change event */
  private dispatchThemeChange(): void {
    this.themeContext.tokens = this.getThemeTokens();
    
    const event = new CustomEvent('auroThemeChanged', {
      detail: {
        theme: this.theme,
        tokens: this.getThemeTokens()
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  /** Handle property changes */
  protected override updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('theme')) {
      this.dispatchThemeChange();
    }
  }

  override render() {
    const tokens = this.getThemeTokens();
    const cssVariables = this.generateCSSVariables(tokens);

    return html`
      <div style=${styleMap(cssVariables)}>
        <slot></slot>
      </div>
    `;
  }
}