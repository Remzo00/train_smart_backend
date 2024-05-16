import express, { Router, Request, Response } from "express";
import { IUserService } from "../../core/service/user_service";
import { IHttpHandler } from "./http_handler";
import { UpdateUserParams } from "../types/user_types";

export class UserHttpHandler implements IHttpHandler{
    constructor(private userService: IUserService){}
    registerRoutes(): Router {
        const userRouter = express.Router()
    
        userRouter.get("/:userId", this.getUserById.bind(this));
        userRouter.patch("/:userId", this.updateUser.bind(this));
        userRouter.delete("/:userId", this.deleteUserById.bind(this));
        userRouter.post("/:userId/exercises", this.addExerciseToUser.bind(this));
        userRouter.patch("/:userId/change-password", this.changeUserPassword.bind(this));

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
     *         description: Successful operation.
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
 * /v1/users/{userId}:
 *   patch:
 *     summary: Update the user
 *     description: Updates the details of an existing user.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserParams'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request, such as missing or invalid parameters.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
    async updateUser(req: Request, res: Response): Promise<void> {
        try {

            const userId = req.params.userId; 
            const userDataToUpdate: UpdateUserParams = req.body;
            
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

    async addExerciseToUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId
            const { exerciseName, maxWeight } = req.body;

            await this.userService.addExerciseToUser(userId, exerciseName, maxWeight);            
            
            res.status(200).json({ message: "Exercise successfully added to user." });
        } catch (error) {
            res.status(500).json({ message: "Error calculating optimal weight.", error });
        }
    }

     /**
   * @swagger
   * /v1/users/{userId}/change-password:
   *   patch:
   *     summary: Change user's password
   *     tags: [User]
   *     description: Change the password of the user identified by the provided ID.
   *     requestBody:
   *       description: Object containing the new password.
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               password:
   *                 type: string
   *                 example: newpassword123
   *     responses:
   *       200:
   *         description: Password changed successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Password changed successfully
   *       400:
   *         description: Bad request. Failed to change the password due to missing or invalid data.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Failed to change password. Please provide a new password.
   *       500:
   *         description: Internal server error. Failed to change the password due to unexpected reasons.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Failed to change password.
   */
    async changeUserPassword(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId
            const newPassword = req.body.password;
            
            await this.userService.changeUserPassword(userId, newPassword);
            
            res.status(200).json({ message: "Password successfully changed." });
        } catch (error) {
            res.status(500).json({ message: "Error changing password.", error });
        }
    }

}