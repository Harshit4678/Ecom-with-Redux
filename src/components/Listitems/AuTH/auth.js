import { useState, Fragment, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Loader from "../UI/loader";
import { useDispatch } from "react-redux";
import {
  loginWithEmailAndPassword,
  signupWithEmailAndPassword,
} from "../../../actions/authActions";

const AuthIndex = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const type = location.pathname.split("/")[1];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  //cleanup function
  useEffect(() => {
    return () => {
      setLoader(false);
      setDetails({
        email: "",
        password: "",
      });
    };
  }, []);

  const handleSubmission = (e) => {
    e.preventDefault();
    console.log(details);
    if (type === "signup") {
      setLoader(true);
      dispatch(
        signupWithEmailAndPassword(details, (data) => {
          if (data.error) {
            console.log(data.error);
            alert("Some error occured");
          } else {
            console.log("Successfully Signed Up");
            navigate("/");
          }
          setLoader(false);
        })
      );
    } else if (type === "login") {
      setLoader(true);
      dispatch(
        loginWithEmailAndPassword(details, (data) => {
          if (data.error) {
            console.log(data.error);
            // alert("Some error occured");
            alert(data?.response?.data?.error?.message || "Some error occured");
          } else {
            console.log("Successfully logged in !");
            navigate("/");
          }
          setLoader(false);
        })
      );
    }
  };

  // console.log("AuthIndex type:", type);

  return (
    <Fragment>
      <div className="auth-container">
        <div className="auth-Box">
          <div className="tab-selector">
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <h3>Login</h3>
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <h3>Signup</h3>
            </NavLink>
          </div>
          <form autoComplete={"off"} onSubmit={handleSubmission}>
            <div className="input-wrap">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                placeholder="Enter Email"
                value={details.email}
                onChange={handleInput}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={details.password}
                onChange={handleInput}
              />
            </div>
            <div className="button-wrap">
              <button className="login-btn">
                {type === "login" ? "Login" : "Signup"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {loader && <Loader />}
    </Fragment>
  );
};

export default AuthIndex;
