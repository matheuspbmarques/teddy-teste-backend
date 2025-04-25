import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
import { SignInAuthDto } from "./dto/sign-in-auth.dto";
import { AuthTokensResponse } from "./auth.interface";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private prisma: PrismaService
    ) { };

    private async generateTokens (userId: string): Promise<AuthTokensResponse> {
        const secret = this.configService.get<string>('JWT_SECRET');

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({ sub: userId }, { expiresIn: '12h', secret: secret }),
            this.jwtService.signAsync({ sub: userId }, { expiresIn: '7d', secret: secret })
        ]);

        return { accessToken, refreshToken };
    };

    async signUp({ name, email, password }: CreateUserDto): Promise<AuthTokensResponse> {
        const salt = await bcrypt.genSalt();
        const passwordHashed = await bcrypt.hash(password, salt);

        const user = await this.userService.create({
            name, email, password: passwordHashed
        });

        const { accessToken, refreshToken } = await this.generateTokens(user.id);

        await this.userService.updateRefreshToken(user.id, refreshToken);

        return { accessToken, refreshToken };
    };

    async signIn({ email, password }: SignInAuthDto): Promise<AuthTokensResponse> {
        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            throw new HttpException({
                error: 'USER-NOT-FOUND',
                message: 'O usuário não encontrado'
            }, HttpStatus.NOT_FOUND);
        };

        if (!await bcrypt.compare(password, user.password)) {
            throw new HttpException({
                error: 'PASSWORD-WRONG',
                message: 'A senha informada é invalida'
            }, HttpStatus.UNAUTHORIZED);
        };

        const { accessToken, refreshToken } = await this.generateTokens(user.id);

        await this.userService.updateRefreshToken(user.id, refreshToken);

        return { accessToken, refreshToken };
    };
};