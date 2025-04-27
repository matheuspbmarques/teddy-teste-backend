import { IsString, IsUrl } from "class-validator";

export class ShortenUrlDto {
    @IsString()
    @IsUrl()
    url: string;
};