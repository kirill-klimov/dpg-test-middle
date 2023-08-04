import { LitElement, html, unsafeCSS } from "lit";
import style from '../index.css?inline';
import { customElement, property } from "lit/decorators.js";
import { calendarFromMonth, daysOfWeek, monthToString } from "../utils";

type Day = {
  id: number;
  day: number;
  month: number;
  status: string;
  disabled: boolean;
};

@customElement('my-calendar')
export class MyCalendar extends LitElement {

  static styles = unsafeCSS(style);

  @property({ type: Number })
  month!: number;

  @property({ type: Array })
  calendar!: Day[];

  connectedCallback(): void {
    super.connectedCallback();
    this.calendar = calendarFromMonth(this.month);
  }

  handleMonthClick(direction: number) {
    if (direction > 0) {
      this.month = this.month === 11 ? 0 : this.month + 1;
    } else if (direction < 0) {
      this.month = this.month === 0 ? 11 : this.month - 1;
    }
    this.calendar = calendarFromMonth(this.month);
  }

  render() {
    return html`
      <div>
        <div class="flex items-center justify-between select-none mb-4">
          <div 
          @click=${() => this.handleMonthClick(-1)} 
          class="cursor-pointer">
            <img class="h-4 w-4" src="chevron.svg" alt="chevron icon" />
          </div> 
          <span class="font-medium">${monthToString(this.month)}</span>
          <div 
          @click=${() => this.handleMonthClick(1)} 
          class="cursor-pointer">
            <img class="h-4 w-4 rotate-180 translate-y-[1px]" src="chevron.svg" alt="chevron icon" />
          </div> 
        </div>

        <div class="weekdays-grid mb-2">
          ${daysOfWeek.map(day => html`
            <span>${day}</span>
          `)}
        </div>

        <div class="calendar-grid mb-4">
          ${this.calendar.map((item) => html`
            <div 
            class=${`item ${item.disabled ? 'disabled' : ''}
            ${item.status}`}>${item.day}</div>
          `)}
        </div>
      </div>
    `;
  }
}