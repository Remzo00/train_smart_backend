import { RequestHandler } from "express";
import { authenticateJwtToken } from "../../infrastructure/middlewares/jwt_middleware";
import { IJwtRepository } from "../../core/ports/jwt_repository";
export class MiddlewareFactory {
    authenticateTokenMiddleware: RequestHandler

    constructor(private jwtRepository: IJwtRepository){
        this.authenticateTokenMiddleware = authenticateJwtToken(jwtRepository)
    }
}