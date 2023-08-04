import { LitElement, html, unsafeCSS } from 'lit';
import style from '../index.css?inline';
import { customElement } from 'lit/decorators.js';

@customElement('my-modal')
export class MyModal extends LitElement {

  static styles = unsafeCSS(style);

  render() {
    return html`
      <div class="canvas grid place-items-center bg-black/25">
        <div class="bg-white shadow border p-4 rounded -translate-y-3 w-full max-w-sm">
          <div class="cursor-pointer flex justify-end mb-2">
            <img class="h-6 w-6 opacity-80" src="x.svg" />
          </div>
          <slot></slot>
        </div>
      </div>
    `;
  }
}