import express, { Router, Request, Response } from "express";
import { IUserService } from "../../core/service/user_service";
import { IHttpHandler } from "./http_handler";
import { IUser } from "../../database/models/user_model";
import { userSchema } from "./validations/user_validation";

export class UserHttpHandler implements IHttpHandler{
    constructor(private userService: IUserService){}
    registerRoutes(): Router {
        const userRouter = express.Router()
    
        userRouter.post("/", this.addUser.bind(this));
        userRouter.get("/:userId", this.getUserById.bind(this));

        return userRouter
    }

 /**
     * @swagger
     * /v1/users/{userId}:
     *   get:
     *     summary: Get user by ID
     *     description: Retrieve a user by their ID.
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: string
     *         required: true
     *         description: ID of the user to retrieve.
     *     responses:
     *       200:
     *         description: Successful operation. Returns the user object.
     *       404:
     *         description: User not found.
     *       500:
     *         description: Internal server error.
     */
   async getUserById(req: Request, res: Response): Promise<void> {
        const userId = req.params.userId

        try{
            const user = await this.userService.getUserById(userId)
            res.json(user)
        } catch(error){
            res.status(500).json(error)
        }
    }

/**
 * @swagger
 * /v1/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided details.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             surname:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             weight:
 *               type: number
 *             gender:
 *               type: string
 *     responses:
 *       201:
 *         description: Successfully created the user.
 *       400:
 *         description: Bad request, such as missing or invalid parameters.
 *       500:
 *         description: Internal server error.
 */
    async addUser(req: Request, res: Response): Promise<void> {
        console.log("addUser function called");
        try {
            const { error, value } = userSchema.validate(req.body);
            console.log(req.body)
    
            if (error) {
                res.status(400).json({ message: "Invalid data provided.", error: error.details });
                return;
            }
    
            const newUser: IUser = value;
            console.log(newUser)
    
            await this.userService.addUser(newUser);
            console.log(newUser)
    
            res.status(201).json({ message: "User successfully created." });
        } catch (error) {
            res.status(500).json({ message: "Error creating user.", error: error });
        }
    }
    
}