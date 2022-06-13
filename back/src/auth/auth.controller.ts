import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { ITokenResponseDto } from './dto/token.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/validate')
  async validateToken(@Body() request: LoginDTO): Promise<ITokenResponseDto> {
    return this.authService.validate(request);
  }
}
