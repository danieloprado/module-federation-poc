import * as https from 'https';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as axios from 'axios';

import { IAppConfig } from '~/config';

import { IAccountsValidate } from './dto/user';

@Injectable()
export class AccountsService {
  private client: axios.AxiosInstance;
  private accounts: { ENDPOINT_API: string; PARTNER_ID: string; PARTNER_SECRET: string };

  constructor(private configService: ConfigService) {
    this.accounts = this.configService.get<IAppConfig['ACCOUNTS']>('ACCOUNTS');
    this.client = axios.default.create({
      baseURL: this.accounts.ENDPOINT_API,
      timeout: 20_000,
      validateStatus: () => true,
      httpsAgent: new https.Agent({ keepAlive: true })
    });
  }

  async validateToken(token: string): Promise<IAccountsValidate> {
    const response = await this.client.post('/validate', {
      token,
      secret: this.accounts.PARTNER_SECRET,
      partner: this.accounts.PARTNER_ID,
      validateStatus: () => true
    });
    return response?.data;
  }

  async validateSession(accountsSessionId: string, userId: string): Promise<boolean> {
    if (!accountsSessionId) {
      return true;
    }
    const response = await this.client.get(`/session/${accountsSessionId}`);
    const data = response?.data;
    return data?.active && data?.user == userId;
  }
}
