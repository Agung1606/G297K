import React, { useState } from 'react';
import NavbarDesktop from '../navbar/NavbarDesktop';
import NavbarBottom from '../navbar/NavbarBottom';
import useMediaQuery from '../../hooks/useMediaQuery';
import { Outlet } from 'react-router-dom';
import ModalPost from '../../modal/ModalPost';

const Layout = (props) => {
  const mdScreen = useMediaQuery('(min-width: 1060px)');

   // OPEN POST
  const [openPost, setOpenPost] = useState(false);
  const handleOpenPost = () => setOpenPost(!openPost);

  return (
    <div className={props.darkMode ? 'dark' : ''}>
      {/* MODAL POST */}
      <ModalPost openPost={openPost} handleOpenPost={handleOpenPost} />

      <div>
        <Outlet />
      </div>

      {/* NAVBAR BOTTOM */}
      <NavbarBottom handleOpenPost={handleOpenPost} />

    </div>
  )
}

export default Layout;