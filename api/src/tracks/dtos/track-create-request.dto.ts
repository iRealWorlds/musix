import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";

export class TrackCreateRequestDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    publishedAt: Date;

    @IsNotEmpty()
    artistKey: number;
}