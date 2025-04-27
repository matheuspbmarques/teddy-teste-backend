import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const HeaderUserId = createParamDecorator((data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as Request;

    const userId: string | null = request['userId'] ?? null;

    return userId;
});