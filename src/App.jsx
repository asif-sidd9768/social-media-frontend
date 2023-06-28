
import { useContext } from 'react'
import { Routes, Route, useLocation } from "react-router-dom"

import { ThemeContext } from './main'

import './App.css'
import { Homepage } from './pages/Homepage/Homepage'
import { ProfilePage } from './pages/ProfilePage/ProfilePage'
import { SideMenu } from './components/SideMenu/SideMenu'
import { Menu } from './components/MainSection/Menu/Menu'
import { SideMenuProfile } from './components/SideMenuProfile/SideMenuProfile'
import { PostDetail } from './pages/PostDetail/PostDetail'
import { RightSideBar } from './components/MainSection/RightSideBar/RightSideBar'
import { ProtectedRoutes } from './components/ProtectedRoutes/ProtectedRoutes'
import { LoginPage } from './pages/LoginPage/LoginPage'

function App() {
  const { themeState } = useContext(ThemeContext)
  const location = useLocation()

  return (
    <div className='App main-app-container' data-theme={themeState.currentTheme}>
      <div className='main-app-sidemenu'>
        {location.pathname.includes("profile") ? <div className=''><SideMenuProfile /></div> : <div><SideMenu /></div>}
      </div>
      <div className='app-main-section'>
        <div className='app-menu-container'>
          <Menu/>
        </div>
        <div className='app-route-section'>
          <div>
            <Routes>
              <Route path="/" element={<Homepage />} />            
              <Route path="/bookmarks" element={<Homepage />} />
              <Route path="/liked" element={<Homepage />} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/profile/:userId" element={<ProtectedRoutes><ProfilePage /></ProtectedRoutes>} />
              <Route path="/post/:postId" element={<PostDetail />} />
            </Routes>
          </div>
          <div className='app-side-bar'>
            <RightSideBar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
