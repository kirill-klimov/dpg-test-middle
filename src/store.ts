export type Data = Array<{
  country: string;
  cities: Array<string>;
}>;

type State = {
  departure: string;
  destination: string;
  leave_date: Date | null;
  return_date: Date | null;
  data?: Data;
};

type Action = {
  type: number;
  payload?: Partial<State>;
};

type Reducer = (state: State, action: Action) => State;

class Store {
  private _state: State;
  private _reducer: Reducer;
  private _subscribers: Array<() => void>;

  constructor(reducer: Reducer, initialState: State) {
    this._state = initialState;
    this._reducer = reducer;
    this._subscribers = [];
  }

  get state(): State {
    return this._state;
  }

  dispatch(action: Action): void {
    this._state = this._reducer(this._state, action);
    
    this._subscribers.forEach(sub => sub());
  }

  subscribe(fn: () => void): void {
    this._subscribers.push(fn);
  }

  unsubscribe(fn: () => void): void {
    this._subscribers = this._subscribers.filter(sub => sub !== fn);
  }
}

export enum Actions { SetState };

const reducer: Reducer = (state: State, action: Action) => {
  switch(action.type) {
    case Actions.SetState:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export const store = new Store(reducer, {
  departure: '',
  destination: '',
  leave_date: null,
  return_date: null,
});