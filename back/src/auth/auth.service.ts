import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AccountsService } from '~/accounts/accounts.service';

import { IJwtUser } from './dto/jwt-user.dto';
import { LoginDTO } from './dto/login.dto';
import { ITokenResponseDto } from './dto/token.response';

@Injectable()
export class AuthService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validate(validateTokenDto: LoginDTO): Promise<ITokenResponseDto> {
    const validateResponse = await this.accountsService.validateToken(validateTokenDto.token);
    if (!validateResponse?.user?.name) {
      throw new UnauthorizedException('Token invalido');
    }

    const user: any = null; //TODO
    return this.generateToken(user);
  }

  private async generateToken(user: any): Promise<ITokenResponseDto> {
    return {
      user,
      token: this.generateJwtToken(user)
    };
  }

  private generateJwtToken(user: any, expiresIn = this.configService.get('JWT_EXPIRES_IN', '15h')): string {
    return this.jwtService.sign(this.generateJwtPayload(user), {
      expiresIn
    });
  }

  private generateJwtPayload(user: any): IJwtUser {
    return {
      id: user.id,
      name: user.name
    };
  }
}
