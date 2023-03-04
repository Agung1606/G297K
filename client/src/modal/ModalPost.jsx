import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddNewPostMutation } from '../state/api';
import Dropzone from 'react-dropzone';
import {
    Dialog,
    DialogHeader,
    DialogBody,
} from '@material-tailwind/react';
import Loader from '../components/Loader';
// ICONS
import { MdClose } from 'react-icons/md';
import { BsImages } from 'react-icons/bs';

const ModalPost = ({ openPost, handleOpenPost }) => {
  const flexBetween = 'flex justify-between items-center';
  
  // GET USER ID AND TOKEN FROM GLOBAL STATE
  const loggedInUserId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);
  
  // POST PHOTO
  const [addNewPost, { isLoading, isError }] = useAddNewPostMutation();
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  // HANDLE POST
  const handlePost = async () => {
      const formData = new FormData();
      formData.append('userId', loggedInUserId);
      formData.append('picture', image);
      formData.append('postPicturePath', image.name);
      if(description) {
          formData.append('description', description);
      }

      await addNewPost({ formData, token });
      setImage(null);
      setDescription('');
      handleOpenPost();
  };

  return (
    <Dialog
      open={openPost}
      handler={handleOpenPost}
      className="w-[350px] max-w-[450px] bg-[#252425]"
      animate={{
        mount: { scale: 1 },
        unmount: { scale: 1.1 }
      }}
    >
      <DialogHeader className={`${flexBetween}`}>
        <p className='text-white text-xl xs:text-2xl'>
          Buat postingan
        </p>
        <button 
          onClick={() => {
             handleOpenPost();
             setImage(null);
            }}
        >
          <MdClose className='text-3xl p-1 text-white hover:bg-gray-500 rounded-full' /> 
        </button>
      </DialogHeader>
      {/* LINE */}
      <div className='w-full h-[1px] bg-blue/50' />
      <DialogBody>
        {!image ? (
          <div className='h-[300px] flex justify-center items-center'>
            <div>
              <div className='text-white text-6xl mb-2'>
                <BsImages className='mx-auto' />
              </div>
              <div>
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div 
                      {...getRootProps()}
                      className='btn-bg w-60 py-2 text-center text-xl text-white font-serif rounded-md'
                    >
                      <input {...getInputProps()} />
                      Tambah foto
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>
          </div>
        ) : (
          <div className='my-4'>
            <div className='mb-3'>
              <textarea 
                placeholder='caption...'
                className='bg-inherit w-[90%] px-2 text-white border border-gray-700 rounded-md text-lg scrollbar-hide focus:outline-none'
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className='mb-3'>
              <p className='text-lg text-white font-itim'>
                {image.name}
              </p>
            </div>
            <div className='mt-4 text-center'>
              <button 
                className='btn-bg w-[80%] py-2 text-white rounded-lg text-lg font-semibold tracking-wider uppercase'
                disabled={!image}
                onClick={handlePost}
              >
                Post
              </button>
            </div>
          </div>
        )}
      {isLoading && (
        <div className='my-4 flex items-center justify-center'>
          <Loader
            width='w-3'
            height='h-3'
          />
        </div>
      )}
      {isError && (
        <div className='my-4 flex items-center justify-center'>
            <p className='text-2xl text-red'>Gagal</p>
        </div>  
      )}
      </DialogBody>
    </Dialog>
  )
}

export default ModalPost;