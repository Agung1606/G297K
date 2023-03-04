import React, { useEffect, useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiFillLike } from 'react-icons/ai';
import { FaComments, FaShareSquare } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserImage from '../../components/UserImage';
import useMediaQuery from '../../hooks/useMediaQuery';
import dayjs from 'dayjs';
import { 
    useEditPostMutation,
    useLikePostMutation, 
    useDeletePostMutation,
    useCommentPostMutation,
} from '../../state/api';
import { 
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Dialog,
    DialogBody,
} from '@material-tailwind/react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';


const ModalRemove = ({ isRemove, handleIsRemove, handleDeletePost }) => {
    const buttonStyle = 'text-white px-4 py-1 text-lg rounded-md';
    return(
        <Dialog
            open={isRemove}
            handler={handleIsRemove}
            className="w-[350px] max-w-[450px] bg-[#252425]"
        >
            <DialogBody>
                <h1 className='text-2xl text-white font-semibold mb-4 text-center'>Hapus Foto?</h1>
                <div className='flex justify-around items-center mt-20'>
                    <button 
                        className={`${buttonStyle} bg-blue/70 hover:bg-blue/50`}
                        onClick={handleIsRemove}
                    >
                        Batal
                    </button>
                    <button 
                        className={`${buttonStyle} bg-red hover:bg-red/60`}
                        onClick={handleDeletePost}
                    >
                        Hapus
                    </button>
                </div>
            </DialogBody>
        </Dialog>
    );
};

const CommentSection = ({comment}) => {
    return(
        <>
            {/* USERNAME AND IMG WRAPPER */}
            <div className='flex items-center gap-x-2'>
                <div className='h-8 w-8'>
                    <img 
                        src={`${import.meta.env.VITE_BASE_URL}assets/${comment.profilePicturePath}`} 
                        className='rounded-full'
                    />
                </div>
                <div>
                    <p className='font-itim'>{comment.username}</p>
                    <p>{comment.comment}</p>
                </div>
            </div>
        </>
    );
};

