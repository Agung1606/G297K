import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LayoutLogReg from './pages/loginPage';
import Layout from './pages/layout';
import LoginCard from './pages/loginPage/loginCard';
import RegisterCard from './pages/loginPage/RegisterCard';
import UsernameRegisterCard from './pages/loginPage/UsernameRegisterCard';
import HomePage from './pages/homePage';
import ExplorePage from './pages/explorePage';
import MessagePage from './pages/messagePage';
import EditPage from './pages/editPage';
import LayoutProfile from './pages/profilePage';
import UserPosts from './pages/profilePage/UserPosts';
import UserTweets from './pages/profilePage/UserTweets';

function App() {
  const isAuth = useSelector((state) => state.auth.token);
  const darkMode = useSelector((state) => state.auth.darkMode);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="app bg-[#E6E6FA] dark:bg-[#020116]">
        <BrowserRouter>
          <Routes>
            {/* LOGIN */}
            <Route element={isAuth ? <Navigate to="/home" /> : <LayoutLogReg  darkMode={darkMode} /> }>
              <Route path='/' element={<LoginCard />} />
              <Route path='/register' element={<RegisterCard />} />
              <Route path='/register/username' element={<UsernameRegisterCard />} />
            </Route>
            {/* MAIN */}
            <Route element={isAuth ? <Layout darkMode={darkMode} /> : <Navigate to="/" /> }>
              {/* HOME */}
              <Route path='/home' element={<HomePage />} />
              {/* EXPLORE */}
              <Route path='/explore' element={<ExplorePage />} />
              {/* MESSAGE */}
              <Route path='/message' element={<MessagePage />} />
              {/* PROFILE */}
              <Route element={<LayoutProfile darkMode={darkMode} />}>
                <Route path='/profile/:userId' element={<UserPosts />} />
                <Route path='/profile/:userId/tweet' element={<UserTweets />} />
              </Route>
              {/* EDIT ACCOUNT */}
              <Route path='/accounts/edit' element={<EditPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App;
