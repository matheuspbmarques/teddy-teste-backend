import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class OptionalAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        const authorization = request.headers['authorization'];

        if (authorization) {
            const token = authorization.split(' ')[1];

            if (token) {
                try {
                    const jwtSecret = this.configService.get<string>('JWT_SECRET');
                    const payload = this.jwtService.verify(token, { secret: jwtSecret });

                    request['userId'] = payload.sub;
                } catch (error) {
                    throw new UnauthorizedException('Token is invalid');
                };
            };
        };

        return true;
    };
};