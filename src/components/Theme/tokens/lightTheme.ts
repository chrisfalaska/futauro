import { base } from './base'

export const lightTheme = {
  ...base,
  colors: {
    background: {
      primary: '#FFFFFF',
      secondary: '#F8F9FA',
      tertiary: '#F1F3F5'
    },
    text: {
      primary: '#212529',
      secondary: '#495057',
      disabled: '#ADB5BD'
    },
    border: {
      default: '#DDE2E5',
      hover: '#ADB5BD'
    },
    action: {
      primary: '#228BE6',
      primaryHover: '#1971C2',
      secondary: '#E9ECEF',
      secondaryHover: '#DEE2E6'
    },
    feedback: {
      success: '#40C057',
      error: '#FA5252',
      warning: '#FD7E14',
      info: '#15AABF'
    }
  },

  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)'
  }
}