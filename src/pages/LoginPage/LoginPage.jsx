import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


import "./LoginPage.css"
import { useState } from 'react';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { LoginFormPage } from '../../components/LoginPageForm/LoginPageForm';
import { LoginPageGraphics } from '../../components/LoginPageGraphics/LoginPageGraphics';


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