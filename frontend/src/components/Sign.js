import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Sign.css';

const Sign = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
  });

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = user;

    // Form validation
    if (!name || !email || !password || !cpassword) {
      toast.info('All fields are required.',  {position: toast.POSITION.TOP_CENTER});
      return;
    }

    if (password !== cpassword) {
      toast.error('Password and confirm password do not match.',  {position: toast.POSITION.TOP_CENTER});
      return;
    }

    const res = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        cpassword
      })
    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      toast.error('Invalid Registration');
    } else {
      
     alert("Registartion Succesfull")
      navigate('/login');
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleModeToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div className={`toggle-button ${isDarkMode ? 'dark' : 'light'}`} onClick={handleModeToggle}></div>
        <div className={`vh-100 bg-image ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
          <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div className={`card ${isDarkMode ? 'bg-dark text-light' : 'bg-light'}`}>
                    <div className="card-body p-5">
                      <div className="d-flex justify-content-end mb-3">
                        <div className={`toggle-button ${isDarkMode ? 'dark' : 'light'}`} onClick={handleModeToggle}></div>
                      </div>

                      <form method="POST">
                        <div className={`form-outline mb-4 ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                          <label htmlFor="formName" className={`form-label ${isDarkMode ? 'text-light' : 'text-dark'}`}>Your Name</label>
                          <input
                            type="text"
                            id="formName"
                            className={`form-control ${isDarkMode ? 'bg-dark text-light' : ''}`}
                            name="name" placeholder=' Name'
                            value={user.name}
                            onChange={handleInputs}
                          />
                        </div>

                        <div className={`form-outline mb-4 ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                          <label htmlFor="formEmail" className={`form-label ${isDarkMode ? 'text-light' : 'text-dark'}`}>Your Email</label>
                          <input
                            type="email"
                            id="formEmail"
                            className={`form-control ${isDarkMode ? 'bg-dark text-light' : ''}`}
                            name="email"
                            value={user.email}
                            onChange={handleInputs}
                            placeholder="Email"
                          />
                        </div>

                        <div className={`form-outline mb-4 ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                          <label htmlFor="formPassword" className={`form-label ${isDarkMode ? 'text-light' : 'text-dark'}`}>Password</label>
                          <input
                            type="password"
                            id="formPassword"
                            className={`form-control ${isDarkMode ? 'bg-dark text-light' : ''}`}
                            name="password"
                            value={user.password}
                            onChange={handleInputs}
                            placeholder="Password"
                          />
                        </div>

                        <div className={`form-outline mb-4 ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                          <label htmlFor="formConfirmPassword" className={`form-label ${isDarkMode ? 'text-light' :  'text-dark'}`}>Confirm Password</label>
                          <input
                            type="password"
                            id="formConfirmPassword"
                            className={`form-control ${isDarkMode ? 'bg-dark text-light' : ''}`}
                            name="cpassword"
                            value={user.cpassword}
                            onChange={handleInputs}
                            placeholder="Confirm Password"
                          />
                        </div>

                        <div className={`form-check d-flex justify-content-start mb-5 ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                          <NavLink to="#!" className={`text-body ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                            <u>Terms of Service</u>
                          </NavLink>
                        </div>

                        <div className="d-grid">
                          <button
                            type="submit"
                            name="sign"
                            id="sign"
                            onClick={postData}
                            className={`btn btn-primary btn-lg gradient-custom-4 text-body ${isDarkMode ? 'btn-dark' : ''}`}
                          >
                            Register
                          </button>
                        </div>

                        <p className={`text-center text-muted mt-5 mb-0 ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                          Already have an account?{' '}
                          <NavLink to="/login" className={`fw-bold text-body ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                            <u>Login here</u>
                          </NavLink>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sign;

