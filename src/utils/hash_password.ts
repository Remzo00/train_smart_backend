import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
    try{
        const saltRounds = 10
        return await bcrypt.hash(password, saltRounds)
    } catch(error){
        throw error
    }
}

export async function comparePassword(userPassword: string, hashedPassword: string): Promise<boolean> {
    try{
        return await bcrypt.compare(userPassword, hashedPassword)
    } catch(error){
        throw error
    }
}