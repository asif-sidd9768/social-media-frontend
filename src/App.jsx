
import { useContext } from 'react'
import { Routes, Route, useLocation } from "react-router-dom"

import { ThemeContext } from './main'

import './App.css'
import { Homepage } from './pages/Homepage/Homepage'
import { ProfilePage } from './pages/ProfilePage/ProfilePage'
import { SideMenu } from './components/SideMenu/SideMenu'
import { Menu } from './components/MainSection/Menu/Menu'
import { SideMenuProfile } from './components/SideMenuProfile/SideMenuProfile'

function App() {
  const { themeState } = useContext(ThemeContext)
  const location = useLocation()

  return (
    <div className='App main-app-container' data-theme={themeState.currentTheme}>
      <div>
        {location.pathname === "/profile" ? <SideMenuProfile /> : <SideMenu />}
      </div>
      <div>
        <div>
          <Menu/>
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/bookmarks" element={<Homepage />} />
            <Route path="/liked" element={<Homepage />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
