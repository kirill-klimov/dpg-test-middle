import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import style from '../index.css?inline';

@customElement('ticket-search')
export class TicketSearch extends LitElement {

  static styles = unsafeCSS(style);

  @property({ type: Boolean })
  showModal = false;

  render() {
    return html`
      <div class="bg-white p-5 pt-4 rounded-lg flex">
        <div class="mr-4">
          <span class="font-medium block mb-2">Откуда</span>
          <city-select name="destination"></city-select>
        </div>
        <div class="mr-4">
          <span class="font-medium block mb-2">Куда</span>
          <city-select name="departure"></city-select>
        </div>
        <div class="mr-4">
          <span class="font-medium block mb-2">Даты</span>
          <date-picker></date-picker>
        </div>
        <div>
          <div class="h-[1.5rem] mb-2"></div>
          <button class="button">Найти</button>
        </div>
      </div>
    `;
  }
}