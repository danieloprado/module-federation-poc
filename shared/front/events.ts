export interface ILoginPayload {
  user: string;
}

export interface ILogoutPayload {
  logut: string;
}
export interface IFrontEventPayloads {
  login: ILoginPayload;
  logout: null;
}

export type FRONT_EVENTS = keyof IFrontEventPayloads;

export class MyEduzzEvent<T> extends Event {
  constructor(event: FRONT_EVENTS, data?: T) {
    super(nameBuilder(event));
    this.data = data;
  }

  data?: T;
}

function nameBuilder(event: FRONT_EVENTS) {
  return `my-eduzz:${event}`;
}

export function dispatchEvent<E extends FRONT_EVENTS>(event: E, data: IFrontEventPayloads[E]) {
  window.dispatchEvent(new MyEduzzEvent(event, data));
}

export function listenEvent<E extends FRONT_EVENTS>(
  event: E,
  listener: (event: MyEduzzEvent<IFrontEventPayloads[E]>) => void
) {
  window.addEventListener(nameBuilder(event), listener);
  return () => window.removeEventListener(event, listener);
}
