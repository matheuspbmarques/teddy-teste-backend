import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateUserDto): Promise<User> {
        const emailExist = await this.prisma.user.findFirst({
            where: {
                email: data.email
            }
        });

        if (emailExist) {
            throw new HttpException({
                error: 'EMAIL-ALREADY-EXISTS',
                message: 'O e-mail informado já existe'
            }, HttpStatus.CONFLICT);
        };

        return await this.prisma.user.create({ data: {
            ...data,
            create_at: new Date(),
            update_at: new Date()
        } });
    };

    async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                refresh_token: refreshToken
            }
        });
    };

    async getById(id: string): Promise<User> {
        const user = await this.prisma.user.findFirst({ where: { id } });

        if (!user) {
            throw new NotFoundException('User not found');
        };

        return user;
    };
};