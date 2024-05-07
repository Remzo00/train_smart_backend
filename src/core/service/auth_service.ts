import { CreateUserParams, UserSignInParams } from "../../adapters/types/user_types";
import { IUser } from "../../infrastructure/models/user_model";

export interface IAuthService{
    createUserAccount(params: CreateUserParams): Promise<void>
    authenticateUser(params: UserSignInParams): Promise<IUser>
}