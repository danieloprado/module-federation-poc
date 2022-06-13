/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-expect-error
global.$RefreshReg$ = () => null;
// @ts-expect-error
global.$RefreshSig$ = () => () => null;

// @ts-ignore
import('./App');
