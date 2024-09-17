import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from 'src/users/users.model';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const jwt = await this.authService.login(user, response);
    response.send(jwt); // or user or access and refresh token etc.
  }
}
