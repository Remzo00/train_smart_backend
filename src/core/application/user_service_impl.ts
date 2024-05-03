import { IUser } from "../../infrastructure/models/user_model";
import { IUserRepository } from "../repository/user_repository";
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
            throw new Error("User not found");
        }
        return user
    }

    async addUser(user: IUser): Promise<void> {
        try{
            await this.userRepository.addUser(user)
        } catch(error){
            throw error
        }
    }    
}