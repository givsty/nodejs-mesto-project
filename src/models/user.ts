import mongoose from "mongoose";
interface IUser {
    name: string,
    avatar: string
}
const UserScheme = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30,
    },
    avatar: {
        type: String,
        required: true
    }
})

export default mongoose.model<IUser>('user', UserScheme)