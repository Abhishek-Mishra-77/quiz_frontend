import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logincss from "./login.module.css";
import loginCartoon from "../components/images/wv52_pkc1_210811.jpg";
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "learner",
  });

  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const loginUserHandler = async () => {

    try {
      if (!isSignUp) {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard')
      }
      else {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/create`, user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard')
      }
    } catch (error) {
      console.error("Error logging in:", error.response?.data?.message || error.message);
      return { error: error.response?.data?.message || "Failed to login" };
    }
    finally {
      setUser({
        name: "",
        email: "",
        password: "",
        role: "learner",
      })
    }
  };



  return (
    <div className={logincss.main}>
      <div className={`${logincss.container} animate__animated animate__rollIn`}>
        <div className="m-3 fw-bolder d-flex">
          <h2 className="fw-bold" style={{ color: "violet" }}>
            QUIZ
          </h2>
          <p className="fw-bold ms-3 border-bottom border-success border-2" style={{ color: "violet" }}>
            online test platform
          </p>
        </div>

        <div className="row">
          <div className="col text-center mb-3">
            <div className={`${logincss.title} my-3`}>{isSignUp ? "Sign Up Form" : "Login Form"}</div>

            {isSignUp && (
              <div className={logincss.inputField}>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={user.name}
                  onChange={inputChangeHandler}
                />
              </div>
            )}

            <div className={logincss.inputField}>
              <input
                type="email"
                placeholder="Email ID"
                name="email"
                value={user.email}
                onChange={inputChangeHandler}
              />
            </div>

            <div className={logincss.inputField}>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={inputChangeHandler}
              />
            </div>

            {isSignUp && (
              <div className={logincss.inputField}>
                <input type="text" value="Learner" disabled />
              </div>
            )}

            <div className={logincss.loginBtn}>
              <div onClick={loginUserHandler}>{isSignUp ? "Sign Up" : "Login Now"}</div>
            </div>

            <div className="mt-3">
              <span
                onClick={() => setIsSignUp(!isSignUp)}
                style={{ cursor: "pointer", color: "violet", textDecoration: "underline" }}
              >
                {isSignUp ? "Already have an account? Login here" : "Don't have an account? Sign Up"}
              </span>
            </div>
          </div>

          <div className="col">
            <img src={loginCartoon} height="200px" width="250px" alt="Login Cartoon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
