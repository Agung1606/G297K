import React, { useState } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useDeleteProfileMutation, useUpdateProfileMutation } from '../../state/api';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserImage from '../../components/UserImage';
import { RiSettings2Fill } from 'react-icons/ri';
import { MdOutlineArrowBack, MdDarkMode } from 'react-icons/md';
import { BsSunFill } from 'react-icons/bs';
import { BiLogOutCircle } from 'react-icons/bi';
import { 
  IconButton,
  MobileNav,
  Dialog,
} from '@material-tailwind/react';
import Loader from '../../components/Loader';
import { setDarkMode } from '../../state/authSlice';
import { updateUserProfile, deleteUserProfile } from '../../state/authSlice';

const ModalChangeProfile = ({ isChangeProfile, handleIsChangeProfile }) => {
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const token = useSelector((state) => state.auth.token);

    /* API FOR CHANGE PROFILE */
    const [deletePost, { isLoading: isLoadingDelete }] = useDeleteProfileMutation();
    const [updateProfile] = useUpdateProfileMutation();

    const handleDeleteProfile = async () => {
        await deletePost(token)
            .then(() => {
                dispatch(deleteUserProfile());
            })
        handleIsChangeProfile();
    };

    const handleUpdateProfile = async () => {
        const formData = new FormData();
        formData.append("picture", image);
        formData.append("profilePicturePath", image.name);

        await updateProfile({ 
                    data: formData,
                        token
                    }).then((data) => {
                        dispatch( updateUserProfile(data))
                    })

        setImage(null);
        handleIsChangeProfile();
    };

    return(
        <Dialog
            open={isChangeProfile}
            handler={handleIsChangeProfile}
            className={`w-[350px] max-w-[450px] h-[100px] bg-[#252425] text-white font-semibold text-xl
                flex flex-col items-center justify-center`}
        >
            {!isLoadingDelete ? (
                <>
                    <div className='w-fit my-1 p-2 rounded-xl hover:bg-gray-800'>
                        {!image ? (
                            <>  
                                <label htmlFor='profile'>
                                    <p>Ubah foto profile</p>
                                </label>
                                <input 
                                    type="file" 
                                    id="profile"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className="hidden"
                                />
                            </>
                        ) : (
                            <button onClick={handleUpdateProfile}>Oke</button>
                        )}
                    </div>
                    <div className='w-fit p-2 rounded-xl hover:bg-gray-800'>
                        {!image ? (
                            <button onClick={handleDeleteProfile}>
                                Hapus foto
                            </button>
                        ) : (
                            <button 
                                onClick={() => {
                                    setImage(null);
                                    handleIsChangeProfile();
                                }}
                            >
                                Batal
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <Loader
                    width='w-3'
                    height='h-3'
                />
            )}
        </Dialog>
    );
};

const ProfileInfo = ({ 
    userData, 
    postData,
    isMyProfile,
    openNav,
    handleOpenNav,
    handleLogout,
    handleAddRemoveFollow,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isChangeProfile, setIsChangeProfile] = useState(false);
    const darkMode = useSelector((state) => state.auth.darkMode);
    const desktop = useMediaQuery("(min-width: 480px)");

    const loggendInUser = useSelector((state) => state.auth.user._id);

    /* USER INFORMATION */
    const fullname = `${userData.firstName} ${userData.lastName}`;
    const postCount = postData.length;
    const followersCount = Object.keys(userData.followers).length;
    const followingCount = Object.keys(userData.following).length;

    /*  */
    const isFollowing = Boolean(userData.followers[loggendInUser]);
    const isFollowers = Boolean(userData.following[loggendInUser]);

    const lineStyle = 'w-full h-[1px] bg-black/40 dark:bg-white/40';
    const flexBetween = 'flex justify-between items-center';
    const btnStyle = 'w-full py-1 px-3 rounded-lg font-semibold';

    const handleIsChangeProfile = () => setIsChangeProfile(!isChangeProfile);
    const handleDarkMode = () => dispatch(setDarkMode());

    return (
    <div>
        {/* NAVIGATION */}
        <div className='xs:w-5/6 mx-auto'>
            <div className={`mx-3 p-1 ${flexBetween}`}>
                {isMyProfile ? (
                    <IconButton onClick={handleOpenNav}>
                        <RiSettings2Fill className='text-3xl text-deep-blue dark:text-white' />
                    </IconButton>
                ) : (
                    <IconButton onClick={() => navigate('/home')}>
                        <MdOutlineArrowBack className='text-3xl text-deep-blue dark:text-white' />
                    </IconButton>
                )}
                <p className='text-xl text-deep-blue dark:text-white'>
                    {userData.username}
                </p>
            </div>
            <MobileNav open={openNav}>
                <div className='mx-auto p-2'>
                    {/* DARK MODE */}
                    <div className='flex items-center gap-x-2 w-fit'>
                        <IconButton id='mode' onClick={handleDarkMode}>
                            {darkMode ? (
                                <BsSunFill className='text-2xl text-white'  />
                            ) : (
                                <MdDarkMode className='text-2xl text-deep-blue'  />
                            )}
                        </IconButton>
                        <label htmlFor='mode' className='text-deep-blue dark:text-white'>
                            {`${darkMode ? 'Light' : 'Dark'} mode`}
                        </label>
                    </div>
                    {/* LOGOUT */}
                    <div className='flex items-center gap-x-2 w-fit'>
                        <IconButton id='log' onClick={handleLogout}>
                            <BiLogOutCircle className='text-2xl text-deep-blue dark:text-white' />
                        </IconButton>
                        <label htmlFor='log' className='text-deep-blue dark:text-white'>
                            Logout
                        </label>
                    </div>
                </div>
            </MobileNav>
        </div>

        {/* LINE */}
        <div className={`${lineStyle}`} />
            
        {/* USER INFORMATION */}
        <div className='xs:w-5/6 mx-auto text-deep-blue dark:text-white'>
            <div className={`mx-3 my-6 md:w-3/4 sm:mx-auto`}>
                <div className={`${flexBetween}`}>
                    <div className='text-center'>
                        <div onClick={() => {
                            if(isMyProfile) {
                                handleIsChangeProfile();
                            }
                        }}>
                            <UserImage size={desktop ? '180px' : '125px'} image={userData.profilePicturePath} />
                        </div>
                        <p className='xs:text-xl mt-1'>{fullname}</p>
                    </div>
                    <div className='py-4 xs:basis-3/6'>
                        <div className={`${flexBetween} xs:justify-evenly gap-x-3`}>
                            {/* POST COUNT */}
                            <div className='text-center'>
                                <p className='text-xl xs:text-3xl font-bold'>
                                    {postCount}
                                </p>
                                <p className='xs:text-xl'>Posts</p>
                            </div>
                            {/* FOLLOWERS COUNT WRAPPER */}
                            <div className='text-center cursor-pointer'>
                                <p className='text-xl xs:text-3xl font-bold'>
                                    {followersCount}
                                </p>
                                <p className='xs:text-xl'>Followers</p>
                            </div>
                            {/* FOLLOWING COUNT WRAPPER */}
                            <div className='text-center cursor-pointer'>
                                <p className='text-xl xs:text-3xl font-bold'>
                                    {followingCount}
                                </p>
                                <p className='xs:text-xl'>Following</p>
                            </div>  
                        </div>
                        {/* BUTTON */}
                        <div className='text-center mt-3'>
                            {isMyProfile ? (
                                    <button 
                                        className={`${btnStyle} sm:w-5/6 md:w-[75%] bg-deep-blue text-white dark:text-black dark:bg-white`}
                                        onClick={() => navigate('/accounts/edit')}
                                    >
                                        Edit profile
                                    </button>
                            ) : (
                                <button 
                                    onClick={handleAddRemoveFollow}
                                    className={`${btnStyle} sm:w-5/6 ${isFollowing ? 'bg-gray-900' : 'bg-blue'} text-white`}
                                >  
                                    {
                                        isFollowing ? 'following' : 
                                        !isFollowing && isFollowers ? 'follow back' 
                                        : 'follow'
                                    }
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className='mt-2'>
                    <p className='text-lg'>{userData.bio}</p>
                </div>
            </div>
        </div>
        <ModalChangeProfile 
            isChangeProfile={isChangeProfile}
            handleIsChangeProfile={handleIsChangeProfile}
        />
    </div>
    )
}

export default ProfileInfo;