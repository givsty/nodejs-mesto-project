import mongoose from "mongoose";
type User = {
    name: string,
    avatar: string
}
const UserScheme = new mongoose.Schema<User>({
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

export default mongoose.model('user', UserScheme)