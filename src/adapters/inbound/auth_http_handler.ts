import express, { Request, Response, Router } from "express";
import { IJwtRepository } from "../../core/ports/jwt_repository";
import { IAuthService } from "../../core/service/auth_service";
import { IHttpHandler } from "./http_handler";
import { CreateUserParams, UserSignInParams } from "../types/user_types";

export class AuthHttHandler implements IHttpHandler{
    constructor(
        private authService: IAuthService,
        private jwtRepository: IJwtRepository
    ){}

    registerRoutes(): Router {
        const authRouter = express.Router();

        authRouter.post("/register", this.userSignUp.bind(this));
        authRouter.post("/login", this.userSignIn.bind(this));

        return authRouter
    }

   /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Sign up a new user
   *     security: []
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateUserParams'
   *     responses:
   *       201:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: User created successfully
   *       400:
   *         description: Failed to create user
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Failed to create user
   *       409:
   *         description: Value violates unique constraint (e.g., duplicate email)
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Value violates unique constraint
   */
    userSignUp = async (req: Request, res: Response): Promise<void> =>{
        try{
            const userParams: CreateUserParams = req.body

            await this.authService.createUserAccount(userParams)

            res.status(201).json({message: "User created successfully"})
        } catch (error: any) {
            console.error(error);
            if (error.code === "23505") {
              res.status(409).json({ message: "Value violates unique constraint" });
              return;
            }
      
            res.status(400).json({ message: "Failed to create user" });
        }
    }

    /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Sign in a user
   *     description: This endpoint authenticates a user by their credentials.
   *     security: []
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserSignInParams'
   *     responses:
   *       200:
   *         description: Authentication successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Authentication successful
   *                 token:
   *                   type: string
   *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *       401:
   *         description: Authentication failed due to invalid credentials
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Authentication failed. Invalid credentials.
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Internal server error
   */
    userSignIn = async (req: Request, res: Response): Promise<void> => {
        try{
            let token = "";
            const userParams: UserSignInParams = req.body
            const user = await this.authService.authenticateUser(userParams)
            if (user.id) {
                try {
                    token = await this.jwtRepository.generateToken({ userId: user.id });
                } catch (error) {
                    console.error("Error generating token:", error);
                }
            }

            res.status(200).json({ message: "Authentication successful", token: token})
        } catch (error) {
            if (error instanceof Error) {
              let message = "Internal server error";
              let statusCode = 500;
      
              switch (error.message) {
                case "InvalidCredentials":
                case "UserNotFound":
                  message = "Authentication failed. Invalid credentials.";
                  statusCode = 401;
                  break;
              }
      
              res.status(statusCode).json({ message });
            }
        }
    }
}