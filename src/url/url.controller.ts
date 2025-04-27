import { Body, Controller, Delete, Get, Headers, HttpCode, HttpStatus, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { HeaderUserId } from "src/common/decoretors/header-user-id.decorator";
import { OptionalAuthGuard } from "src/common/guards/optional-auth.guard";
import { ShortenUrlDto } from "./dto/shorten-url.dto";
import { UrlService } from "./url.service";
import { AuthGuard } from "src/common/guards/auth.guard";
import { UpdateByIdAndUserIdDto } from "./dto/update-by-id-and-user-id-url.dto";
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { Url } from "@prisma/client";

@Controller('/url')
export class UrlController {
    constructor(
        private urlService: UrlService
    ) { };

    @UseGuards(OptionalAuthGuard)
    @Post('/shorten')
    @ApiOperation({ summary: "Cria uma URL encurtada" })
    @ApiHeader({
        name: 'Authorization',
        description: 'Aqui você irá informar o seu token para vincular a URL encurtada, ao seu usuário'
    })
    @ApiBody({
        schema: {
            example: {
                url: 'SUA URL'
            } as ShortenUrlDto
        },
        description: 'URL que você deseja encurtar'
    })
    @ApiResponse({
        schema: {
            example: {
                id: 'ID DA URL',
                userId: 'SEU ID',
                origin: 'SUA URL',
                clicks: 1989,
                create_at: new Date(),
                update_at: new Date(),
                delete_at: null,
            } as Url
        },
        description: 'Ao criar a sua URL encurtada com sucesso, você irá receber a seguinte responsta:',
        status: HttpStatus.CREATED
    })
    async shorten(@HeaderUserId() userId: string | null, @Body() { url }: ShortenUrlDto) {
        return await this.urlService.shorten(userId, url);
    };

    @Get()
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: "Pegar todas as URL's do usuário"
    })
    @ApiHeader({
        name: 'Token',
        description: 'Seu token.',
        required: true
    })
    @ApiResponse({
        schema: {
            example: [
                {
                    id: 'ID DA URL',
                    userId: 'SEU ID',
                    origin: 'SUA URL',
                    clicks: 1989,
                    create_at: new Date(),
                    update_at: new Date(),
                    delete_at: null,
                },
                {
                    id: 'ID DA URL',
                    userId: 'SEU ID',
                    origin: 'SUA URL',
                    clicks: 1989,
                    create_at: new Date(),
                    update_at: new Date(),
                    delete_at: null,
                },
                {
                    id: 'ID DA URL',
                    userId: 'SEU ID',
                    origin: 'SUA URL',
                    clicks: 1989,
                    create_at: new Date(),
                    update_at: new Date(),
                    delete_at: null,
                }
            ] as Array<Url>
        }
    })
    async getByUserId(@HeaderUserId() userId: string) {
        return this.urlService.getByUserId(userId);
    };

    @Delete(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Excluir uma URL' })
    @ApiHeader({
        name: 'Token',
        description: 'Seu token.',
        required: true
    })
    @ApiParam({
        name: 'id',
        description: 'ID da URL encurtada'
    })
    @ApiResponse({ description: 'Ao excluir a sua URL encurtada, você não receberá nenhum conteúdo' })
    async inactiveByIdAndUserId(@HeaderUserId() userId: string, @Param('id') id: string) {
        await this.urlService.inactiveByIdAndUserId(userId, id);
    };

    @Put(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Atualizar a sua URL encurtada' })
    @ApiHeader({
        name: 'Token',
        description: 'Seu token.',
        required: true
    })
    @ApiParam({
        name: 'id',
        description: 'ID da sua URL encurtada'
    })
    @ApiBody({
        schema: {
            example: {
                url: 'SUA NOVA URL'
            } as ShortenUrlDto
        },
        description: 'Sua nova URL para encurtar'
    })
    @ApiResponse({
        schema: {
            example: {
                id: 'ID DA URL',
                userId: 'SEU ID',
                origin: 'SUA URL',
                clicks: 1989,
                create_at: new Date(),
                update_at: new Date(),
                delete_at: null,
            } as Url
        },
        description: 'Ao ataulizar a sua URL encurtada com sucesso, você irá receber a seguinte responsta:',
        status: HttpStatus.OK
    })
    async update(@HeaderUserId() userId: string, @Param('id') id: string, @Body() { url }: UpdateByIdAndUserIdDto) {
        return this.urlService.update(userId, id, url);
    };
};