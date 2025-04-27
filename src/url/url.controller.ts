import { Body, Controller, Delete, Get, Headers, HttpCode, HttpStatus, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { HeaderUserId } from "src/common/decoretors/header-user-id.decorator";
import { OptionalAuthGuard } from "src/common/guards/optional-auth.guard";
import { ShortenUrlDto } from "./dto/shorten-url.dto";
import { UrlService } from "./url.service";
import { AuthGuard } from "src/common/guards/auth.guard";
import { UpdateByIdAndUserIdDto } from "./dto/update-by-id-and-user-id-url.dto";

@Controller('/url')
export class UrlController {
    constructor(
        private urlService: UrlService
    ) { };

    @UseGuards(OptionalAuthGuard)
    @Post('/shorten')
    async shorten(@HeaderUserId() userId: string | null, @Body() { url }: ShortenUrlDto) {
        return await this.urlService.shorten(userId, url);
    };

    @Get()
    @UseGuards(AuthGuard)
    async getByUserId(@HeaderUserId() userId: string) {
        return this.urlService.getByUserId(userId);
    };

    @Delete(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async inactiveByIdAndUserId(@HeaderUserId() userId: string, @Param('id') id: string) {
        await this.urlService.inactiveByIdAndUserId(userId, id);
    };

    @Put(':id')
    @UseGuards(AuthGuard)
    async update(@HeaderUserId() userId: string, @Param('id') id: string, @Body() { url }:UpdateByIdAndUserIdDto) {
        return this.urlService.update(userId, id, url);
    };
};