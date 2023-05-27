import { Module } from '@nestjs/common';
import { UserService } from "@api/user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@api/database/entities/user.entity";
import { UserController } from "@api/user/user.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User
        ])
    ],
    providers: [UserService],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {}
