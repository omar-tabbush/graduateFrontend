import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillInfoCircle } from "react-icons/ai";
import { AbilityContext, updateAbility } from "../can";
import { useContext } from "react";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NAME_REGEX = /^[A-z]{3,24}$/;
const REGISTER_URL = "/auth/register";

export const Register = () => {
  const ability = useContext(AbilityContext);


  const userRef = useRef(null);
  const errRef = useRef(null);
  //   const {setAuth}  =  useAuth();
  const [email, setEmail] = useState("");

  const [firstName, setFirst] = useState("");
  const [validFirst, setValidFirst] = useState(false);
  const [firstFocus, setFirstFocus] = useState(false);

  const [lastName, setLast] = useState("");
  const [validLast, setValidLast] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);

  const [username, setUser] = useState("");
  const [validUser, setvalidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidFirst(NAME_REGEX.test(firstName));
    setValidLast(NAME_REGEX.test(lastName));
  }, [firstName, lastName]);

  useEffect(() => {
    setvalidUser(USER_REGEX.test(username));
    // console.log(validUser);
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    const v3 = password === matchPwd;
    const v4 = firstName.length > 0;
    const v5 = lastName.length > 0;
    const v6 = email.length > 0;
    if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6) {
      setErrMsg("Please check your input");
      console.log("invalid input");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          firstName,
          lastName,
          username,
          password,
          role: "client",
          email,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );

      const accessToken = response?.data?.access_token;
      localStorage.setItem("token", JSON.stringify(accessToken));
      localStorage.setItem("user", JSON.stringify({ ...response?.data }));

      dispatch(authenticate(response?.data?.role)); //response should include user info
      updateAbility(ability, response?.data?.role);

      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setFirst("");
      setLast("");
      setUser("");
      setEmail("");
      setPwd("");
      setMatchPwd("");
      console.log("success");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
      console.log({ errMsg });
      console.log(err);
    }
  };
  return (
    <div style={{ padding: "3vw" }}>
      {!success && (
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
      )}
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="">register</h1>
        <input
          id="firstName"
          required
          label="firstName Name.."
          variant="outlined"
          color="primary"
          type="text"
          placeholder="firstName name"
          value={firstName}
          aria-invalid={validFirst ? "false" : "true"}
          aria-describedby="uidnote"
          onChange={(e) => setFirst(e.target.value)}
          onFocus={() => setFirstFocus(true)}
          onBlur={() => setFirstFocus(false)}
        />
        <input
          required
          id="lastName"
          label="lastName Name.."
          variant="outlined"
          color="primary"
          type="text"
          placeholder="lastName name"
          value={lastName}
          aria-invalid={validLast ? "false" : "true"}
          onChange={(e) => setLast(e.target.value)}
          onFocus={() => setLastFocus(true)}
          onBlur={() => setLastFocus(false)}
        />
        <input
          required
          id="username"
          ref={userRef}
          label="Username.."
          variant="outlined"
          color="primary"
          type="text"
          placeholder="Username"
          value={username}
          aria-invalid={validUser ? "false" : "true"}
          aira-describedby="username-error"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          onChange={(e) => setUser(e.target.value)}
        />
        <p
          id="uidnote"
          className={
            userFocus && username && !validUser ? "instructions" : "offscreen"
          }
        >
          <AiFillInfoCircle />
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>
        <input
          required
          id="email"
          label="email.."
          variant="outlined"
          color="primary"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          id="password"
          label="Password.."
          variant="outlined"
          color="primary"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPwd(e.target.value)}
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p
          id="pwdnote"
          className={
            pwdFocus && password && !validPwd ? "instructions" : "offscreen"
          }
        >
          <AiFillInfoCircle />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>
        <input
          required
          id="matchPwd"
          label="Password.."
          variant="outlined"
          color="primary"
          type="password"
          placeholder="confirm password"
          value={matchPwd}
          onChange={(e) => setMatchPwd(e.target.value)}
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          id="uidnote"
          className={
            matchFocus && matchPwd && !validMatch ? "instructions" : "offscreen"
          }
        >
          <AiFillInfoCircle />
          it should match the password
        </p>
        <button
          // disabled={!validUser || !validPwd || !validMatch || validFirst || validLast ? true : false}
          className=""
          type="submit"
        >
          Register
        </button>
        {!success ? (
          <Link to="/login">
            I have an account
            <strong> Login</strong>
          </Link>
        ) : (
          <Link to="#">
            you have successfully
            <strong> registered</strong>
          </Link>
        )}
      </form>
    </div>
  );
};

export default Register;
