import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


import "../../pages/LoginPage/LoginPage.css"
import { UserContext } from '../../main';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const RegisterForm = () => {
  const { userState, userDispatch } = useContext(UserContext)
  const navigate = useNavigate()
  
  const handleUserRegister = async (values, {resetForm}) => {
    // if(userState.isLoading){
    //   // showNotification("Some work is in progress", "error")
    //   return
    // }
    // // userDispatch(registerUserRequestAction())
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
      initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={handleUserRegister}
    >
      {({ errors, touched }) => (
        <Form className="login-form">
          <div>
            <p className="login-user-id-label">Name</p>
            <Field
              type="text"
              name="name"
              className="login-user-id-input"
              placeholder="Freaky Finds"
            />
            <ErrorMessage className="error-message" name="name" component="div" />
          </div>
          <div>
            <p className="login-user-id-label">Email</p>
            <Field
              type="text"
              name="email"
              className="login-user-id-input"
              placeholder="finds@freakyfinds.com"
            />
            <ErrorMessage className="error-message" name="email" component="div" />
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