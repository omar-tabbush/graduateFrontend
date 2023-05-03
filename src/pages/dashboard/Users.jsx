import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteUser,
  getUser,
  getUsers,
  selectUserErrorState,
  selectUsers,
  selectUserStatusState,
} from "../../redux/slices/userSlice";

export const Users = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const fromUser = useNavigate();

  const users = useSelector(selectUsers);
  const status = useSelector(selectUserStatusState);
  const error = useSelector(selectUserErrorState);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  let content;
  if (status === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (status === "succeeded") {
    content = (
      <>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>role</th>
              <th>edit btn</th>
              <th>delete btn</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, key) => (
              <tr key={key}>
                <td>{user?.id}</td>
                <td>
                  {user?.firstName} {user?.lastName}
                </td>
                <td>{user?.username}</td>
                <td>{user?.email}</td>
                <td> {user?.role}</td>
                <td>
                  {" "}
                  <button
                    onClick={() => {
                      fromUser(`edit/${user?.id}`);
                    }}
                  >
                    edit
                  </button>
                </td>
                <td>
                  {" "}
                  <button
                    onClick={() => {
                      dispatch(deleteUser(+user?.id));
                    }}
                  >
                    delete
                  </button>
                  {/* dispatch(deleteUser(+user?.id)); */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }
  return (
    <>
      <h1 style={{ textAlign: "center" }}>all Users</h1>
      <button
        onClick={() => {
          fromUser(`new`);
        }}
      >
        new user
      </button>
      {content}
    </>
  );
};
