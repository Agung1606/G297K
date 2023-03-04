import React from 'react';
import { useOutletContext } from 'react-router-dom';
import PostWidget from '../widgets/PostWidget';
import {SlCamera} from 'react-icons/sl';

const UserPosts = () => {
  const [postData] = useOutletContext()

  // check if it has post with picture
  const isPost = postData.some(post => post.postPicturePath !== '');

  return (
    <div>
      {isPost ? postData.map((post) => (
        // if post has picture then send it
        post.postPicturePath && (
          <PostWidget 
            key={post._id}
            postId={post._id}
            postUserId={post.userId}
            username={post.username}
            postDate={post.postDate}
            postPicturePath={post.postPicturePath}
            userProfilePicturePath={post.userProfilePicturePath}
            description={post.description}
            likes={post.likes}
            comments={post.comments}
          />
        )
      )) : (
        <div className='h-[45vh] flex justify-center items-center'>
          <div>
            <SlCamera className='text-4xl mx-auto' />
            <p>No posts</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserPosts;