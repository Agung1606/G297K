import React from 'react';
import { useSelector } from 'react-redux';
import { useGetFeedPostsQuery } from '../../state/api';
import Loader from '../../components/Loader';

// each image 
const ExplorePost = ({ post }) => {

  return(
    <>
      {post.postPicturePath && (
      <div 
        className='col-span-3 xs:col-span-2 row-span-1 xs:row-span-2 cursor-pointer'
      >
        <img 
          alt={`${post.username}-post`}
          src={`http://localhost:4001/assets/${post.postPicturePath}`}
          className='w-full h-full object-cover'
        />
        </div>
      )}
    </>
  );
};

const ExploreFeed = () => {
  const token = useSelector((state) => state.auth.token);
  const { data, isLoading, isError } = useGetFeedPostsQuery(token);

  if(isLoading) {
      return (
        <div className='mt-3 flex items-center justify-center'>
          <Loader
            width='w-4'
            height='h-4'
          />
        </div>
      )
  };

  if(isError) {
      return (
          <div className='mt-3 flex items-center justify-center'>
              <p className='text-xl text-red font-semibold'>Internal server error</p>
          </div>
      )
  };

  return (
    <div className='grid grid-cols-6 md:grid-cols-8 auto-rows-[100px] gap-[3px] xs:gap-[5px]'>
      {data.map(post => (
        <ExplorePost 
          key={post._id}
          post={post} 
        />
      ))}
    </div>
  )
}

export default ExploreFeed;