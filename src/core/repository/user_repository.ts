import { IUser } from "../../infrastructure/models/user_model";

export interface IUserRepository{
    addUser(user: IUser): Promise<void> 
    fetchUserById(userId: string): Promise<IUser>
}