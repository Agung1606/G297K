import React, { useState } from 'react';
import Link from '../../components/Link';
import { useLocation } from 'react-router-dom';
import { GoHome, GoSearch } from 'react-icons/go';
import { VscAccount } from 'react-icons/vsc'
import { FiPlusSquare } from 'react-icons/fi';
import { TbBrandTelegram } from 'react-icons/tb';

const NavbarDesktop = ({ handleOpenPost }) => {
    const location = useLocation();
    const [selectedPage, setSelectedPage] = useState(location.pathname);

    const flexBetween = 'flex justify-between items-center';

    return (
        <>
           <div className={`fixed bottom-10 overflow-hidden z-50 w-full`}>
                {/* <div className='container mx-auto'> */}
                    <div className={`${flexBetween} w-[95%] h-[45px] xs:h-[50px] bg-black/10 dark:bg-white/10 backdrop-blur-3xl
                        rounded-full max-w-[500px] mx-auto px-5`}>
                        {/* HOME */}
                        <Link 
                            page='home' 
                            selectedPage={selectedPage} 
                            setSelectedPage={setSelectedPage}
                        >
                            <GoHome />
                        </Link>
                        {/* EXPLORE */}
                        <Link 
                            page='explore'
                            selectedPage={selectedPage} 
                            setSelectedPage={setSelectedPage}
                        >
                            <GoSearch />
                        </Link>
                        {/* POST PHOTO */}
                        <div className='text-deep-blue dark:text-white text-3xl flex justify-center items-center'>
                            <button onClick={handleOpenPost}>
                                <FiPlusSquare />
                            </button>
                        </div>
                        {/* MESSAGE */}
                        <Link 
                            page='message'
                            selectedPage={selectedPage} 
                            setSelectedPage={setSelectedPage}
                        >
                            <TbBrandTelegram />
                        </Link>
                        {/* PROFILE */}
                        <Link 
                            page='profile'
                            selectedPage={selectedPage} 
                            setSelectedPage={setSelectedPage}
                        >
                            <VscAccount />
                        </Link>
                    </div>
                {/* </div> */}
            </div>
        </>
    )
}

export default NavbarDesktop;