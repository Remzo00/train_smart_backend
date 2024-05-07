import { CreateUserParams, UserSignInParams } from "../../adapters/types/user_types";
import { IUser, User } from "../../infrastructure/models/user_model";
import { comparePassword, hashPassword } from "../../utils/hash_password";
import { IUserRepository } from "../ports/user_repository";
import { IAuthService } from "../service/auth_service";

export class AuthServiceImpl implements IAuthService{
    constructor(private userRepository: IUserRepository){}
    async authenticateUser(params: UserSignInParams): Promise<IUser> {
        let user
        try{
            user = await this.userRepository.fetchUserByEmail(params.email)
        } catch(error){
            throw new Error("UserNotFound");
        }

        const isPasswordCorrect = await comparePassword(params.password, user.password)
        if(!isPasswordCorrect){
            throw new Error("InvalidPassword")
        }
        
        return user
    }

    async createUserAccount(params: CreateUserParams): Promise<void> {
        try{
            params.password = await hashPassword(params.password)

            const newUser = new User({
                name: params.name,
                surname: params.surname,
                email: params.email,
                password: params.password,
                weight: params.weight,
                gender: params.gender
            })

            await this.userRepository.addUser(newUser)
        } catch(error){
            throw error
        }
    }
}