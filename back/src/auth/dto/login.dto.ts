import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @ApiProperty()
  public token: string;
}
