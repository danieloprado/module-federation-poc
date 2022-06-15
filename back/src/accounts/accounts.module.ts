import * as https from 'https';

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { IAppConfig } from '~/config';

import { AccountsService } from './accounts.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get<IAppConfig['ACCOUNTS']>('ACCOUNTS').ENDPOINT_API,
        timeout: 20_000,
        validateStatus: () => true,
        httpsAgent: new https.Agent({ keepAlive: true })
      }),
      inject: [ConfigService]
    })
  ],
  exports: [AccountsService],
  providers: [AccountsService]
})
export class AccountsModule {}
