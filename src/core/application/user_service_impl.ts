import { UnauthorisedException } from "../../exeptions/unauthorisedException";
import { ValidationException } from "../../exeptions/validationException";
import { IUser } from "../../infrastructure/models/user_model";
import { IUserRepository } from "../ports/user_repository";
import { IUserService } from "../service/user_service";

export class UserServiceImpl implements IUserService{
    constructor(private userRepository: IUserRepository){}

    async getUserById(userId: string): Promise<IUser> {
        let user
        try{
            user = await this.userRepository.fetchUserById(userId)
        }
        catch(error){
            throw new Error("Error fetching user by id");
        }

        if(!user){
            throw new UnauthorisedException("User not found");
        }
        return user
    }

    async addUser(user: IUser): Promise<void> {
        try{
            await this.userRepository.addUser(user)
        } catch(error){
            throw new ValidationException("Error adding user")
        }
    }
    
    async updateUser(user: IUser, userId: string): Promise<void> {
        try{
            await this.userRepository.updateUser(user, userId)
            
        } catch(error){
            throw new ValidationException("Error updating user"); 
        }
    }

    async deleteUserById(userId: string): Promise<void> {
        try{
            await this.userRepository.deleteUserById(userId)
        } catch(error){
            throw new ValidationException("Error deleting user");
        }
    }
}