const PostWidget = ({
    postId,
    postUserId,
    username,
    postDate,
    postPicturePath,
    userProfilePicturePath,
    description,
    likes,
    comments,
}) => {
    const desktop = useMediaQuery("(min-width: 768px)");
    const [isComment, setIsComment] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isRemove, setIsRemove] = useState(false);

    const [updateDescription, setUpdateDescription] = useState(description);
    const [comment, setComment] = useState('');

    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);
    const loggedInUser = user._id;
    const token = useSelector((state) => state.auth.token);

    const isMyPost = loggedInUser === postUserId;
    const isLiked = Boolean(likes[loggedInUser]);
    const likeCount = Object.keys(likes).length || 0;

    const flexBetween = 'flex justify-between items-center'
    const flexCenter = 'flex justify-center items-center'

    const [likePost] = useLikePostMutation();
    const [deletePost] = useDeletePostMutation();
    const [editPost] = useEditPostMutation();
    const [commentPost] = useCommentPostMutation();

    const handleLikePost = async () => {
        await likePost({ postId, userId: loggedInUser, token });
    };

    const handleDeletePost = async () => {
        await deletePost({ postId, token });
        handleIsRemove();
    };

    const handleEditPost = async () => {
        await editPost({ postId, updateDescription, token });
        handleIsUpdate();
    };

    const handleCommentPost = async () => {
        await commentPost({ 
            postId,
            username: user.username,
            profilePicturePath: user.profilePicturePath,
            comment, 
            token 
        });
        setComment('');
    };

    const handleIsComment = () => setIsComment(!isComment);
    const handleIsUpdate = () => setIsUpdate(!isUpdate);
    const handleIsRemove = () => setIsRemove(!isRemove);

    const likeLogic = () => {
        if(likeCount === 1 && isLiked) {
            return `${user.username}`;
        } else if(likeCount > 1 && isLiked) {
            return `Anda dan ${likeCount - 1} orang lainnya`;
        } else {
            return likeCount;
        }
    };

    // close comment section when user left the page
    useEffect(() => {
        return () => setIsComment(false);
    }, []);

    const inputStyle = `bg-[#e0e0e0] dark:bg-[#333333] text-deep-blue dark:text-white
                        placeholder:text-deep-blue placeholder:dark:text-white mb-2 rounded-md 
                        pl-3 pt-1 focus:outline-none placeholder:text-lg`;

    return (
        <>
        <div className='my-4'>
            <div className='bg-[#f0f0f0] dark:bg-[#252425] rounded-lg shadow-md'>
                <section>
                    {/* HEADER */}
                    <div className={`${flexBetween} py-4 px-2`}>
                        <div className='flex items-center gap-x-3'>
                            <div
                                onClick={() => {
                                    navigate(`/profile/${postUserId}`)
                                }}
                            >
                                <UserImage size={desktop ? '58px' : '50px'} image={userProfilePicturePath} />
                            </div>
                            <div className='text-deep-blue dark:text-white'>
                                <h3 className="text-lg">
                                    {username}
                                </h3>
                                <p className='text-xs'>
                                    {dayjs(postDate).format("DD/MM/YYYY")}
                                </p>
                            </div>
                        </div>
                        {/* OHTERS */}
                        <Menu placement='top'>
                            <MenuHandler>
                                <Button>
                                    <FiMoreHorizontal className='text-lg text-deep-blue dark:text-white'/>
                                </Button>
                            </MenuHandler>
                            <MenuList className='bg-[#252425] text-white'>
                                {isMyPost && (
                                    <>
                                        <MenuItem onClick={handleIsUpdate}>
                                            <label htmlFor="update" className={`${flexBetween}`}>
                                                <p>Edit</p>
                                                <AiFillEdit />
                                            </label>
                                        </MenuItem>
                                        <MenuItem onClick={handleIsRemove} className={`${flexBetween}`}>
                                            <p>Hapus</p>
                                            <AiFillDelete />
                                        </MenuItem>
                                    </>
                                )}
                                <MenuItem className={`${flexBetween}`}>
                                    <p>Bagikan</p>
                                    <FaShareSquare />
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </section>
                
                {/* DESCRIPTION AND IMAGE */}
                <section>
                    <div>
                        {isUpdate ? (
                            <div className='px-2 py-3'>
                                <input 
                                    id="update"
                                    type="text" 
                                    value={updateDescription}
                                    onChange={(event) => setUpdateDescription(event.target.value)}
                                    className='bg-inherit py-2 text-deep-blue dark:text-white focus:outline-none'
                                />
                                <div className='flex justify-center items-center'>
                                    <button 
                                    onClick={handleEditPost}
                                    className="text-white mr-8 px-2 py-1 rounded-md bg-blue/70 hover:bg-blue/50"
                                    >
                                        Oke
                                    </button>
                                    <button 
                                        onClick={handleIsUpdate}
                                        className="text-white px-2 py-1 rounded-md bg-red hover:bg-red/60"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className={`mt-4 mb-2 px-2 text-deep-blue dark:text-white ${postPicturePath ? 'text-lg' : 'text-[20px]'}`}>
                                {description}
                            </p>
                        )}
                        {postPicturePath && (
                            <img
                                className='w-full max-h-[350px] object-scale-down'
                                src={`http://localhost:4001/assets/${postPicturePath}`}
                                alt={`${username}-post`}
                                onDoubleClick={handleLikePost}
                            />
                        )}
                    </div>
                </section>

                {/* LIKE COUNT */}
                {likeCount > 0 && (
                    <section className='flex gap-x-3 py-4 px-5 text-deep-blue dark:text-white'>
                        <AiFillLike className='text-2xl' />
                        <p>
                            {likeLogic()}
                        </p>
                    </section>
                )}

                {/* LIKE, COMMENT, AND SHARE */}
                <div className='w-full h-[0.5px] bg-deep-blue/40 dark:bg-white/40' />
                <section>
                    <div className='grid grid-cols-6'>
                        {/* LIKE */}
                        <div 
                            className={`col-span-2 ${flexCenter} p-3 rounded-xl hover:bg-gray-600 cursor-pointer`}
                            onClick={handleLikePost}
                        >
                            {isLiked ? <AiFillLike className='text-blue text-2xl' /> : <AiFillLike className='text-2xl text-deep-blue dark:text-white' />}
                        </div>
                        {/* COMMENT */}
                        <div
                            onClick={handleIsComment}
                            className={`col-span-2 ${flexCenter} gap-2 p-3 rounded-xl hover:bg-gray-600 cursor-pointer`}
                        >
                            <FaComments className='text-2xl text-deep-blue dark:text-white' />
                        </div>
                        {/* SHARE */}
                        <div
                            className={`col-span-2 ${flexCenter} gap-2 p-3 rounded-xl hover:bg-gray-600 cursor-pointer`}
                        >
                            <FaShareSquare className='text-2xl text-deep-blue dark:text-white' />
                        </div>

                    </div>
                </section>
                <div className='w-full h-[0.5px] bg-deep-blue/40 dark:bg-white/40 mb-1' />
                {!isComment ? (
                        // if the comments length is 0 then do not pass the length
                        comments.length !== 0 && 
                        <p onClick={handleIsComment} className='px-2 py-2 cursor-pointer'>
                            Lihat {comments.length} komentar
                        </p>
                        ) : (
                        <div className='w-full max-h-64 overflow-y-scroll'>
                            {comments.map(comment => (
                                <CommentSection 
                                    key={comment._id}
                                    comment={comment}
                                />
                            ))}
                        </div>
                    )}
                {/* COMMENTS INPUT */}
                <div className='w-full pt-2 flex items-center px-2 gap-x-3'>
                    <textarea 
                        type='text'
                        placeholder='Comment'
                        onChange={(event) => setComment(event.target.value)}
                        value={comment}
                        className={`${inputStyle} basis-3/4 h-11`}
                    />
                    <button 
                        disabled={!comment}
                        className='btn-bg px-2 py-[2px] rounded-md uppercase tracking-wide'
                        onClick={() => {
                            handleCommentPost();
                            setIsComment(true);
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
        {/* MODAL REMOVE */}
        <ModalRemove 
            isRemove={isRemove} 
            handleIsRemove={handleIsRemove} 
            handleDeletePost={handleDeletePost}
        />
        </>
    )
}

export default PostWidget;