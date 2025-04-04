import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service'; // Ensure the path is correct


@Module({
  providers: [AuthResolver, AuthService, JwtService, PrismaService]
})
export class AuthModule {}
