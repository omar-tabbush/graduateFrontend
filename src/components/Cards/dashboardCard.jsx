import { useNavigate } from "react-router-dom";

export const DashCards = () => {
  const fromDashCards = useNavigate();
  return (
    <div
      style={{
        
        width: "100vw",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        marginTop:"8vw",
      }}
    >
      <div className="dashcards">
        <div onClick={() => fromDashCards("user")} className="dashcard card-3">
          <div className="card__icon">
            <i className="fas fa-bolt"></i>
          </div>
          <p className="card__exit">
            <i className="fas fa-times"></i>
          </p>
          <h2 className="card__title">enter user manager.</h2>
          <p className="card__apply">
            <a className="card__link" href="#">
              <i className="fas fa-arrow-right"></i>
            </a>
          </p>
        </div>

        <div onClick={() => fromDashCards("design")} className="dashcard card-5">
          <div className="card__icon">
            <i className="fas fa-bolt"></i>
          </div>
          <p className="card__exit">
            <i className="fas fa-times"></i>
          </p>
          <h2 className="card__title">enter design manager.</h2>
          <p className="card__apply">
            <a className="card__link" href="#">
              <i className="fas fa-arrow-right"></i>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
