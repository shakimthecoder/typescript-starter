import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Injectable()
export class GraphQLAuthGuard implements CanActivate {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,

    ){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const gqlCtx = context.getArgByIndex(2);
        const request: Request = gqlCtx.req;
        const token = this.extractTokenFromCookie(request);

        if(!token){
            throw new UnauthorizedException;
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
                });
                request['user'] = payload;
            console.log('payload', token)
        } catch (error) {
            console.log('error', error);
            throw new UnauthorizedException('Invalid or expired access token');
        }
        return true;

    }

    private extractTokenFromCookie(request: Request): string | null {
        return request.cookies?.access_token;
    }
}