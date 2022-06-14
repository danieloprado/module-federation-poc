import { dispatchEvent, listenEvent } from './events';
import { getState, watchState, setState } from './state';

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    myEduzz: {
      getState?: typeof getState;
      setState?: typeof setState;
      watchState?: typeof watchState;
      dispatchEvent?: typeof dispatchEvent;
      listenEvent?: typeof listenEvent;
    };
  }
}

export function setup() {
  window.myEduzz = window.myEduzz ?? {};
  window.myEduzz.getState = window.myEduzz.getState ?? getState;
  window.myEduzz.setState = window.myEduzz.setState ?? setState;
  window.myEduzz.watchState = window.myEduzz.watchState ?? watchState;
  window.myEduzz.dispatchEvent = window.myEduzz.dispatchEvent ?? dispatchEvent;
  window.myEduzz.listenEvent = window.myEduzz.listenEvent ?? listenEvent;
}
