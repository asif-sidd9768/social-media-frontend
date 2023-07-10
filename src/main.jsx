import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom"

import { ThemeContext, ThemeProvider } from './contexts/ThemeContext.jsx'
import { PostContext, PostProvider } from './contexts/PostContext.jsx'
import { UserContext, UserProvider } from './contexts/UserContext.jsx'
import { ProfileContext, ProfileProvider } from './contexts/ProfileContext.jsx'
import { NotificationContext, NotificationProvider } from './contexts/NotificationContext.jsx'
import App from './App.jsx'

import './index.css'

export {ThemeContext}
export {PostContext}
export {UserContext}
export {ProfileContext}
export {NotificationContext}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <NotificationProvider>
        <ThemeProvider>
          <UserProvider>
            <ProfileProvider>
              <PostProvider>
                <App />
              </PostProvider>
            </ProfileProvider>
          </UserProvider>
        </ThemeProvider>
      </NotificationProvider>
    </Router>
  </React.StrictMode>,
)
