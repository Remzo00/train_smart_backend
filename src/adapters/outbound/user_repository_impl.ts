import { IUserRepository } from "../../core/ports/user_repository";
import { ValidationException } from "../../exeptions/validationException";
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
            throw new ValidationException("User not found")
        }
    }

    async fetchUserByEmail(email: string): Promise<IUser> {
        try{
            const userObject = await this.user.findOne({ email })
            return userObject
        } catch(error){
            throw new ValidationException("User email not found")
        }
    }

    async addUser(user: IUser): Promise<void> {
        try{
            await this.user.create(user)
        } catch(error){
            throw new ValidationException("Error adding user")
        }
    }

    async updateUser(user: IUser, userId: string): Promise<void> {
        try{
            const updatedUser = await this.user.findByIdAndUpdate(userId, user, { new: true })

            if(!updatedUser){
                throw new ValidationException("User for update not found")
            }

            return updatedUser
        } catch(error){
            throw new ValidationException("User not found")
        }
    }

    async deleteUserById(userId: string): Promise<void> {
        try{
            await this.user.findByIdAndDelete(userId)
        } catch(error){
            throw new ValidationException("Error deleting user")
        }
    }
}