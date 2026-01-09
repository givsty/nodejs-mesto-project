import mongoose, { Schema } from "mongoose";

interface ICard{
    name: string,
    link: string,
    owner: Schema.Types.ObjectId,
    likes: Array<Schema.Types.ObjectId>,
    createdAt: Date
}

const CardScheme = new Schema<ICard>({
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
        type: Schema.Types.ObjectId,
        required: true
    },
    likes : {
        type: [Schema.Types.ObjectId],
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export default mongoose.model<ICard>('card', CardScheme); 