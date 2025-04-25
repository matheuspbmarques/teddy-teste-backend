import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { };

    async signUp({ name, email, password }: CreateUserDto) {
        const salt = await bcrypt.genSalt();
        const passwordHashed = await bcrypt.hash(password, salt);

        const user = await this.userService.create({
            name, email, password: passwordHashed
        });

        const { accessToken, refreshToken } = await this.generateTokens(user.id);

        await this.userService.updateRefreshToken(user.id, refreshToken);

        return { accessToken, refreshToken };
    };

    async generateTokens (userId: string) {
        const secret = this.configService.get<string>('JWT_SECRET');

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({ sub: userId }, { expiresIn: '12h', secret: secret }),
            this.jwtService.signAsync({ sub: userId }, { expiresIn: '7d', secret: secret })
        ]);

        return { accessToken, refreshToken };
    };
};