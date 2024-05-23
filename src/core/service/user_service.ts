import { UpdateUserParams } from "../../adapters/types/user_types";
import { IUser } from "../../models/user_model";

export interface IUserService {
    getUserById(userId: string): Promise<IUser>
    addUser(user: IUser): Promise<void>
    updateUser(user: UpdateUserParams, userId: string): Promise<void>
    deleteUserById(userId: string): Promise<void>
    addExerciseToUser(userId: string, exerciseName: string, maxWeight: number): Promise<void>
    changeUserPassword(userId: string, newPassword: string): Promise<void>;
}