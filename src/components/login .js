import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logincss from "./login.module.css";
import loginCartoon from "../components/images/wv52_pkc1_210811.jpg";
import { loginUserHandler, signUpHandler } from "../api/authApi";

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

  const formHandler = async () => {
    try {
      if (isSignUp) {
        const data = await signUpHandler(user);
        console.log("Sign Up successful:", data);
        alert("Sign Up Successful! Please log in.");
        setIsSignUp(false);
      } else {
        const data = await loginUserHandler({ email: user.email, password: user.password });
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        navigate("/instructions");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
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
              <div onClick={formHandler}>{isSignUp ? "Sign Up" : "Login Now"}</div>
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
