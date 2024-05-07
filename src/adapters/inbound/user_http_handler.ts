import express, { Router, Request, Response } from "express";
import { IUserService } from "../../core/service/user_service";
import { IHttpHandler } from "./http_handler";
import { IUser } from "../../infrastructure/models/user_model";
import { createUserSchema, updateUserSchema } from "./validations/user_validation";

export class UserHttpHandler implements IHttpHandler{
    constructor(private userService: IUserService){}
    registerRoutes(): Router {
        const userRouter = express.Router()
    
        userRouter.post("/", this.addUser.bind(this));
        userRouter.get("/:userId", this.getUserById.bind(this));
        userRouter.patch("/:userId", this.updateUser.bind(this));
        userRouter.delete("/:userId", this.deleteUserById.bind(this));

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
        try {
            const { error, value } = createUserSchema.validate(req.body);
    
            if (error) {
                res.status(400).json({ message: "Invalid data provided.", error: error.details });
                return;
            }
    
            const newUser: IUser = value;
    
            await this.userService.addUser(newUser);
    
            res.status(201).json({ message: "User successfully created." });
        } catch (error) {
            res.status(500).json({ message: "Error creating user.", error: error });
        }
    }

    /**
 * @swagger
 * /v1/users/:userId:
 *   patch:
 *     summary: Update the user
*     description: Updates the details of an existing user. Only fields included in the request body will be updated.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully updated the user.
 *       400:
 *         description: Bad request, such as missing or invalid parameters.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const { error, value } = updateUserSchema.validate(req.body);

            const userId = req.params.userId; 
            const userDataToUpdate: IUser = value;
            
            await this.userService.updateUser(userDataToUpdate, userId);
    
            res.status(200).json({ message: "User successfully updated." });
        } catch (error) {
            if (error === "User not found") {
                res.status(404).json({ message: "User not found." });
            } else {
                res.status(500).json({ message: "Error updating user.", error: error });
            }
        }
    }

        /**
     * @swagger
     * /v1/users/{userId}:
     *   delete:
     *     summary: Delete user by ID
     *     description: Deletes a user with the specified ID.
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: string
     *         required: true
     *         description: ID of the user to delete.
     *     responses:
     *       200:
     *         description: User successfully deleted.
     *       404:
     *         description: User not found.
     *       500:
     *         description: Internal server error.
     */

    async deleteUserById(req: Request, res: Response): Promise<void> {
        try{
            const userId = req.params.userId
            await this.userService.deleteUserById(userId)
            res.status(200).json({ message: "User successfully deleted." });
        } catch(error){
            res.status(500).json(error)
        }
    }
}