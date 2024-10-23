export const base = {
  spacing: {
    unit: '4px',
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  
  typography: {
    fontFamilies: {
      body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      heading: 'inherit',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace'
    },
    fontSizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      xxl: '24px'
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      bold: 700
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75
    }
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  },

  animation: {
    durations: {
      fast: '150ms',
      normal: '300ms',
      slow: '450ms'
    },
    easings: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)'
    }
  },

  radii: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    pill: '999px'
  }
}