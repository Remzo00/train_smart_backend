import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document{
    name: string;
    surname: string;
    email: string;
    password: string;
    weight: number;
    gender: string;
}

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },

    surname:{
        type: String,
        required: true
    },

    email:{
        type: String,
        require: true,
        unique: true
    },

    password:{
        type: String,
        require: true
    },

    weight:{
        type: Number,
        require: true
    },

    gender:{
        type: String,
        require: true
    }
})

export const User = mongoose.model<IUser>('User', UserSchema)