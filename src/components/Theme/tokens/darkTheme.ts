import { base } from './base'

export const darkTheme = {
  ...base,
  colors: {
    background: {
      primary: '#212529',
      secondary: '#343A40',
      tertiary: '#495057'
    },
    text: {
      primary: '#F8F9FA',
      secondary: '#DEE2E6',
      disabled: '#868E96'
    },
    border: {
      default: '#495057',
      hover: '#868E96'
    },
    action: {
      primary: '#339AF0',
      primaryHover: '#228BE6',
      secondary: '#343A40',
      secondaryHover: '#495057'
    },
    feedback: {
      success: '#51CF66',
      error: '#FF6B6B',
      warning: '#FFB84D',
      info: '#22B8CF'
    }
  },

  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.24)',
    md: '0 4px 6px rgba(0,0,0,0.2)',
    lg: '0 10px 15px rgba(0,0,0,0.2)'
  }
}