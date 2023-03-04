import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Link = ({children, page, selectedPage, setSelectedPage}) => {
    const user = useSelector((state) => state.auth.user);

    const navigate = useNavigate();
    
    const isSelectedPage = page === selectedPage;
    const isProfile = page === 'profile';
    
    return (
        <div 
            className={
                `${isSelectedPage 
                    ? 'text-[#406aff]' 
                    : 'text-deep-blue dark:text-white'} 
                text-3xl flex justify-center items-center`}
        >
            <button
                onClick={() => {
                    navigate(isProfile ? `/${page}/${user._id}` : `/${page}`);
                    setSelectedPage(page);
                }}
            >
                {children}
            </button>
        </div>
    )
}

export default Link;