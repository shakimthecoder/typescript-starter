import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterResponse } from './types';
import { RegisterDto } from './dto';
import { Response } from 'express';
import { BadRequestException } from '@nestjs/common';



@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ){}
   @Mutation(() => RegisterResponse)
    async register(
        @Args('registerInput') registerDTo: RegisterDto,
        @Context() context: { res: Response },
         ) {
            if(registerDTo.password !== registerDTo.confirmPassword){
                throw new BadRequestException({
                    confirmPassword: 'Password do not match'
                });
            }
            const { user } = await this.authService.registerUser(registerDTo, context.res);
            return { user };
         }

    @Query(() => String)
    async hello(){
        return 'hello';
    }
}
