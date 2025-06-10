import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterLoginDto } from './dto/register-auth.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async register(@Body() payload: RegisterLoginDto) {
    //vérifie si il existe un user avec cet email
    const user = await this.userService.findOneByEmail(payload.email);
    if (user) {
      throw new HttpException('Email already exists', HttpStatus.FORBIDDEN);
    }
    // hash le password
    payload.password = await this.authService.hash(payload.password);
    //créé le nouveau user avec mail
    const newUser = await this.userService.create({ ...payload });

    return { message: 'User Created', user: newUser };
  }
}
