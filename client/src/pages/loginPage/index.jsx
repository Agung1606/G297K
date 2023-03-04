import React from 'react';
import { Outlet } from 'react-router-dom';

const LayoutLogReg = (props) => {

  return (
    <div className={props.darkMode ? 'dark' : ''}>
      <div className='w-5/6 mx-auto min-h-screen pt-4 xs:pt-0
        flex flex-col xs:justify-center md:flex-row items-center gap-x-40 gap-y-10'
      >
        <div>
          <h1 className='text-6xl sm:text-7xl font-itim 
            font-bold text-gradient-blue-dark dark:text-gradient-blue'
          >
            G297K
          </h1>
        </div>

        {/* FORM */}
        <Outlet />

      </div>
    </div>
  )
}

export default LayoutLogReg;