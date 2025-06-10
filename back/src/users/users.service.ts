import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({ data: createUserDto });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOneByEmail(email: string) {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  // async findOneByEmail(email: string) {
  //   return await this.prismaService.user.findUnique({ where: { email } });
  // }
}
