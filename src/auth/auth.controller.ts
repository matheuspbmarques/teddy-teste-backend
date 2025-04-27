import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { SignInAuthDto } from "./dto/sign-in-auth.dto";
import { AuthTokensResponse } from "./auth.interface";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { };

    @Post('sign-up')
    @ApiOperation({ summary: 'Criar uma nova conta' })
    @ApiBody({
        schema: {
            example: {
                name: 'Seu nome',
                email: 'example@email.com',
                senha: 'SUA SENHA'
            }
        }
    })
    @ApiResponse({
        schema: {
            example: {
                access_token: 'SEU TOKEN DE ACESSO',
                refresh_token: 'SEU TOKEN PARA ATUALIZAR O SEU access_token'
            }
        },
        status: HttpStatus.CREATED
    })
    async signUp(@Body() data: CreateUserDto): Promise<AuthTokensResponse> {
        return this.authService.signUp(data);
    };

    @Post('sign-in')
    @ApiOperation({ summary: 'Entrar na sua conta' })
    @ApiBody({
        schema: {
            example: {
                email: 'example@email.com',
                senha: 'SUA SENHA'
            }
        }
    })
    @ApiResponse({
        schema: {
            example: {
                access_token: 'SEU TOKEN DE ACESSO',
                refresh_token: 'SEU TOKEN PARA ATUALIZAR O SEU access_token'
            }
        },
        status: HttpStatus.CREATED
    })
    async signIn(@Body() data: SignInAuthDto): Promise<AuthTokensResponse> {
        return this.authService.signIn(data);
    };
};