import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import IAuthToken from '@my-eduzz/shared/interfaces/auth/token';

import { AccountsService } from '~/accounts/accounts.service';

import { LoginDTO } from './dto/login.dto';
import { ITokenResponseDto } from './dto/token.response';

@Injectable()
export class AuthService {
  constructor(private accountsService: AccountsService, private jwtService: JwtService) {}

  async validate(validateTokenDto: LoginDTO): Promise<ITokenResponseDto> {
    const accounts = await this.accountsService.validateToken(validateTokenDto.token);
    if (!accounts?.user?.name) {
      throw new UnauthorizedException('Token invalido');
    }

    const user: IAuthToken = {
      id: accounts.user.eduzzIds[0],
      name: accounts.user.name,
      email: accounts.user.email,
      supportId: accounts.supportId
    };

    return {
      user,
      token: this.jwtService.sign(user)
    };
  }
}
