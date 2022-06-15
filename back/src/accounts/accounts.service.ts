import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { firstValueFrom } from 'rxjs';

import { IAccountsValidate } from './dto/user';

@Injectable()
export class AccountsService {
  private accounts: { ENDPOINT_API: string; PARTNER_ID: string; PARTNER_SECRET: string };

  constructor(private httpService: HttpService) {}

  async validateToken(token: string): Promise<IAccountsValidate> {
    const response = await firstValueFrom(
      this.httpService.post('/validate', {
        token,
        secret: this.accounts.PARTNER_SECRET,
        partner: this.accounts.PARTNER_ID,
        validateStatus: () => true
      })
    );
    return response?.data;
  }

  async validateSession(accountsSessionId: string, userId: string): Promise<boolean> {
    if (!accountsSessionId) {
      return true;
    }

    const response = await firstValueFrom(this.httpService.get(`/session/${accountsSessionId}`));
    const data = response?.data;
    return data?.active && data?.user == userId;
  }
}
