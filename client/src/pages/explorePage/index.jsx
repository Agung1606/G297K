import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchUser from './SearchUser';
import ExploreFeed from './ExploreFeed';
import { useSearchUserQuery } from '../../state/api';
import { useSelector } from 'react-redux';
import UserCard from '../../components/UserCard';

const ExpolrePage = () => {
  const token = useSelector((state) => state.auth.token);
  const [ isSearch, setIsSearch] = useState(false);
  const [usernameSearch, setUsernameSearch] = useState('');

  const { data } = useSearchUserQuery({
    username: usernameSearch,
    token
  });

  return (
    <div className='w-full h-screen pb-[8rem] xs:pb-[9rem]'>
      <div className='w-5/6 mx-auto py-2'>
        <SearchUser 
          isSearch={isSearch} 
          setIsSearch={setIsSearch} 
          usernameSearch={usernameSearch}
          setUsernameSearch={setUsernameSearch}
        />
      </div>
      <div className='w-5/6 h-full mx-auto flex flex-col justify-center'>
        {isSearch ? (
          <div className='h-full overflow-y-scroll scrollbar-hide'>
            {data && (
              data.map((user) => (
                <UserCard key={user._id} user={user} />
              ))
            )}
          </div>
        ) : (
            <div className='overflow-y-scroll scrollbar-hide'>
              <ExploreFeed />
            </div>
        )}
      </div>
    </div>
  )
}

export default ExpolrePage;