import React from 'react';
import { useSelector } from 'react-redux';
import { useGetFeedPostsQuery, useGetUserPostsQuery } from '../../state/api';
import PostWidget from './PostWidget';
import Loader from '../../components/Loader';

const PostsWidget = () => {

    const token = useSelector((state) => state.auth.token);
    const { data, isLoading, isError } = useGetFeedPostsQuery(token);    

    // animation while waiting data completed
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
       <>
        {data.map(
            ({
                _id,
                userId,
                username,
                postDate,
                postPicturePath,
                userProfilePicturePath,
                description,
                likes,
                comments,
            }) => (
                    <PostWidget 
                        key={_id} // I am using username as key because username is unique in my database
                        postId={_id}
                        postUserId={userId}
                        username={username}
                        postDate={postDate}
                        postPicturePath={postPicturePath}
                        userProfilePicturePath={userProfilePicturePath}
                        description={description}
                        likes={likes}
                        comments={comments}
                    />
                    )
                )}
       </>
    )
}

export default PostsWidget;