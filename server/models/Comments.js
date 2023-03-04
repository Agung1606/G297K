import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    },
    username: {
        type: String,
        required: true
    },
    profilePicturePath: String,
    comment: String,
});

const Comments = mongoose.model("Comments", CommentsSchema);
export default Comments;