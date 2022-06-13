/* eslint-disable @typescript-eslint/naming-convention */

import { IAccessToken } from '~/token/interfaces/access.interface';

declare module 'express' {
  interface Request {
    user?: IAccessToken;
  }
}
