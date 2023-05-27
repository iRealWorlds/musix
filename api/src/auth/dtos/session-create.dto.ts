import { IsEmail, IsNotEmpty } from "class-validator";

export class SessionCreateDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}