import React from 'react';
import { MdClose } from 'react-icons/md';
import { 
  Dialog,
  DialogHeader,
  DialogBody,
} from '@material-tailwind/react';
import UserImage from '../components/UserImage';

/* Modal Post */
const ModalTweet = ({ 
  user,
  openTweet,
  handleTweetOpen,
  handleTweet,
  description,
  setDescription,
}) => {
  const flexBetween = 'flex justify-between items-center';

  return(
    <Dialog 
      open={openTweet} 
      handler={handleTweetOpen}
      className='w-[350px] max-w-[450px] bg-[#252425]'
    >
      <DialogHeader className={`${flexBetween}`}>
          <p className='text-[20px] text-white font-sans'>
            Tweet
          </p>
          <button onClick={handleTweetOpen}>
            <MdClose className='text-3xl p-1 text-white hover:bg-gray-500 rounded-full' /> 
          </button>
      </DialogHeader>
      <div className='w-full h-[1px] bg-blue/50' />
      <DialogBody>
        <div className='flex items-center gap-3 text-white'>
          <UserImage image={user.profilePicturePath} size="35px" />
          <p>{`${user.firstName} ${user.lastName}`}</p>
        </div>

        <div className='my-6'>
          <textarea 
            placeholder='Apa yang kamu pikirkan?'
            className='bg-inherit w-[90%] text-white text-lg scrollbar-hide focus:outline-none'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className='mt-6'>
          <button
            disabled={!description}
            className='w-full text-white py-2 text-lg rounded-md bg-blue/70 hover:bg-blue/50'
            onClick={() => {
              handleTweetOpen();
              handleTweet(); 
            }}
          >
            Kirim
          </button>
        </div>

      </DialogBody>
    </Dialog>
  );

};

export default ModalTweet