import { IUser } from "../../infrastructure/models/user_model";

export interface IUserRepository{
    fetchUserById(userId: string): Promise<IUser>
    fetchUserByEmail(email: string): Promise<IUser>
    addUser(user: IUser): Promise<void> 
    updateUser(user: IUser, userId: string): Promise<void>
    deleteUserById(userId: string): Promise<void>
    changeUserPassword(userId: string, newPassword: string): Promise<void>;
}