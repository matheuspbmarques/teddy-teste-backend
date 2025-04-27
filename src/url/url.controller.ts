import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { HeaderUserId } from "src/common/decoretors/header-user-id.decorator";
import { OptionalAuthGuard } from "src/common/guards/optional-auth.guard";
import { ShortenUrlDto } from "./dto/shorten-url.dto";
import { UrlService } from "./url.service";

@Controller('url')
export class UrlController {
    constructor(
        private urlService: UrlService
    ) { };

    @UseGuards(OptionalAuthGuard)
    @Post('shorten')
    async shorten(@HeaderUserId() userId: string | null, @Body() { url }: ShortenUrlDto) {
        return await this.urlService.shorten(userId, url);
    };
};