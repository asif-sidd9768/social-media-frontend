
import { useContext } from 'react'
import { Routes, Route, useLocation } from "react-router-dom"

import { NotificationContext, ThemeContext, UserContext } from './main'

import { Homepage } from './pages/Homepage/Homepage'
import { ProfilePage } from './pages/ProfilePage/ProfilePage'
import { SideMenu } from './components/SideMenu/SideMenu'
import { SideMenuProfile } from './components/SideMenuProfile/SideMenuProfile'
import { PostDetail } from './pages/PostDetail/PostDetail'
import { ProtectedRoutes } from './components/ProtectedRoutes/ProtectedRoutes'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { Notification } from './components/Notification/Notification'

import './App.css'

function App() {
  const { themeState } = useContext(ThemeContext)
  const { userState } = useContext(UserContext)
  const { notificationState } = useContext(NotificationContext)
  const location = useLocation()
  const isLoginPage = location.pathname.includes("login")

  return (
    <div className={`App ${!isLoginPage && "main-app-container"}`} data-theme={themeState.currentTheme}>
      {notificationState.notifications.length > 0 && <Notification />}
      <div className='main-app-sidemenu'>
        {location.pathname.includes("profile") && <div className=''><SideMenuProfile /></div>}
        {!isLoginPage && !location.pathname.includes("profile") && <div><SideMenu /></div>}
      </div>
      <div className='app-main-section'>
        <Routes>
          <Route path="/" element={<ProtectedRoutes isSignedIn={userState?.token}><Homepage /></ProtectedRoutes>} />            
          <Route path="/bookmarks" element={<ProtectedRoutes isSignedIn={userState?.token}><Homepage /></ProtectedRoutes>} />
          <Route path="/liked" element={<ProtectedRoutes isSignedIn={userState?.token}><Homepage /></ProtectedRoutes>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/profile/:userId" element={<ProtectedRoutes isSignedIn={userState?.token}><ProfilePage /></ProtectedRoutes>} />
          <Route path="/post/:postId" element={<PostDetail />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
