import { UpdateUserParams } from "../../adapters/types/user_types";
import { IUser } from "../../infrastructure/models/user_model";

export interface IUserService {
    getUserById(userId: string): Promise<IUser>
    addUser(user: IUser): Promise<void>
    updateUser(user: UpdateUserParams, userId: string): Promise<void>
    deleteUserById(userId: string): Promise<void>
}