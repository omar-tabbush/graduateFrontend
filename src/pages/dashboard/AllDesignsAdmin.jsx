import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteDesign,
  getDesign,
  getDesigns,
  selectDesignErrorState,
  selectDesigns,
  selectDesignStatusState,
} from "../../redux/slices/designSlice";

export const Designs = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const fromDesign = useNavigate();

  const designs = useSelector(selectDesigns);
  const status = useSelector(selectDesignStatusState);
  const error = useSelector(selectDesignErrorState);

  useEffect(() => {
    dispatch(getDesigns());
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
              <th>edit btn</th>
              <th>delete btn</th>
            </tr>
          </thead>
          <tbody>
            {designs?.map((design, key) => (
              <tr key={key}>
                <td>{design?.id}</td>
                <td>{design?.NAME}</td>
                <td>
                  {" "}
                  <button
                    onClick={() => {
                      fromDesign(`edit/${design?.id}`);
                    }}
                  >
                    edit
                  </button>
                </td>
                <td>
                  {" "}
                  <button
                    onClick={() => {
                      dispatch(deleteDesign(+design?.id));
                    }}
                  >
                    delete
                  </button>
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
      <h1 style={{ textAlign:"center" }} >all Designs</h1>
      <button
        onClick={() => {
          fromDesign(`new`);
        }}
      >
        new design
      </button>
      {content}
    </>
  );
};
