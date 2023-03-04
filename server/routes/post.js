import express from 'express';
import {
    getFeedPosts,
    getUserPosts,
    editPost,
    likePost,
    deletePost,
    commentPost,
} from '../controllers/post.js'

const router = express.Router();

// POST
router.route('/comment').post(commentPost);

// GET
router.route('/').get(getFeedPosts);
router.route('/:userId').get(getUserPosts);

// PATCH
router.route('/update/:postId').patch(editPost);
router.route('/like/:postId').patch(likePost);

// DELETE   
router.route('/delete/:postId').delete(deletePost);

export default router;