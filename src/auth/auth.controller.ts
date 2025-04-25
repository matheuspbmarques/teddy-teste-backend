import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { SignInAuthDto } from "./dto/sign-in-auth.dto";
import { AuthTokensResponse } from "./auth.interface";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { };

    @Post('sign-up')
    async signUp(@Body() data: CreateUserDto): Promise<AuthTokensResponse> {
        return this.authService.signUp(data);
    };

    @Post('sign-in')
    async signIn(@Body() data: SignInAuthDto): Promise<AuthTokensResponse> {
        return this.authService.signIn(data);
    };
};