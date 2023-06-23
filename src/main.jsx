import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom"

import App from './App.jsx'
// import { makeServer } from './server.js'

import './index.css'
import { ThemeContext, ThemeProvider } from './contexts/ThemeContext.jsx'
import { PostContext, PostProvider } from './contexts/PostContext.jsx'
import { UserContext, UserProvider } from './contexts/UserContext.jsx'
import { ProfileContext, ProfileProvider } from './contexts/ProfileContext.jsx'

// makeServer()

export {ThemeContext}
export {PostContext}
export {UserContext}
export {ProfileContext}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <ProfileProvider>
          <PostProvider>
            <Router>
              <App />
            </Router>
          </PostProvider>
        </ProfileProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
