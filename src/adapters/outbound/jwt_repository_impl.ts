import { IJwtRepository } from "../../core/ports/jwt_repository";
import jwt from "jsonwebtoken";

  export class JwtRepositoryImpl implements IJwtRepository {
      private readonly secretKey: string;
  
      constructor(secretKey: string) {
          this.secretKey = secretKey;
      }
  
      async generateToken(payload: object, expiresIn: string = "8h"): Promise<string> {
          return jwt.sign(payload, this.secretKey, {
              algorithm: "HS256", 
              expiresIn,
          });
      }
  
      async verifyToken(token: string): Promise<object | string> {
          try {
              return jwt.verify(token, this.secretKey, {
                  algorithms: ["HS256"],
              });
          } catch (error) {
              console.log("Token verification error:", error);
              throw error;
          }
      }
  }
  