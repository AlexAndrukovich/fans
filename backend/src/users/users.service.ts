import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private usersRepository: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.checkIfUserExists(createUserDto.email);

    const hashedPassword = await this.hashPassword(createUserDto.password);

    const user = await this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.getUser(user.id);
  }

  async verifyUser(email: string, password: string): Promise<User> {
    const user = await this.findUserByEmailOrThrow(email);

    await this.validatePassword(password, user.password);

    return user;
  }

  async getUser(id: string): Promise<User> {
    const user = await this.usersRepository.findByPk(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return user;
  }

  private async checkIfUserExists(email: string): Promise<void> {
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  private async findUserByEmailOrThrow(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid.');
    }

    return user;
  }

  private async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<void> {
    const passwordIsValid = await bcrypt.compare(plainPassword, hashedPassword);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
