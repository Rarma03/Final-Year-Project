import React, { useState } from "react";
import "./StudentRegisterPage.css";

const StudentRegisterPage = () => {
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
      <h2 className="form-title">Student Register</h2>
      <div className="social-login">
        <button className="social-button">
          {/* <img
            src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
            alt="Google"
            className="social-icon"
          /> */}
          Go to Teacher register
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
            type="text"
            placeholder="Name"
            className="input-field"
            required
          />
        </div>
        <div className="input-wrapper">
          <select className="input-field" required>
            <option value="" disabled selected>
              Select Branch
            </option>
            <option value="CSE">Computer Science & Engineering</option>
            <option value="IT">Information Technology</option>
            <option value="ECE">Electronics & Communication Engineering</option>
            <option value="ME">Mechanical Engineering</option>
            <option value="CE">Civil Engineering</option>
            <option value="EE">Electrical Engineering</option>
          </select>
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enrollment Number"
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
        <div className="input-wrapper">
          <input
            type={isConfirmPasswordShown ? "text" : "password"}
            placeholder="Confirm Password"
            className="input-field"
            required
          />
          <i
            onClick={toggleConfirmPasswordVisibility}
            className="material-symbols-rounded eye-icon"
          >
            {isConfirmPasswordShown ? "visibility" : "visibility_off"}
          </i>
        </div>
        <button type="submit" className="login-button">
          Register
        </button>
      </form>
      <p className="signup-prompt">
        Already have an account?{" "}
        <a href="#" className="signup-link">
          Sign In
        </a>
      </p>
    </div>
  );
};

export default StudentRegisterPage;
