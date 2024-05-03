import mongoose from "mongoose";
import { IUserRepository } from "../../core/repository/user_repository";
import { User, IUser } from "../../infrastructure/models/user_model";

export class UserRepositoryImpl implements IUserRepository{
    private user: any
    constructor(){
        this.user = User 
    }

    async fetchUserById(userId: string): Promise<IUser> {
        try{
            const userObject = await this.user.findById(userId)

            return userObject
        } catch(error){
            throw error
        }
    }

    async addUser(user: IUser): Promise<void> {
        try{
            await this.user.create(user)
        } catch(error){
            throw new Error("Error adding user");
        }
    }
}