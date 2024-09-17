import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@user.com', description: 'email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'password' })
  @IsStrongPassword()
  readonly password: string;
}
