export interface IJwtRepository{
    generateToken(payload: object, expiresIn?: string): Promise<string>;
    verifyToken(token: string): Promise<object | string>;
}