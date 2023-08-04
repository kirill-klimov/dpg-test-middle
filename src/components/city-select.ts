import { Actions, Data, store } from './../store';
import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import style from '../index.css?inline';
import { findCities, trimStr } from '../utils';

@customElement('city-select')
export class CitySelect extends LitElement {

  static styles = unsafeCSS(style);

  @property()
  name = '';

  @property()
  city = '';

  @property({ type: Boolean })
  active = false;

  @property({ type: Array })
  cities: Data = [];

  @property({ type: Boolean })
  loading = false;

  connectedCallback(): void {
    super.connectedCallback();
    store.subscribe(this.updateCity.bind(this));

    (async () => {
      this.loading = true;
      const response = await fetch('https://countriesnow.space/api/v0.1/countries');
      const { data } = await response.json();
      store.dispatch({
        type: Actions.SetState,
        payload: { data }
      });
      this.loading = false;
    })();

    document.addEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (e: Event) => {
    if (!e.composedPath().includes(this)) this.active = false;
  };

  disconnectedCallback(): void {
    document.removeEventListener('click', this.handleClickOutside);
    store.unsubscribe(this.updateCity.bind(this));
  }

  updateCity() {
    this.city = store.state[this.name as keyof typeof store.state] as string;
  }

  handleInput(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.city = value;
    this.active = !!value.length;
    if (value.length) {
      const matches = findCities(store.state.data as Data, value);
      this.cities = matches.slice(0, 4);
    }
  }

  handleFocus(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    if (value.length) {
      this.active = true;
    }
  }

  handleClick(city: string, country: string) {
    const value = `${city}, ${country}`;
    store.dispatch({
      type: Actions.SetState,
      payload: { [this.name]: value }
    })
    this.city = value;
    this.active = false;
    console.log(this.city, store.state);
    
  }

  render() {
    return html`
      <div class="relative">
        <div class="flex items-center bg-gray-200 rounded py-2 px-3">
          <img class="h-4 w-4 mr-2" src="location.svg" alt="location icon" />
          <input
          @focus=${this.handleFocus}
          @input=${this.handleInput}
          .value=${trimStr(this.city, 21)}
          placeholder="Search city..."
          class="bg-transparent outline-none text-neutral-800" 
          type="text" />
        </div>

        ${this.active ?
        html`
        <div class="absolute top-[150%] bg-white rounded border px-4 py-3 shadow w-[150%]">
          ${
            this.loading ? 
            html`
              <div class="flex justify-center py-4">
                <div class="h-8 w-8 border-[3px] border-neutral-700 rounded-full border-l-transparent animate-spin"></div>
              </div>
            `
            : !this.cities.length ?
            html`
              <div class="text-gray-500">No cities found</div>
            ` :
            this.cities.map((item, i) => html`
              <div class="mb-[6px]">
                <span class="font-medium text-sm text-gray-500">${item.country}</span>
                <div class="mb-1">
                  ${item.cities.map((city) => html`
                    <div
                    @click=${() => this.handleClick(city, item.country)} 
                    class="py-1 cursor-pointer hover:bg-gray-200 rounded px-2 -mx-2">${city}</div>
                  `)}
                </div>
                ${i === (this.cities.length - 1) ? '' : html`<hr />`}
              </div>
            `)
          }
        </div>` : html``}
      </div>
    `;
  }
}