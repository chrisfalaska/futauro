import { LitElement, html } from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { styles } from './styles';

@customElement('auro-hello-world')
export class HelloWorld extends LitElement {
  static override styles = styles;

  @property({ type: String }) name = 'Somebody';

  override render() {
    return html`<p class="primary-color">Hello, ${this.name}!</p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'auro-hello-world': HelloWorld;
  }
}