import { LoginFormPage } from '../../components/LoginPageForm/LoginPageForm';
import { LoginPageGraphics } from '../../components/LoginPageGraphics/LoginPageGraphics';

import "./LoginPage.css"

export const LoginPage = () => {
  
  return (
    <div className='login-main-container'>
      <div className="login-container">
        <div className='login-graphics'>
          <LoginPageGraphics />
        </div>
        <LoginFormPage />
      </div>
    </div>
  )
}