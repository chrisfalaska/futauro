import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { lightTheme } from './tokens/lightTheme';
import { darkTheme } from './tokens/darkTheme';

// Define available themes
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

// Create type from theme values
export type Theme = typeof THEMES[keyof typeof THEMES]

// Create a map of theme tokens
const themeTokenMap: Record<Theme, typeof lightTheme> = {
  [THEMES.LIGHT]: lightTheme,
  [THEMES.DARK]: darkTheme,
};

// Default theme
const DEFAULT_THEME = THEMES.LIGHT;

interface ThemeContext {
  getTheme: () => Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  tokens: typeof lightTheme
}

const THEME_STORAGE_KEY = 'auro-theme-preference'

declare global {
  interface Window {
    auroThemeContext: ThemeContext
  }

  interface HTMLElementTagNameMap {
    'auro-theme': AuroTheme
  }
}

@customElement('auro-theme')
export class AuroTheme extends LitElement {
  @property({ type: String, reflect: true, attribute: 'theme' })
  theme?: Theme = DEFAULT_THEME

  @state()
  private mediaQuery: MediaQueryList

  private themeContext: ThemeContext = {
    getTheme: () => this.theme as Theme,
    setTheme: (theme: Theme) => {
      this.theme = theme
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    },
    toggleTheme: () => {
      const themes = Object.values(THEMES);
      const currentIndex = themes.indexOf(this.theme as Theme);
      const nextIndex = (currentIndex + 1) % themes.length;
      const newTheme = themes[nextIndex];
      
      this.theme = newTheme;
      localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    },
    tokens: themeTokenMap[DEFAULT_THEME]
  }

  constructor() {
    super()
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    this.handleSystemThemeChange = this.handleSystemThemeChange.bind(this)
  }

  private getInitialTheme(): Theme {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null

    if (storedTheme && Object.values(THEMES).includes(storedTheme)) {
      return storedTheme as Theme
    }

    return this.mediaQuery.matches ? THEMES.DARK : THEMES.LIGHT
  }

  override connectedCallback(): void {
    super.connectedCallback()
    
    if (!this.theme) {
      this.theme = this.getInitialTheme()
    }

    this.mediaQuery.addEventListener('change', this.handleSystemThemeChange)
    
    this.themeContext.tokens = this.getThemeTokens()
    window.auroThemeContext = this.themeContext

    window.addEventListener('storage', this.handleStorageChange.bind(this))
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback()
    this.mediaQuery.removeEventListener('change', this.handleSystemThemeChange)
    window.removeEventListener('storage', this.handleStorageChange.bind(this))
  }

  private handleStorageChange(e: StorageEvent): void {
    if (e.key === THEME_STORAGE_KEY) {
      const newTheme = e.newValue as Theme | null
      if (newTheme && this.theme !== newTheme) {
        this.theme = newTheme
      }
    }
  }

  private handleSystemThemeChange(e: MediaQueryListEvent): void {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      this.theme = e.matches ? THEMES.DARK : THEMES.LIGHT
      this.dispatchThemeChange()
    }
  }

  private getThemeTokens() {
    return themeTokenMap[this.theme as Theme]
  }

  public resetTheme(): void {
    localStorage.removeItem(THEME_STORAGE_KEY)
    this.theme = this.mediaQuery.matches ? THEMES.DARK : THEMES.LIGHT
  }

  private generateCSSVariables(tokens: Record<string, any>, prefix = ''): Record<string, string> {
    return Object.entries(tokens).reduce((vars, [key, value]) => {
      const varName = prefix ? `--${prefix}-${key}` : `--${key}`
      
      if (value && typeof value === 'object') {
        return {
          ...vars,
          ...this.generateCSSVariables(value, key)
        }
      }
      
      return {
        ...vars,
        [varName]: value as string
      }
    }, {})
  }

  private dispatchThemeChange(): void {
    this.themeContext.tokens = this.getThemeTokens()
    
    const event = new CustomEvent('auroThemeChanged', {
      detail: {
        theme: this.theme,
        tokens: this.getThemeTokens()
      },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(event)
  }

  protected override updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('theme')) {
      this.dispatchThemeChange()
    }
  }

  override render() {
    const tokens = this.getThemeTokens()
    const cssVariables = this.generateCSSVariables(tokens)

    return html`
      <div style=${styleMap(cssVariables)}>
        <slot></slot>
      </div>
    `
  }
}