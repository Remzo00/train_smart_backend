import { CreateUserParams, UserSignInParams } from "../../adapters/types/user_types";
import { UnauthorisedException } from "../../exeptions/unauthorisedException";
import { ValidationException } from "../../exeptions/validationException";
import { IUser, User } from "../../models/user_model";
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
            throw new UnauthorisedException("User Not Found");
        }

        const isPasswordCorrect = await comparePassword(params.password, user.password)
        if(!isPasswordCorrect){
            throw new ValidationException("Invalid password");
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
            throw new ValidationException("Error creating user account")
        }
    }
}