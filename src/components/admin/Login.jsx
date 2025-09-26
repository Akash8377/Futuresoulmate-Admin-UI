import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import ErrorText from "../common/Typography/ErrorText.jsx";
import InputText from "../common/Input/InputText.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchUserDetails } from "./slice/authSlice.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.svg";

function Login() {
  const INITIAL_LOGIN_OBJ = {
    password: "",
    emailId: "",
  };

  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // Form submission handler
  const submitForm = async (e) => {
    e.preventDefault(); 

    // Basic form validation before submitting
    if (loginObj.emailId.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Email ID is required!',
        confirmButtonText: 'OK',
      });
      return;
    }
    if (loginObj.password.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Password is required!',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const loginResult = await dispatch(loginUser({
        email: loginObj.emailId,
        password: loginObj.password,
      })).unwrap(); // unwrap() will throw error if action fails, otherwise returns the result

      if (loginResult.token) {
        // If login is successful, fetch additional user details
       // await dispatch(fetchUserDetails()).unwrap(); 
        Swal.fire({
          icon: 'success',
          title: 'Login Successfully',
          text: 'You have been logged in to your account.',
          showConfirmButton: false,
          timer: 2500, 
          });
          
          dispatch(fetchUserDetails());
          // Navigate to the login page after the alert closes
          setTimeout(() => {
          navigate('/dashboard');
          }, 2500); 
      }
    } catch (error) {
      console.error("Login error:", error); // Log any error that occurs during login
    }
  };
  // Update form values as the user types
  const updateFormValue = ({ updateType, value }) => {
    setLoginObj((prevState) => ({
      ...prevState,
      [updateType]: value, // Dynamically update form field based on updateType (email or password)
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      {/* Center the login form */}
      <div className="card w-full max-w-xl shadow-xl bg-white rounded-lg overflow-hidden ">
        {/* Login form section */}
        <div className="p-8 md:p-7 flex flex-col justify-center">
         <div className="flex flex-row items-center w-full pl-32">
           <img
            src={logo}
            alt="Boston Logo"
            className={`w-[14.5rem] "brightness-75"`}
          />
         </div>

          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={submitForm}>
            {/* Email input field */}
            <InputText
              type="email"
              value={loginObj.emailId}
              updateType="emailId"
              containerStyle="mt-4"
              labelTitle="Email"
              updateFormValue={updateFormValue}
            />
            <div className="relative mt-4">
              <InputText
                // type="password"
                type={showPassword ? "text" : "password"}
                value={loginObj.password}
                updateType="password"
                containerStyle="mt-4"
                labelTitle="Password"
                updateFormValue={updateFormValue}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 pt-6 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            {error && <ErrorText styleClass="mt-4">{error}</ErrorText>}

            {isAuthenticated && (
              <div className="text-green-500 mt-2 text-center">
                Successfully logged in!
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className={`btn mt-4 w-full bg-blue-500 text-white hover:bg-blue-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 py-3 ${
                loading ? "loading" : ""
              }`}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
