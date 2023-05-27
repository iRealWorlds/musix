import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from "@api/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.get("JWT_SECRET"),
                signOptions: { expiresIn: '60s' },
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
    ],
    exports: [AuthService],
})
export class AuthModule {}
