
import { useContext } from 'react'
import { Routes, Route } from "react-router-dom"

import { NotificationContext, ThemeContext, UserContext } from './main'
import { Homepage } from './pages/Homepage/Homepage'
import { ProfilePage } from './pages/ProfilePage/ProfilePage'
import { PostDetail } from './pages/PostDetail/PostDetail'
import { ProtectedRoutes } from './components/ProtectedRoutes/ProtectedRoutes'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { Notification } from './components/Notification/Notification'
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop'

import './App.css'

function App() {
  const { themeState } = useContext(ThemeContext)
  const { userState } = useContext(UserContext)
  const { notificationState } = useContext(NotificationContext)

  return (
    <div className={`App`} data-theme={themeState.currentTheme}>
      {notificationState.notifications.length > 0 && <Notification />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<ProtectedRoutes isSignedIn={userState?.token}><Homepage /></ProtectedRoutes>} />            
        <Route path="/bookmarks" element={<ProtectedRoutes isSignedIn={userState?.token}><Homepage /></ProtectedRoutes>} />
        <Route path="/liked" element={<ProtectedRoutes isSignedIn={userState?.token}><Homepage /></ProtectedRoutes>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/profile/:username" element={<ProtectedRoutes isSignedIn={userState?.token}><ProfilePage /></ProtectedRoutes>} />
        <Route path="/post/:postId" element={<PostDetail />} />
      </Routes>
    </div>
  )
}

export default App
