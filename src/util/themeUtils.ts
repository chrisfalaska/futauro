/**
 * Generate CSS variables from theme tokens
 */
export function generateCSSVariables(tokens: Record<string, any>, prefix = ''): Record<string, string> {
  return Object.entries(tokens).reduce((vars, [key, value]) => {
    const varName = prefix ? `--${prefix}-${key}` : `--${key}`;
    
    if (value && typeof value === 'object') {
      return {
        ...vars,
        ...generateCSSVariables(value, key)
      };
    }
    
    return {
      ...vars,
      [varName]: value as string
    };
  }, {});
}