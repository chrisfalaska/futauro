import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './styles';

/**
 * The auro-hello-world element is a custom element that displays a greeting message.
 * 
 * @element auro-hello-world
 * 
 * @example
 * <auro-hello-world name="Alaska Air"></auro-hello-world>
 */
@customElement('auro-hello-world')
export class HelloWorld extends LitElement {
  static override styles = styles;

  /**
   * The name to display in the greeting message.
   * @default "Alaska Air"
   * @attr name
   */
  @property({ type: String, reflect: true }) name = 'Alaska Air';

  override render() {
    return html`<p class="primary-color">Hello, ${this.name}!</p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'auro-hello-world': HelloWorld;
  }
}