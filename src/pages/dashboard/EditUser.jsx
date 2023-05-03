import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, selectUser, updateUser } from "../../redux/slices/userSlice";

export const EditUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const fromEditUser = useNavigate();

  const oldUser = useSelector(selectUser);

  useEffect(() => {
    dispatch(getUser(+id));
  }, []);

  useEffect(() => {
    setUser({
      id: +oldUser?.id,
      firstName: oldUser?.firstName,
      lastName: oldUser?.lastName,
      username: oldUser?.username,
      email: oldUser?.email,
      password: "",
      password2: "",
    });
  }, [oldUser]);

  const [user, setUser] = useState({
    id: +id,
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
    const editedUser = {
      id: +id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password,
    };

    if (user?.password !== user?.password2) {
      try {
        if (user.password !== user?.password2)
          throw Error("password dont match");
        dispatch(updateUser(editedUser));
        fromEditUser(-1);
      } catch (err) {
        setErrors(err);
      }
    } else {
      setErrors("passwords do not match");
    }
    console.log(editedUser);
  };

  return (
    <div style={{ padding: "3vw" }}>
      <form onSubmit={onSubmit} className="login-form">
        <h1 className="">edit user</h1>
        <input
          name="firstName"
          id="firstName"
          required
          color="primary"
          type="text"
          placeholder="firstName name"
          value={user?.firstName || ""}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <input
          required
          name="lastName"
          id="lastName"
          color="primary"
          type="text"
          placeholder="lastName name"
          value={user?.lastName || ""}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <input
          required
          name="username"
          id="username"
          type="text"
          placeholder="Username"
          value={user?.username || ""}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />

        <input
          required
          name="email"
          id="email"
          label="email.."
          color="primary"
          type="email"
          placeholder="email"
          value={user?.email || ""}
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
          value={user?.password || ""}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />

        <input
          required
          id="password2"
          type="password"
          name="password2"
          placeholder="confirm password"
          value={user?.password2 || ""}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        {errors}

        <button className="" type="submit">
          update user
        </button>
      </form>
    </div>
  );
};
