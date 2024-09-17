import { Body, Post, Controller, Get, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './users.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@ApiTags('Users')
@Controller({ version: '1', path: 'users' })
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'create user' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'get user' })
  @ApiResponse({ status: 200, type: User })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
