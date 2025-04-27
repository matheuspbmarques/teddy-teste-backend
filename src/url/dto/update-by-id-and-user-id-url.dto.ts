import { IsString, IsUrl } from "class-validator";

export class UpdateByIdAndUserIdDto {
    @IsString()
    @IsUrl()
    url: string;
};