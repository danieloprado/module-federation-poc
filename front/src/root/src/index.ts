/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as refresh_runtime from 'react-refresh/runtime';

// @ts-ignore
global.$RefreshReg$ = () => null;
// @ts-ignore
global.$RefreshSig$ = () => () => null;

Object.assign(window, { __sharing_react_refresh_runtime__: refresh_runtime });

// @ts-ignore
import('./App');
