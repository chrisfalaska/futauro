import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    padding: var(--spacing-md, 1rem);
    background-color: var(--background-primary);
    color: var(--text-primary);
    border: 1px solid var(--border-default);
    border-radius: var(--radii-md, 6px);
    box-shadow: var(--shadows-sm);
    transition: all var(--animation-durations-normal) var(--animation-easings-easeInOut);
  }

  :host(:hover) {
    border-color: var(--border-hover);
    box-shadow: var(--shadows-md);
  }

  .greeting {
    font-family: var(--typography-fontFamilies-body);
    font-size: var(--typography-fontSizes-lg);
    font-weight: var(--typography-fontWeights-medium);
    color: var(--text-primary);
  }

  .highlight {
    color: var(--action-primary);
    transition: color var(--animation-durations-fast) var(--animation-easings-easeOut);
  }

  .highlight:hover {
    color: var(--action-primaryHover);
  }
`