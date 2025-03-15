import { useNavigate } from "react-router-dom";
import logincss from "./login.module.css";
import loginCartoon from "../components/images/wv52_pkc1_210811.jpg";
const Login = () => {
  const navigate = useNavigate();
  const loginHandler = () => {
    navigate("/instructions");
  };
  return (
    <div className={logincss.main}>
      <div
        className={`${logincss.container} animate__animated animate__rollIn`}
      >
        <div className=" m-3 fw-bolder d-flex ">
          <h2 className="fw-bold" style={{ color: "violet" }}>
            O
          </h2>
          <h2 className="fw-bold" style={{ color: "gold" }}>
            M
          </h2>
          <h2 className="fw-bold" style={{ color: "violet" }}>
            R
          </h2>
          <p
            className="fw-bold ms-3 border-bottom border-success border-2"
            style={{ color: "violet" }}
          >
            online test platform
          </p>
        </div>
        <div className="row ">
          <div className="col text-center mb-3">
            <div className={`${logincss.title} my-3`}>Login form</div>
            <div className={logincss.inputField}>
              <input placeholder="email id"></input>
            </div>
            <div className={logincss.inputField}>
              <input placeholder="password"></input>
            </div>
            <div className={logincss.loginBtn}>
              <div onClick={loginHandler}>login now</div>
            </div>
          </div>
          <div className="col">
            <img src={loginCartoon} height={"200px"} width={"250px"}></img>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
