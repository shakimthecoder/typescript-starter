import { ObjectType, Field } from "@nestjs/graphql";
import { User }  from '../user/user.type'

@ObjectType()
export class RegisterResponse {
    @Field(() => User, { nullable: true})
    user?: User;
}

@ObjectType()
export class LoginResponse {
    @Field(() => User, { nullable: true})
    user?: User;
}

