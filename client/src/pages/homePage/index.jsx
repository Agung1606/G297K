import React from 'react';
import MyTweetWidget from '../widgets/MyTweetWidget';
import PostsWidget from '../widgets/PostsWidget';
import NavbarTop from '../navbar/NavbarTop';
import SponsorCard from './SponsorCard';
import useMediaQuery from '../../hooks/useMediaQuery';

const HomePage = () => {
  const desktop = useMediaQuery('(min-width: 1300px)');

  return (
    <div className='w-full h-screen pt-[75px] xs:pt-[85px] pb-16 xs:pb-20'>
      <NavbarTop />
      <div className='h-full mx-auto flex justify-center'>
        <div className='mx-2 xs:mx-0 basis-[480px] overflow-y-scroll scrollbar-hide'>
          <MyTweetWidget />
          <div className='mt-8'>
            <PostsWidget />
          </div>
        </div>
      </div>
      {desktop && <div className='fixed right-10 top-24'>
        <SponsorCard />
      </div>}
    </div>
  )
}

export default HomePage;