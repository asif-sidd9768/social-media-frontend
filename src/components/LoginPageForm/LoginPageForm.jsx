import { useContext, useState } from "react"
import ParticlesBg from 'particles-bg'

import logoImg from "../../assets/images/logo-new.png"
import { LoginForm } from "../LoginForm/LoginForm"
import { RegisterForm } from "../RegisterForm/RegisterForm"

import "./LoginPageForm.css"
import { UserContext } from "../../main"
import { useNavigate } from "react-router-dom"

export const LoginFormPage = () => {
  const { loginUser } = useContext(UserContext)
  const [isRegister, setIsRegister] = useState(false)
  const navigate = useNavigate()

  const toggleRegister = () => {
    setIsRegister(!isRegister)
  }

  const handleLogin = async (values, {resetForm}) => {
    try {
      const result = await loginUser(values)
    }catch(error){
      console.log(error)
    }finally {
      resetForm()
    }
  }
  return (
    <div className="form-container">
      <div className="form-content">
        <div className='login-logo-container'>
          <img src={logoImg} className='login-logo' />
          <p className='logo-text'>{isRegister ? "Register" : "Login"}</p>
        </div>
        {/* <p className='logo-text'>Login</p> */}
        {
          isRegister ? <RegisterForm /> : <LoginForm handleLogin={handleLogin} />
        }
        <div className="login-as-test-container">
          <button onClick={(event) => loginUser({username:"asif", password:"test"})} className="login-as-test-btn">Login as Test<i className="fa-solid fa-flask-vial"></i></button>
        </div>
        <section className="login-page-register">
          <button onClick={toggleRegister} className="login-register-btn">
            {isRegister ? "Back to Login" : "Register"}
          </button>
        </section>
      </div>
      <ParticlesBg type="lines" bg={true} num={10} />
    </div>
  )
}