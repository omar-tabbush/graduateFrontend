import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { privateAxios } from "../../api/axios";
import { addUser } from "../../redux/slices/userSlice";

export const NewUser = () => {
  const dispatch = useDispatch();
  const fromNewUser = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password,
    };
    if (user.password !== user.password2) {
      setErrors("passwords must match");
      return;
    }
    try {
      dispatch(addUser(newUser));
      fromNewUser(-1);
    } catch (err) {
      setErrors(err +"\n");
    }

    console.log(newUser);
  };

  return (
    <div style={{ padding: "3vw" }}>
      <form onSubmit={onSubmit} className="login-form">
        <h1 className="">create user</h1>
        <input
          id="firstName"
          required
          type="text"
          placeholder="firstName name"
          value={user?.firstName}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <input
          required
          id="lastName"
          name="lastName"
          type="text"
          placeholder="lastName name"
          value={user?.lastName}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <input
          required
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          value={user?.username}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />

        <input
          required
          id="email"
          name="email"
          type="email"
          placeholder="email"
          value={user?.email}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <input
          required
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={user?.password}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />

        <input
          required
          id="password2"
          name="password2"
          type="password"
          placeholder="confirm password"
          value={user?.password2}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />

        <button className="" type="submit">
          create user
        </button>
      </form>
    </div>
  );
};
