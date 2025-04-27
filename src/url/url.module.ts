import { Module } from "@nestjs/common";
import { UrlController } from "./url.controller";
import { UrlService } from "./url.service";
import { UserService } from "src/user/user.service";

@Module({
    controllers: [UrlController],
    providers: [UrlService, UserService]
})
export class UrlModel { }