import { IUser } from "../../infrastructure/models/user_model";

export interface IUserService {
    getUserById(userId: string): Promise<IUser>
    addUser(user: IUser): Promise<void>
}