import React from 'react';
import { useSelector } from 'react-redux';
import { TypeAnimation } from 'react-type-animation';

const NavbarTop = () => {
    const flexBetween = 'flex justify-between items-center';
    const user = useSelector((state) => state.auth.user);

    return (
        <nav>
            {/* INNER NAV */}
            <div className={`${flexBetween} fixed top-0 z-50 w-full py-4 
                border-b-[1px] border-black/30 dark:border-white/30`}>
                <div className={`${flexBetween} mx-auto w-5/6`}>
                    <div>
                        <h1 className='text-gradient-blue-dark dark:text-gradient-blue text-3xl sm:text-5xl font-itim font-bold'>
                            G297K
                        </h1>
                    </div>
                    <div>
                        <h2 className='text-gradient-blue-dark dark:text-gradient-blue text-3xl sm:text-4xl font-itim font-bold'>
                            <TypeAnimation 
                                sequence={[
                                    user.firstName,
                                    2000,
                                    'Hello :)',
                                    2000
                                ]}
                                speed={50}
                                repeat={Infinity}
                            />
                        </h2>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarTop;