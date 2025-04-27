import { Body, Controller, Get, Param, Post, Query, Res, UseGuards } from "@nestjs/common";
import { HeaderUserId } from "src/common/decoretors/header-user-id.decorator";
import { OptionalAuthGuard } from "src/common/guards/optional-auth.guard";
import { ShortenUrlDto } from "./dto/shorten-url.dto";
import { UrlService } from "./url.service";
import { Response } from "express";

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

    @Get('/shorten/:id')
    async redirect(@Param('id') id: string, @Res() res: Response) {
        const origin = await this.urlService.getById(id);

        res.redirect(origin);
    };

    @Get()
    async get(@Query() query: any) {
        console.log(query);
    };
};