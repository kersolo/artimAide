import { PartialType } from '@nestjs/mapped-types';
import { RegisterLoginDto } from './register-auth.dto';

export class UpdateAuthDto extends PartialType(RegisterLoginDto) {}
