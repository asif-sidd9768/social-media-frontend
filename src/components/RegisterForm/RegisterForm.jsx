import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


import "../../pages/LoginPage/LoginPage.css"
import { NotificationContext, UserContext } from '../../main';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { registerUserService } from '../../services/userService';
import { loginUserAction } from '../../actions/userActions';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const RegisterForm = () => {
  const { userState, userDispatch } = useContext(UserContext)
  const {showNotification} = useContext(NotificationContext)
  const navigate = useNavigate()
  
  const handleUserRegister = async (values, {resetForm}) => {
    console.log(values)
    // if(userState.isLoading){
    //   showNotification("Some work is in progress", "error")
    //   return
    // }
    // // userDispatch(registerUserRequestAction())
    try {
      const {status, data} = await registerUserService(values)
      // console.log(result)
      if(status === 200){
        userDispatch(loginUserAction(data))
      }
      if(!localStorage.getItem("user")){
        localStorage.setItem("user", JSON.stringify({token: data.token, user: data.user}))
      }
      showNotification(`Welcome, ${data?.user?.firstName} ${data?.user?.lastName[0]} `, "success")
      navigate(location?.state?.from?.pathname || "/")
    }catch(error){
      console.log(error.response.data.message)
      showNotification(error.response.data.message ?? "Failed to Register!", "error")
    }
    // try {
    //   const response = await registerUser(values)
    //   userDispatch(setUserAction(response.data))
    //   cartDispatch(setCartItemsAction(response?.data?.user?.cart))
    //   wishlistDispatch(setWishlistAction(response?.data?.user?.wishlist))
    //   localStorage.setItem("user", JSON.stringify(response.data))
    //   localStorage.setItem("cart", JSON.stringify(response.data.user.cart))
    //   localStorage.setItem("wishlist", JSON.stringify(response.data.user.wishlist))
    //   showNotification(`Welcome, ${response?.data?.user?.name}.`, "success")
    //   navigate(location?.state?.from?.pathname || "/")
    //   resetForm()
    // }catch(error){
    //   userDispatch(registerUserFailureAction(error.response.data.message))
    //   showNotification(error.response.data.message, "error")
    //   resetForm()
    // }
  }

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', username: '', password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={handleUserRegister}
    >
      {({ errors, touched }) => (
        <Form className="login-form">
          <div>
            <p className="login-user-id-label">First Name</p>
            <Field
              type="text"
              name="firstName"
              className="login-user-id-input"
              placeholder="Techadelic"
            />
            <ErrorMessage className="error-message" name="firstName" component="div" />
          </div>
          <div>
            <p className="login-user-id-label">Last Name</p>
            <Field
              type="text"
              name="lastName"
              className="login-user-id-input"
              placeholder="Project"
            />
            <ErrorMessage className="error-message" name="lastName" component="div" />
          </div>
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
            />
            <ErrorMessage className="error-message" name="password" component="div" />
          </div>
          <div>
            <p className="login-user-id-label">Confrim Password</p>
            <Field
              type="password"
              name="confirmPassword"
              className="login-user-id-input"
              placeholder="******"
            />
            <ErrorMessage className="error-message" name="confirmPassword" component="div" />
          </div>
          <div className='login-submit-container'>
            <button type="submit" className="login-submit-btn">Register</button>
          </div>
        </Form>
      )}
    </Formik>
  )
}