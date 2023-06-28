import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import { UserContext } from '../../contexts/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

export const LoginForm = () => {
  const { loginUser } = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogin = async (values, {resetForm}) => {
    console.log('text', values)
    try {
      const result = await loginUser(values)
      navigate(location?.state?.from?.pathname || "/")
    }catch(error){
      console.log(error)
    }finally {
      resetForm()
    }
  }
  return (
    <Formik
      initialValues={{username: '', password: ''}}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ errors, touched }) => (
        <Form className="login-form">
          <div>
            <p className="login-user-id-label">Username</p>
            <Field
              type="text"
              name="username"
              className="login-user-id-input"
              placeholder="techadelic"
            />
            <ErrorMessage className="error-message" name="username" component="div" />
          </div>
          <div >
            <p className="login-user-id-label">Password</p>
            <Field
              type="password"
              name="password"
              className="login-user-id-input"
              placeholder="******"
              autoComplete="off"
            />
            <ErrorMessage className="error-message" name="password" component="div" />
          </div>
          <div className='login-submit-container'>
            <button type="submit" className="login-submit-btn">Login</button>
          </div>
        </Form>
      )}
    </Formik>
    // <form onSubmit={handleLogin} className="login-form">
    //   <p className="login-user-id-label">Email</p>
    //   <input
    //     type="email"
    //     className="login-user-id-input"
    //     placeholder="Enter your email"
    //   />
    //   <br />
    //   <br />
    //   <p className="login-user-id-label">Password</p>
    //   <input
    //     type="password"
    //     className="login-user-id-input"
    //     placeholder="Enter your password"
    //   />
    //   <button type="submit" className="login-submit-btn">
    //     Login
    //   </button>
    // </form>
  )
}