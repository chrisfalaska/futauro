import { LitElement, html } from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { styles } from './styles';

@customElement('auro-hello-world')
export class HelloWorld extends LitElement {
  static override styles = styles;

  @property() name = 'Somebody';

  override render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'auro-hello-world': HelloWorld;
  }
}