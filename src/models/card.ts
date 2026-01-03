import mongoose from "mongoose";
import ObjectId from "mongodb"

type Card = {
    name: string,
    link: string,
    owner: any,
}

const CardScheme = new mongoose.Schema<Card>({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30,
    },
    link: {
        type: String,
        required: true
    },
    owner: {
        type: ObjectId,
        required: true
    }
})

export default mongoose.model<Card>('user', CardScheme); 