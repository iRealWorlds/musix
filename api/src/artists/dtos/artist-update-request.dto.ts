import { IsString } from "class-validator";

export class ArtistUpdateRequestDto {
    @IsString()
    name?: string;

    @IsString()
    description?: string|null;
}