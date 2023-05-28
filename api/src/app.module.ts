import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "@api/app.controller";
import { AppService } from "@api/app.service";
import { AuthModule } from "@api/auth/auth.module";
import { UserModule } from "@api/user/user.module";
import { TypeOrmConfig } from "@api/database/typeorm.config";
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => new TypeOrmConfig(configService),
      inject: [ConfigService]
    }),
    AuthModule,
    UserModule,
    ArtistsModule,
    TracksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
