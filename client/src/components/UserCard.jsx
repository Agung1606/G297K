import React from 'react';
import UserImage from './UserImage';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
    const navigate = useNavigate();

    return(
      <div onClick={() => navigate(`/profile/${user._id}`)}>
        <div className='flex items-center gap-x-2 p-2 my-3 rounded-lg cursor-pointer'>
          <UserImage image={user.profilePicturePath} />
            <div>
              <h3 className='text-lg text-deep-blue dark:text-white'>{user.username}</h3>
              <h6 className='text-xs font-itim text-deep-blue dark:text-gray-400'>{`${user.firstName} ${user.lastName}`}</h6>
            </div>
          </div>
      </div>
    );
};

export default UserCard;