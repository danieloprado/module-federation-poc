import { ArgumentsHost, Catch, HttpException, HttpServer, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseExceptionFilter } from '@nestjs/core';

import * as Sentry from '@sentry/node';
import { AxiosError } from 'axios';
import { Request } from 'express';

import { IAppConfig } from './config';

Error.prepareStackTrace = err => {
  return err.stack
    .split('\n')
    .filter(x => !x.includes('node_modules'))
    .join('\n');
};

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  private ignoreBaseUrls: string[];

  constructor(applicationRef: HttpServer, private readonly configService: ConfigService<IAppConfig>) {
    super(applicationRef);

    const ACCOUNTS = this.configService.get<IAppConfig['ACCOUNTS']>('ACCOUNTS');
    this.ignoreBaseUrls = [ACCOUNTS.ENDPOINT_API];

    const SENTRY = this.configService.get<IAppConfig['SENTRY']>('SENTRY');
    const VERSION = this.configService.get<IAppConfig['VERSION']>('VERSION');

    Sentry.init({
      dsn: SENTRY.DSN,
      environment: SENTRY.ENV,
      release: VERSION,
      tracesSampleRate: 0.25
    });
  }

  public catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    this.sendToSentry(request, exception);
    super.catch(exception, host);
  }

  private sendToSentry(request: Request, exception: any) {
    const axiosError: AxiosError = exception;
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const send = status >= 500 && !this.ignoreBaseUrls.includes(axiosError?.config?.baseURL);

    if (!send) {
      return;
    }

    const clientIP = request.headers['x-forwarded-for'] as string;

    exception.errorData = {
      req: {
        clientIP,
        method: request?.method,
        url: request?.url,
        queryString: request.params,
        body: request.body
      },
      axios: {
        request: {
          baseURL: axiosError?.config?.baseURL,
          url: axiosError?.config?.url,
          method: axiosError?.config?.method,
          params: JSON.stringify(axiosError?.config?.params ?? {}, null, 2),
          data: JSON.stringify(axiosError?.config?.data ?? {}, null, 2),
          headers: JSON.stringify(axiosError?.config?.headers ?? {}, null, 2)
        },
        response: {
          status: axiosError?.response?.status,
          data: JSON.stringify(axiosError?.response?.data ?? {}, null, 2)
        }
      }
    };

    if (axiosError?.isAxiosError) {
      exception.message = `API: ${axiosError?.config?.baseURL} - ${axiosError?.response?.status ?? '-1'}`;
    }

    Sentry.withScope(scope => {
      scope.setExtras(exception.errorData);
      const user: any = (request as any).user;

      if (user) {
        scope.setUser({ id: user.id.toString(), email: user.email, username: user.email });
      }

      if (axiosError?.isAxiosError) {
        scope.setTag('axios-url', axiosError?.config?.url);
        scope.setTag('axios-status', axiosError?.response?.status ?? '-1');
      }

      scope.setTag('url', `${request.method}:${request.url}`);
      scope.setTag('client-ip', clientIP);

      const error: Error = exception.originalError || exception;
      Sentry.captureException(error);
    });
  }
}
