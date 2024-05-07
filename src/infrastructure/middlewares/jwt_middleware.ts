import { NextFunction, Request, Response } from "express";
import { IJwtRepository } from "../../core/ports/jwt_repository";

interface AuthenticatedRequest extends Request {
    user?: object; 
}
export const authenticateJwtToken = (jwtRepository: IJwtRepository) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if(token == null){
            return res.sendStatus(401);
        }

        try{
            const userTokenData: object | string = await jwtRepository.verifyToken(token);
            if(!isUserTokenData(userTokenData)){
                return res.sendStatus(401);
            }
            req.user = userTokenData
            next()
        } catch (error){
            return res.sendStatus(401);
        }
    }
}

function isUserTokenData(obj: any): obj is object {
    return obj && typeof obj === "object" && obj !== null;
}