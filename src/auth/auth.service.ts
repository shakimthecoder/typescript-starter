import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma.service';
import { Request } from 'express';
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService
    ){}
        async refreshToken(req: Request, res: Response){
           const refreshToken = req.cookies['refresh_token'];

           if(!refreshToken){
            throw new UnauthorizedException('Token not found');
            }
           let payload;
           try {
               payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
               })
           } catch (error) {
            throw new UnauthorizedException('Invalid or expired refresh token');
           }
           const userExists = await this.prisma.user.findUnique({
            where: { id.payload.sub}
         });
        }
    }
