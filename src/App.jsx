
import { useContext } from 'react'
import { Routes, Route } from "react-router-dom"

import { ThemeContext } from './main'

import './App.css'
import { Homepage } from './pages/Homepage/Homepage'

function App() {
  const { themeState } = useContext(ThemeContext)

  return (
    <div className='App' data-theme={themeState.currentTheme}>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  )
}

export default App
