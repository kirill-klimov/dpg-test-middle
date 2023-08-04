import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import style from '../index.css?inline';

@customElement('date-picker')
export class DatePicker extends LitElement {

  static styles = unsafeCSS(style);

  @property()
  leave_date = 'Не выбрана';

  @property({ type: Number })
  leave_month = (new Date()).getMonth();

  @property()
  return_date = 'Не выбрана';

  @property({ type: Number })
  return_month = (new Date()).getMonth() + 1;

  @property({ type: Boolean })
  active = false;

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (e: Event) => {
    if (!e.composedPath().includes(this)) this.active = false;
  };

  disconnectedCallback(): void {
    document.removeEventListener('click', this.handleClickOutside);
  }

  render() {
    return html`
      <div class="relative">
        <div 
        @click=${() => this.active = !this.active}
        class="flex items-center bg-gray-200 rounded py-2 px-3 cursor-pointer">
          <div class="flex items-center w-[150px] justify-center">
            <img class="h-4 w-4 mr-2" src="calendar.svg" alt="calendar icon" />
            <span class="text-neutral-700">${this.leave_date}</span>
          </div>
          <div class="w-8 h-[1px] mx-3 bg-gray-400"></div>
          <div class="flex items-center w-[150px] justify-center">
            <img class="h-4 w-4 mr-2" src="calendar.svg" alt="calendar icon" />
            <span class="text-neutral-700">${this.return_date}</span>
          </div>
        </div>

        ${
          this.active ?
          html`
          <div class="absolute p-4 bg-white border shadow top-[150%]">
            <div class="flex gap-6">
              <my-calendar month=${this.leave_month}></my-calendar>
              <my-calendar month=${this.return_month}></my-calendar>
            </div>
            <hr />
            <div class="flex justify-between items-center mt-6 mb-3">
              <label class="flex items-center cursor-pointer select-none">
                <input type="checkbox" class="mr-2" />
                <span class="text-sm">Без конечной даты</span>
              </label>
              <button @click=${() => this.active = false} class="button">Готово</button>
            </div>
          </div>
          ` : ''
        }
      </div>
    `;
  }
}