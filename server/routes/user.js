import express from 'express';
import { 
    getUser, 
    getUserFriends, 
    searchUser,
    addRemoveFollow,
    deleteProfile,
    updateUserInfo
} from '../controllers/user.js';
const router = express.Router();

/* GET */
router.route('/search').get(searchUser);
router.route('/:userId').get(getUser);
router.route('/friend/:userId').get(getUserFriends);

/* PATCH */
router.route('/updateuserinfo').patch(updateUserInfo);
router.route('/addremovefollow').patch(addRemoveFollow);
router.route('/deleteprofile').patch(deleteProfile);

export default router;