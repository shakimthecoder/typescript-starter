import { Resolver, Context, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.type';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from 'src/auth/graphlql-auth-guard';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as GraphQlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';

@Resolver()
export class UserResolver {
    constructor(
     private readonly userService: UserService,
    ){}

    @UseGuards(GraphQLAuthGuard)
    @Mutation(() => User)
    async updateProfile(
        @Args('fullname') fullname: string,
        @Args('file', { type: () => GraphQlUploadExpress.GraphQLUpload, nullable: true})
        file: GraphQlUploadExpress.file,
        @Context() context: { req: Request } , ) {
            const imageUrl = file ? await this.storeImageAndGetUrl(file): null;
            const userId = context.req.user.sub;
            return this.userService.updateProfile(userId, fullname, imageUrl)
        }
        private storeImageAndGetUrl(file: GraphQlUploadExpress.file) {
            const { createReadStream, filename } = file;
            const uniqueFilename = `${uuidv4()}-${filename}`;
            const imagePath = join(process.cwd(), 'public', uniqueFilename);
            const imageUrl = `${process.env.APP_URL}/${uniqueFilename}`;
            const readStream = createReadStream();
            readStream.pipe(createWriteStream(imagePath));
            return imageUrl;
            
        }
}
