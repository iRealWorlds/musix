import {
    Body,
    Controller, Delete,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param, Patch,
    Post,
    Req,
    UnauthorizedException, UseGuards
} from '@nestjs/common';
import { Repository } from "typeorm";
import { Artist } from "@api/database/entities/artist.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ArtistCreateRequestDto } from "@api/artists/dtos/artist-create-request.dto";
import { Request } from "express";
import { User } from "@api/database/entities/user.entity";
import { ArtistDto } from "@api/artists/dtos/artist.dto";
import { ApiTags } from "@nestjs/swagger";
import { ArtistUpdateRequestDto } from "@api/artists/dtos/artist-update-request.dto";
import { AuthGuard } from "@api/auth/auth.guard";

/**
 *
 */
@ApiTags("Artists")
@Controller('artists')
@UseGuards(AuthGuard)
export class ArtistsController {

    constructor(
        @InjectRepository(Artist) private readonly _artistRepository: Repository<Artist>
    ) {
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async index(@Req() request: Request): Promise<ArtistDto[]> {
        if (!('identity' in request)) {
            console.log((request as unknown as any).identity);
            throw new UnauthorizedException()
        }

        const artists = await this._artistRepository.find({
            relations: ['user'],
            where: {
                user: {
                    id: (request.identity as User).id
                }
            }
        });

        return artists.map(a => new ArtistDto(a));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() data: ArtistCreateRequestDto, @Req() request: Request): Promise<ArtistDto> {
        if (!('identity' in request)) {
            throw new UnauthorizedException()
        }

        let artist = new Artist();
        artist.name = data.name;
        artist.description = data.description;
        artist.user = (request.identity as User);

        artist = await this._artistRepository.save(artist);

        return new ArtistDto(artist);
    }

    @Get(':key')
    @HttpCode(HttpStatus.OK)
    async show(@Req() request: Request, @Param('key') key: number): Promise<ArtistDto> {
        if (!('identity' in request)) {
            throw new UnauthorizedException()
        }

        const artist = await this._artistRepository.findOne({
            relations: ['user'],
            where: {
                id: key,
                user: {
                    id: (request.identity as User).id
                }
            },
        });

        if (artist === null) {
            throw new NotFoundException();
        }

        return new ArtistDto(artist);
    }

    @Patch(':key')
    @HttpCode(HttpStatus.OK)
    async update(@Req() request: Request, @Param('key') key: number, @Body() data: ArtistUpdateRequestDto): Promise<ArtistDto> {
        if (!('identity' in request)) {
            throw new UnauthorizedException()
        }

        let artist = await this._artistRepository.findOne({
            relations: ['user'],
            where: {
                id: key,
                user: {
                    id: (request.identity as User).id
                }
            }
        });

        if (artist === null) {
            throw new NotFoundException();
        }

        if (data.name !== undefined) {
            artist.name = data.name;
        }
        if (data.description !== undefined) {
            artist.description = data.description ?? undefined;
        }

        artist = await this._artistRepository.save(artist);

        return new ArtistDto(artist);
    }

    @Delete(':key')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Req() request: Request, @Param('key') key: number): Promise<void> {
        if (!('identity' in request)) {
            throw new UnauthorizedException()
        }

        const artist = await this._artistRepository.findOne({
            relations: ['user'],
            where: {
                id: key,
                user: {
                    id: (request.identity as User).id
                }
            }
        });

        if (artist === null) {
            throw new NotFoundException();
        }

        await this._artistRepository.delete(artist);
    }
}
