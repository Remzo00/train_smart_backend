import { CreateUserParams, UserSignInParams } from "../../adapters/types/user_types";
import { IUser } from "../../models/user_model";

export interface IAuthService{
    createUserAccount(params: CreateUserParams): Promise<void>
    authenticateUser(params: UserSignInParams): Promise<IUser>
}