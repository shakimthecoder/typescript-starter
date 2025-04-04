import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service'; // Ensure the path is correct

@Module({
  providers: [UserService, UserResolver, PrismaService, JwtService]
})
export class UserModule {}
