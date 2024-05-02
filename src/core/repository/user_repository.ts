import { IUser } from "../../database/models/user_model";

export interface IUserRepository{
    addUser(user: IUser): Promise<void> 
    fetchUserById(userId: string): Promise<IUser>
}