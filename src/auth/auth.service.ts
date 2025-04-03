import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma.service';
import { Request } from 'express'''
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService
    ){
        async refreshToken(req: Request, res: Response){
           const refreshToken = req.cookies['refresh_token'];

           if(!refreshToken){
            throw new UnauthorizedException('Token not found');
           }
        }
    }
}
