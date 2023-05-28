import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param, Patch,
    Post, Query,
    Req,
    UnauthorizedException, UseGuards
} from '@nestjs/common';
import { Repository } from "typeorm";
import { Artist } from "@api/database/entities/artist.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { User } from "@api/database/entities/user.entity";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@api/auth/auth.guard";
import { Track } from "@api/database/entities/track.entity";
import { TrackDto } from "@api/tracks/dtos/track.dto";import { TrackCreateRequestDto } from "@api/tracks/dtos/track-create-request.dto";
import { TrackUpdateRequestDto } from "@api/tracks/dtos/track-update-request.dto";
import { TrackIndexRequestDto } from "@api/tracks/dtos/track-index-request.dto";

@ApiTags("Tracks")
@Controller('tracks')
@UseGuards(AuthGuard)
export class TracksController {

    constructor(
      @InjectRepository(Track) private readonly _trackRepository: Repository<Track>,
      @InjectRepository(Artist) private readonly _artistRepository: Repository<Artist>
    ) {
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async index(@Req() request: Request, @Query() params: TrackIndexRequestDto): Promise<TrackDto[]> {
        if (!('identity' in request)) {
            throw new UnauthorizedException()
        }

        let tracks = await this._trackRepository.find({
            relations: ['artist'],
            where: {
                artist: {
                    user: {
                        id: (request.identity as User).id
                    }
                }
            }
        });

        tracks = tracks.filter(track => {
            if (params.query) {
                if (!track.name.toLowerCase().includes(params.query.toLowerCase())) {
                    return false;
                }
            }

            return true;
        });

        return tracks.map(a => new TrackDto(a));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() data: TrackCreateRequestDto, @Req() request: Request): Promise<TrackDto> {
        if (!('identity' in request)) {
            throw new UnauthorizedException()
        }

        const artist = await this._artistRepository.findOneBy({
            id: data.artistKey
        });

        if (artist === null) {
            throw new BadRequestException([
                "An artist with the given key should exist",
            ], { cause: new Error(), description: 'Bad request' })
        }

        let track = new Track();
        track.name = data.name;
        track.publishedAt = data.publishedAt;
        track.artist = artist;

        track = await this._trackRepository.save(track);

        return new TrackDto(track);
    }

    @Get(':key')
    @HttpCode(HttpStatus.OK)
    async show(@Req() request: Request, @Param('key') key: number): Promise<TrackDto> {
        if (!('identity' in request)) {
            throw new UnauthorizedException()
        }

        const track = await this._trackRepository.findOne({
            relations: ['artist'],
            where: {
                id: key,
                artist: {
                    user: {
                        id: (request.identity as User).id
                    }
                }
            }
        });

        if (track === null) {
            throw new NotFoundException();
        }

        return new TrackDto(track);
    }

    @Patch(':key')
    @HttpCode(HttpStatus.OK)
    async update(@Req() request: Request, @Param('key') key: number, @Body() data: TrackUpdateRequestDto): Promise<TrackDto> {
        if (!('identity' in request)) {
            throw new UnauthorizedException()
        }

        let track = await this._trackRepository.findOne({
            relations: ['artist'],
            where: {
                id: key,
                artist: {
                    user: {
                        id: (request.identity as User).id
                    }
                }
            }
        });

        if (track === null) {
            throw new NotFoundException();
        }

        if (data.name !== undefined) {
            track.name = data.name;
        }
        if (data.publishedAt !== undefined) {
            track.publishedAt = data.publishedAt;
        }

        track = await this._trackRepository.save(track);

        return new TrackDto(track);
    }

    @Delete(':key')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Req() request: Request, @Param('key') key: number): Promise<void> {
        if (!('identity' in request)) {
            throw new UnauthorizedException()
        }

        const track = await this._trackRepository.findOne({
            relations: ['artist'],
            where: {
                id: key,
                artist: {
                    user: {
                        id: (request.identity as User).id
                    }
                }
            }
        });

        if (track === null) {
            throw new NotFoundException();
        }

        await this._trackRepository.delete(track);
    }
}
