import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordShown((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordShown((prevState) => !prevState);
  };

  return (
    <div className="login-container">
      <h2 className="form-title">Login Page</h2>
      <div className="social-login">
        <button className="social-button">
          <img
            src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
            alt="Google"
            className="social-icon"
          />
          Google
        </button>
      </div>
      <p className="separator">
        <span>or</span>
      </p>
      <form action="#" className="login-form">
        <div className="input-wrapper">
          <input
            type="email"
            placeholder="Email address"
            className="input-field"
            required
          />
        </div>

        <div className="input-wrapper">
          <input
            type={isPasswordShown ? "text" : "password"}
            placeholder="Password"
            className="input-field"
            required
          />
          <i
            onClick={togglePasswordVisibility}
            className="material-symbols-rounded eye-icon"
          >
            {isPasswordShown ? "visibility" : "visibility_off"}
          </i>
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p className="signup-prompt">
        Don&apos;t have an account?{" "}
        <a href="#" className="signup-link">
          Register
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
