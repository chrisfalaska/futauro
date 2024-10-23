import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './styles';

const DEFAULT_NAME = 'Alaska Air';

export interface HelloWorldProps {
  /**
   * The name to display in the greeting message.
   * @default DEFAULT_NAME
   */
  name: string;
}

/**
 * The auro-hello-world element is a custom element that displays a greeting message.
 * 
 * @element auro-hello-world
 * 
 * @example
 * <auro-hello-world name="Alaska Air"></auro-hello-world>
 */
@customElement('auro-hello-world')
export class HelloWorld extends LitElement implements HelloWorldProps {
  static override styles = styles;

  @property({ type: String, reflect: true }) name = DEFAULT_NAME;

  override render() {
    return html`
      <div class="greeting">
        Hello <span class="highlight">${this.name}</span>!
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'auro-hello-world': HelloWorld;
  }
}