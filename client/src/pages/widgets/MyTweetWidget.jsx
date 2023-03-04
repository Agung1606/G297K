import React, { useState } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import UserImage from '../../components/UserImage';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsCameraReelsFill } from 'react-icons/bs';
import { RiMessage3Fill } from 'react-icons/ri';
import { useAddNewPostMutation } from '../../state/api';
import Loader from '../../components/Loader';
import ModalTweet from '../../modal/ModalTweet';
import ModalLive from '../../modal/ModalLive';

/* POST WIDGET */
const MyTweetWidget = () => {
  const navigate = useNavigate();
  const desktop = useMediaQuery('(min-width: 480px)')
  const flexCenter = 'flex justify-center items-center'

  const [openLive, setOpenLive] = useState(false);
  const [openTweet, setOpenTweet] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const [description, setDescription] = useState('');

  const [addNewPost, {isLoading, isError}] = useAddNewPostMutation();

  const handleTweet = async () => {
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("description", description);

    await addNewPost({formData, token});
    setDescription("");
  };


  const handleTweetOpen = () => setOpenTweet(!openTweet);
  const handleLiveOpen = () => setOpenLive(!openLive);
  
  return (
    <>
      <div className='bg-[#f0f0f0] dark:bg-[#252425] w-full rounded-lg shadow-md p-4'>
        {/* TOP */}
        <div className='flex items-center gap-4'>
          <button onClick={() => navigate(`/profile/${user._id}`)}>
            <UserImage image={user.profilePicturePath} />
          </button>
          <div 
            className='w-[90%] bg-[#e0e0e0] dark:bg-[#333333] py-1 pl-2 hover:bg-gray-400 dark:hover:bg-gray-900 rounded-2xl cursor-pointer'
          >
            <div 
              className='text-sm xs:text-lg text-deep-blue dark:text-white font-sans font-semibold'
              onClick={handleTweetOpen}
            >
              {`Apa yang kamu pikirkan${desktop ? ', ' + user.firstName : ''}?`}
            </div>
          </div>
        </div>
        {/* LINE */}
        <div className='w-full h-[1px] my-4 bg-black/40 dark:bg-white/40' />
        {/* BOTTOM */}
        <div className={`grid grid-cols-4`}>
          {/* LIVE STREAM */}
          <div 
            className={`col-span-2 ${flexCenter} gap-2 hover:bg-gray-400 hover:dark:bg-gray-800 p-1 rounded-md cursor-pointer`}
            onClick={handleLiveOpen}
          >
              <BsCameraReelsFill className='xs:text-2xl text-deep-blue dark:text-white' />
              <p className='xs:text-lg font-sans text-deep-blue dark:text-white'>Live Streaming</p>
          </div>
          {/* TWEET */}
          <div 
            className={`col-span-2 ${flexCenter} gap-2 hover:bg-gray-400 dark:hover:bg-gray-800 p-1 rounded-md cursor-pointer`}
            onClick={handleTweetOpen}
          >
              <RiMessage3Fill className='xs:text-2xl text-deep-blue dark:text-white' />
              <p className='xs:text-lg font-sans text-deep-blue dark:text-white'>Tweet</p>
          </div>
        </div>
      </div>  
      {/* MODAL POST */}
      <ModalTweet 
        user={user}
        openTweet={openTweet}
        handleTweetOpen={handleTweetOpen}
        handleTweet={handleTweet}
        // image={image}
        // setImage={setImage}
        description={description}
        setDescription={setDescription}
      />
      
      {/* MODAL LIVE */}
      <ModalLive 
        openLive={openLive}
        handleLiveOpen={handleLiveOpen}
      />

      {isLoading && (
        <div className='mt-3 flex items-center justify-center'>
          <Loader
            width='w-3'
            height='h-3'
          />
        </div>
      )}
      {isError && (
        <div className='mt-3 flex items-center justify-center'>
            <p className='text-2xl text-red'>Gagal</p>
        </div>  
      )}
    </>
  )
}

export default MyTweetWidget;