export interface IMyEduzzState {
  authToken?: string;
  apiEndpoint?: string;
}

(window as any).__myEduzzState = (window as any).__myEduzzState ?? {};
const state: {
  listeners: Array<(state: IMyEduzzState) => void>;
  value: IMyEduzzState;
} = (window as any).__myEduzzState;

export function setState(newState: Partial<IMyEduzzState>) {
  state.value = { ...(state.value ?? {}), ...newState };
  state.listeners?.forEach(l => l(state.value));
}

export function getState(): IMyEduzzState {
  return state?.value ?? {};
}

export function watchState(listener: (state: IMyEduzzState) => void) {
  state.listeners = [...(state.listeners ?? []), listener];

  return () => {
    state.listeners = state.listeners.filter(l => l != listener);
  };
}
