import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserQuery, useGetUserPostsQuery, useAddRemoveFollowMutation } from '../../state/api';
import { setLogout } from '../../state/authSlice';
import Loader from '../../components/Loader';
import ProfileInfo from './ProfileInfo';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TiThLargeOutline } from 'react-icons/ti';
import { BiMessageRoundedDots } from 'react-icons/bi';
import UserCard from '../../components/UserCard';

const NavigationPost = ({ userId }) => {
  const location = useLocation();

  const lineStyle = 'w-full h-[1px] bg-black/40 dark:bg-white/40';
  const selectedStyle = 'bg-gradient-rainblue p-1 rounded-full';

  return(
    <>
      {/* LINE */}
      <div className={`${lineStyle}`} />
      <div className='flex justify-around items-center my-3'>
        <div>
            <Link to={`/profile/${userId}`}>
              <TiThLargeOutline 
                className={`text-2xl xs:text-4xl text-deep-blue dark:text-white
                  ${location.pathname === `/profile/${userId}` && selectedStyle}`} 
              />
            </Link>
        </div>
        <div>
            <Link to={`/profile/${userId}/tweet`}>
              <BiMessageRoundedDots 
                className={`text-2xl xs:text-4xl text-deep-blue dark:text-white
                  ${location.pathname === `/profile/${userId}/tweet` && selectedStyle}`} 
              />
            </Link>
        </div>
      </div>
      {/* LINE */}
      <div className={`${lineStyle}`} />
    </>
  );
};

const LayoutProfile = () => {
  const dispatch = useDispatch();

  const [openNav, setOpenNav] = useState(false);

  const { userId } = useParams();
  const loggedInUserId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);

  const { data: userData, isLoading: isLoadingUser, isError: isErrorUser } = useGetUserQuery({ userId, token });
  const { data: postData, isLoading: isLoadingPost, isError: isErrorPost } = useGetUserPostsQuery({ userId, token });  
  const [addRemoveFollow] = useAddRemoveFollowMutation();

  const isMyProfile = userId === loggedInUserId;

  const handleOpenNav = () => setOpenNav(!openNav);
  const handleLogout = () => dispatch(setLogout());

  const handleAddRemoveFollow = async () => {
    await addRemoveFollow({ userId, loggedInUserId, token });
  };

  if(isLoadingUser || isLoadingPost) {
   return (
      <div className='h-screen flex items-center justify-center'>
        <Loader
          width='w-4'
          height='h-4'
        />
      </div>
    )
  }
  if(isErrorUser || isErrorPost) {
   return (
      <div className='h-screen flex items-center justify-center'>
        <p className='text-xl text-red font-semibold'>Internal server error</p>
      </div>
    )
  }

  return (
      <div className='w-full h-screen pb-[4rem] xs:pb-[5rem]'>
        <div className='h-full overflow-y-scroll scrollbar-hide'>
          <ProfileInfo 
            userData={userData}
            postData={postData}
            isMyProfile={isMyProfile}
            openNav={openNav}
            handleOpenNav={handleOpenNav}
            handleLogout={handleLogout}
            handleAddRemoveFollow={handleAddRemoveFollow}
          />
          <NavigationPost userId={userId} />
          {/* OUTLET WRAPPER */}
          <div className='w-5/6 mx-auto'>
            <div className='max-w-[480px] mx-auto'>
              <Outlet context={[postData]} />
            </div>
          </div>
        </div>
      </div>
  )
}
export default LayoutProfile;