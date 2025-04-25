import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {};

    @Post('sign-up')
    async signUp (@Body() data: CreateUserDto) {
        return this.authService.signUp(data);
    };
};