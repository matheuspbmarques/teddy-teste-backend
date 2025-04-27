import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ShortenUrlDto } from "./dto/shorten-url.dto";
import { Url } from "@prisma/client";

@Injectable()
export class UrlService {
    constructor(
        private prisma: PrismaService
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

    private async urlExists(code: string): Promise<boolean> {
        const url = await this.prisma.url.findFirst({ where: { id: code } });

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
};