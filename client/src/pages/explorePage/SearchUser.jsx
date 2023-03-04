import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { FaArrowLeft } from 'react-icons/fa';

const SearchUser = ({ 
    isSearch, 
    setIsSearch, 
    usernameSearch,
    setUsernameSearch 
}) => {

  return (
    <div className='w-full flex justify-between items-center gap-x-2'>
        {isSearch && (
            <div onClick={() => {
                setIsSearch(false);
                setUsernameSearch('');
            }}>
                <FaArrowLeft className='text-2xl text-deep-blue dark:text-white' />
            </div>
        )}
        <div className={`${isSearch ? 'basis-11/12' : 'basis-full'} relative`}>
            <input 
                onFocus={() => setIsSearch(true)}
                value={usernameSearch}
                onChange={(e) => setUsernameSearch(e.target.value)}
                type="text"
                placeholder='Cari'
                className='w-full py-2 xs:py-3 px-4 bg-[#525252] dark:bg-[#333333] rounded-lg placeholder:text-white placeholder:text-lg focus:outline-none'
            />
            <div className='absolute right-3 top-[13px] xs:top-[15px]'>
                <BiSearchAlt className='text-lg' />
            </div>
        </div>
    </div>
  )
}

export default SearchUser