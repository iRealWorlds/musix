import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "@api/auth/auth.module";
import { Track } from "@api/database/entities/track.entity";
import { ArtistsModule } from "@api/artists/artists.module";
import { Artist } from "@api/database/entities/artist.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Track, Artist]),
    AuthModule,
    ArtistsModule
  ],
  controllers: [TracksController]
})
export class TracksModule {}
