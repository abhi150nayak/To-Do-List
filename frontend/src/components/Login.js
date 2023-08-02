import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from '@material-ui/core/Input';

import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validateForm = () => {
    if (!email || !password) {
      window.alert('Please fill in all fields.');
      return false;
    }
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(email)) {
      toast.info('Please enter a valid email.', {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }
    return true;
  };

  const loginUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const res = await fetch('http://localhost:4000/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    if (data.error) {
      window.alert('Error');
    } else {
      window.alert('Login Success');
      navigate('/form');
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="vh-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 text-black">
              <div className="px-5 ms-xl-4">
                <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"></i>
                <span className="h1 fw-bold mb-0"></span>
              </div>

              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form method="POST" className="w-100">
                  <h3 className="fw-normal mb-3 pb-3">Log in</h3>
                  <div className="form-outline mb-4">
                    <InputLabel htmlFor="form2Example28">Email Id</InputLabel>
                    <Input
                      type="email"
                      id="form2Example28"
                      value={email}
                      onChange={handleEmail}
                      pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <InputLabel htmlFor="form2Example28">Password</InputLabel>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      id="form2Example28"
                      value={password}
                      onChange={handlePassword}
                      className="form-control form-control-lg"
                      // Material-UI Input component with password icon
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </div>
                  <div className="pt-1 mb-4">
                    <button
                      className="btn btn-info btn-lg btn-block"
                      type="button"
                      onClick={loginUser}
                    >
                      Login
                    </button>
                  </div>
                 
                  <p>
                    Don't have an account?{' '}
                    <NavLink to="/" className="link-info">
                      Register here
                    </NavLink>
                  </p>
                </form>
              </div>
            </div>
            <div className="col-sm-6 px-0 d-none d-sm-block">
              {/* <img src=""/> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
