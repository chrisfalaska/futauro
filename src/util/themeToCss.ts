/** Convert a nested theme object to CSS custom properties */
export function themeToCSS(theme: Record<string, any>, prefix = ''): string {
  return Object.entries(theme).reduce((acc, [key, value]) => {
    const varName = prefix ? `--${prefix}-${key}` : `--${key}`;
    
    if (value && typeof value === 'object') {
      return `${acc}${themeToCSS(value, key)}`;
    }
    
    return `${acc}${varName}: ${value};\n`;
  }, '');
}