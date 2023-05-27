import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Artist } from "@api/database/entities/artist.entity";
import { AuthModule } from "@api/auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Artist]),
    AuthModule
  ],
  controllers: [ArtistsController]
})
export class ArtistsModule {}
