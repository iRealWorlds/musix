import { IsNotEmpty, IsString } from "class-validator";

export class ArtistCreateRequestDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    description?: string;
}