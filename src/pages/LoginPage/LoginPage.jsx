import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import logoImg from "../../assets/images/logo-new.png"
import "./LoginPage.css"
import { useState } from 'react';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import { LoginForm } from '../../components/LoginForm/LoginForm';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().required('Required'),
});

export const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false)
  const handleLogin = () => {
    console.log('hello')
  }

  const toggleRegister = () => {
    setIsRegister(!isRegister)
  }
  return (
    <div className="login-container">
      <div className='login-logo-container'>
        <img src={logoImg} className='login-logo' />
      </div>
      <p className='logo-text'>Login</p>
      
    {
      isRegister ? <RegisterForm /> : <LoginForm handleLogin={handleLogin} />
    }
    <div className="login-as-test-container">
          <button onClick={(event) => handleLogin({email:"asif@test1.com", password:"test"})} className="login-as-test-btn">Login as Test<i className="fa-solid fa-flask-vial"></i></button>
        </div>
        <section className="login-page-register">
          <button onClick={toggleRegister} className="login-register-btn">
            {isRegister ? "Back to Login" : "Register"}
          </button>
        </section>
    </div>
  )
}