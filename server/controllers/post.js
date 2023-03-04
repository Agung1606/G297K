import Post from "../models/Post.js";
import User from '../models/User.js';
import Comments from '../models/Comments.js';
import mongoose from "mongoose";
import { StatusCodes } from 'http-status-codes';

// POST: http://localhost:4001/api/v1/post/newpost
export const createPost = async (req, res) => {
    try {
        const { userId, description, postPicturePath } = req.body;
        
        const user = await User.findById(userId);
        if(!user) return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found"});

        const newPost = new Post({
            userId,
            username: user.username,
            postDate: Date.now(),
            postPicturePath: postPicturePath || '',
            userProfilePicturePath: user.profilePicturePath,
            description,
            likes: {},
        });

        await newPost.save();

        const posts = await Post.find().sort('-postDate');
        return res.status(StatusCodes.OK).json(posts);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};


// GET: http://localhost:4001/api/v1/post
export const getFeedPosts = async (req, res) => {
    try {

        // const post = await Post.find({}).sort("-postDate");
        // return res.status(StatusCodes.OK).json(post);

        const postWithComments = await Post.aggregate([
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comments'
                }
            },
        ]).sort('-postDate');

        return res.status(StatusCodes.OK).json(postWithComments)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

// GET: http://localhost:4001/api/v1/post/:userId
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;

        // const post = await Post.find({userId}).sort("-postDate");
        // return res.status(StatusCodes.OK).json(post);

        const postWithComments = await Post.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comments'
                }
            }
        ]).sort('-postDate');

        return res.status(StatusCodes.OK).json(postWithComments);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

// PATCH: http://localhost:4001/api/v1/post/update/:postId
export const editPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { updateDescription } = req.body;

        const post = await Post.findOne({ _id: postId });
        if(!post) return res.status(StatusCodes.NOT_FOUND).json({ error: "Post not found" });

        const updatedPost = await Post.findByIdAndUpdate(
            post._id,
            { description: updateDescription },
            { new: true },
        );

        return res.status(StatusCodes.CREATED).json(updatedPost);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

// PATCH: http://localhost:4001/api/v1/post/like/:postId
export const likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;

        const post = await Post.findOne({ _id: postId });
        if(!post) return res.status(StatusCodes.NOT_FOUND).json({ error: "Post not found" });

        const isLiked = post.likes.get(userId);

        if(isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            post._id,
            { likes: post.likes },
            { new: true },
        );
        
        return res.status(StatusCodes.CREATED).json(updatedPost);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

// POST: http://localhost:4001/api/v1/post/comment
export const commentPost = async (req, res) => {
    try {
        const { postId, username, profilePicturePath, comment } = req.body;

        const post = await Post.findById({ _id: postId });
        if(!post) return res.status(StatusCodes.NOT_FOUND).json({ error: 'Post not found' });

        const newComment = new Comments({
            postId: new mongoose.Types.ObjectId(post._id),
            username,
            profilePicturePath: profilePicturePath || 'defaultAvatar.png',
            comment
        });

        await newComment.save();

        const postWithComments = await Post.aggregate([
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comments'
                }
            }
        ]).sort('postDate');

        return res.status(StatusCodes.OK).json(postWithComments);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
};

// DELETE: http://localhost:4001/api/v1/post/delete/:postId
export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const deletedPost = await Post.findByIdAndDelete({ _id: postId });
        if(!deletedPost) return res.status(StatusCodes.NOT_FOUND).json({ error: "Post not found" });

        return res.status(StatusCodes.OK).json({ msg: 'Post deleted' });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};