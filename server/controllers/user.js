import User from "../models/User.js";
import Post from "../models/Post.js";
import { StatusCodes } from "http-status-codes";

// GET: http://localhost:4001/api/v1/user/search?username=agngsptra._
export const searchUser = async (req, res) => {
    try {
        const { username } = req.query;

        const user = await User.find({
            $or: [
                { username: {$regex: username, $options: 'i'} },
                { firstName: {$regex: username, $options: 'i'} }
            ]
        });

        const formatted = user.map(
            ({ _id, username, firstName, lastName, profilePicturePath}) => {
                return { _id, username, firstName, lastName, profilePicturePath };
            });
        
        return res.status(StatusCodes.OK).json(formatted);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

// GET: http://localhost:4001/api/v1/user/:userId
export const getUser = async (req, res) => {
    try {
        
        const { userId } = req.params;
        const user = await User.findById({ _id: userId });
        
        // if user not found then throw this error
        if(!user) return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found"});
        
        const {password, ...rest} = user._doc; // send user information without password and confirmedAccount
        return res.status(StatusCodes.OK).json(rest);
        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

// GET: http://localhost:4001/api/v1/user/friend/:userId
export const getUserFriends = async (req, res) => {
    try {
        
        const { userId } = req.params;
        const user = await User.findById({ _id: userId });
        
        // if user not found then throw this error
        if(!user) return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found"});
        
        const friends = await Promise.all(
            user.friends.map(id => {
                return User.findById(id);
            })
            );
            
            const formattedFriend = friends.map(
                ({ _id, firstName, lastName, birthday, gender, profilePicturePath }) => {
                    return { _id, firstName, lastName, birthday, gender, profilePicturePath }
                });
                
                return res.status(StatusCodes.OK).json(formattedFriend);
            
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

        
// PATCH: http://localhost:4001/api/v1/user/addremovefollow
export const addRemoveFollow = async (req, res) => {
    try {
        const { userId, loggedInUserId } = req.body;

        const user = await User.findOne({ _id: loggedInUserId });
        const friend = await User.findOne({ _id: userId });

        if(!user || !friend) return res.status(StatusCodes.BAD_REQUEST).json({ error: 'user does not exist' });

        const isFollowing = user.following.get(userId);

        if(isFollowing) {
            user.following.delete(userId);
            friend.followers.delete(loggedInUserId);
        } else {
            user.following.set(userId, true);
            friend.followers.set(loggedInUserId, true);
        }
        
        await friend.save();

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { following: user.following },
            { new: true },
        );
        
        res.status(StatusCodes.CREATED).json(updatedUser);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

// PATCH: http://localhost:4001/api/v1/user/updateuserinfo
export const updateUserInfo = async (req, res) => {
    try {
        const { userId } = req.user;
        const body = req.body;

        const user = await User.findOne({ _id: userId });
        if(!user) return res.status(StatusCodes.BAD_REQUEST).json({ error: 'User not found' });

        // I also wanna update in Post info
        const posts = await Post.find({ userId: user._id });
        await Promise.all(
            posts.map(post => {
                return Post.findByIdAndUpdate(
                    { _id: post._id },
                    {
                        username: body.username
                    },
                    { new: true }
                );
            })
        );

        const updatedUser = await User.findByIdAndUpdate(
            { _id: user._id },
            body,
            { new: true }
        );

        const {password, ...rest} = updatedUser._doc;
        return res.status(StatusCodes.CREATED).json(rest);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

// PATCH: http://localhost:4001/api/v1/user/updateprofile
export const updateProfile = async (req, res) => {
    try {
        const { userId } = req.user;
        const { profilePicturePath } = req.body;

        const user = await User.findOne({ _id: userId });
        if(!user) return res.status(StatusCodes.BAD_REQUEST).json({ error: 'User not found'});

        // I also wanna update profile picture path in Post
        const posts = await Post.find({ userId: user._id });
        await Promise.all(
            posts.map(post => {
                return Post.findByIdAndUpdate(
                    { _id: post._id },
                    {
                        userProfilePicturePath: profilePicturePath
                    },
                    { new: true }
                );
            })
        );

        const updatedUser = await User.findByIdAndUpdate(
            { _id: user._id },
            {
                profilePicturePath
            },
            { new: true }
        );
        
        return res.status(StatusCodes.CREATED).json(updatedUser.profilePicturePath);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

// PATCH: http://localhost:4001/api/v1/user/deleteprofile/
export const deleteProfile = async (req, res) => {
    try {
        const { userId } = req.user;

        const user = await User.findOne({_id: userId});
        if(!user) return res.status(StatusCodes.BAD_REQUEST).json({ error: 'User not found'});

        // I also want to update the profile picture path in Post
        const posts = await Post.find({ userId: user._id });
        await Promise.all(
            posts.map(post => {
                return Post.findByIdAndUpdate(
                    {_id: post._id},
                    {
                        userProfilePicturePath: '',
                    },
                    { new: true }
                );
            })
        );

        // I just wanna delete the path of picture
        const updatedUser = await User.findByIdAndUpdate(
            { _id: user._id },
            {
                profilePicturePath: ''
            },
            { new: true }
        );

        const {password, ...rest} = updatedUser._doc;
        return res.status(StatusCodes.OK).json(rest);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};