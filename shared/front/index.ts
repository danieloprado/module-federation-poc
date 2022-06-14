import { get, post, put, del, upload } from './api';
import { dispatchEvent, listenEvent } from './events';
import { getState, watchState, setState } from './state';

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    myEduzz: {
      api?: {
        get: typeof get;
        post: typeof post;
        put: typeof put;
        del: typeof del;
        upload: typeof upload;
      };
      getState?: typeof getState;
      setState?: typeof setState;
      watchState?: typeof watchState;
      dispatchEvent?: typeof dispatchEvent;
      listenEvent?: typeof listenEvent;
    };
  }
}

export function setup(apiEndpoint: string) {
  window.myEduzz = window.myEduzz ?? {};
  window.myEduzz.api = window.myEduzz.api ?? { get, post, put, del, upload };
  window.myEduzz.getState = window.myEduzz.getState ?? getState;
  window.myEduzz.setState = window.myEduzz.setState ?? setState;
  window.myEduzz.watchState = window.myEduzz.watchState ?? watchState;
  window.myEduzz.dispatchEvent = window.myEduzz.dispatchEvent ?? dispatchEvent;
  window.myEduzz.listenEvent = window.myEduzz.listenEvent ?? listenEvent;

  setState({ apiEndpoint });
}
