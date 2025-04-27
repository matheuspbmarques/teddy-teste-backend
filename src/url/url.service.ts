import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ShortenUrlDto } from "./dto/shorten-url.dto";
import { Url } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";

@Injectable()
export class UrlService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService
    ) { };

    private generateRandomCode(): string {
        const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let codigo: string = '';

        for (let i = 0; i < 6; i++) {
            const index = Math.floor(Math.random() * caracteres.length);
            codigo += caracteres[index];
        };

        return codigo;
    };

    private async urlExists(id: string): Promise<boolean> {
        const url = await this.prisma.url.findFirst({ where: { id } });

        return url ? true : false;
    };

    private async generateShortenCode(): Promise<string> {
        let code: string;
        let exists: boolean;

        do {
            code = this.generateRandomCode();
            exists = await this.urlExists(code);
        } while (exists);

        return code;
    };

    private async updateClicks(id: string, currentClicks: number): Promise<void> {
        await this.prisma.url.update({
            where: { id },
            data: {
                clicks: currentClicks + 1,
                update_at: new Date()
            }
        });
    };

    private async userExists(userId: string): Promise<void> {
        await this.userService.getById(userId);
    };

    async shorten(userId: string | null, url: string): Promise<Url> {
        return await this.prisma.url.create({
            data: {
                id: await this.generateShortenCode(),
                userId: userId,
                origin: url,
                clicks: 0,
                create_at: new Date(),
                update_at: new Date(),
            }
        });
    };

    async getById(id: string): Promise<string> {
        const url = await this.prisma.url.findFirst({ where: { id } });

        if (!url) {
            throw new HttpException('URL not found', HttpStatus.NOT_FOUND);
        };

        await this.updateClicks(url.id, url.clicks);

        return url.origin;
    };

    async getByUserId(userId: string): Promise<Array<Url>> {
        const user = this.prisma.user.findFirst({ where: { id: userId } });

        if (!user) {
            throw new NotFoundException('User not found');
        };

        return await this.prisma.url.findMany({
            where: {
                userId,
                delete_at: null
            }
        });
    };

    async inactiveByIdAndUserId(userId: string, id: string) {
        await this.prisma.url.update({
            where: { userId, id },
            data: {
                delete_at: new Date()
            }
        });
    };

    async update(userId: string, id: string, url: string): Promise<Url> {
        await this.userExists(userId);

        if (!await this.urlExists(id)) {
            throw new NotFoundException('URL not found');
        };

        return this.prisma.url.update({
            where: {
                userId,
                id,
                delete_at: null
            },
            data: {
                origin: url
            }
        });
    };
};