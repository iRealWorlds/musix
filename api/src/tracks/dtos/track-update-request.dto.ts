import { IsDate, IsString } from "class-validator";
import { Type } from "class-transformer";

export class TrackUpdateRequestDto {
    @IsString()
    name?: string;

    @IsDate()
    @Type(() => Date)
    publishedAt?: Date;
}