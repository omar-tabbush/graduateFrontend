import { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { AbilityContext, updateAbility } from "../can";
import { authenticate } from "../redux/slices/authSlice";
const LOGIN_URL = "auth/login";
export const Login = () => {
  const ability = useContext(AbilityContext);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const userRef = useRef();
  const errRef = useRef();
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );


      localStorage.setItem("token", response?.data?.access_token);
      localStorage.setItem("user", JSON.stringify({ ...response?.data }));
      dispatch(authenticate(response?.data?.role)); //response should include user info
      updateAbility(ability, response?.data?.role);
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
        console.log(err);
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };
  return (
    <div className="login">
      <div className="hero-background"></div>
      {!success ? (
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
      ) : null}

      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>

        <input
          ref={userRef}
          required
          label="username: "
          variant="outlined"
          color="primary"
          type="text"
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          required
          label="password: "
          variant="outlined"
          color="primary"
          type="password"
          placeholder="Password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />

        <button className="" type="submit">
          Login
        </button>

        <Link to={""}>forgot password?</Link>

        <Link to="/register">Create Account</Link>
      </form>
    </div>
  );
};
