import { useContext } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AbilityContext } from "../../can";
import { selectAuth } from "../../redux/slices/authSlice";

const Header = () => {
  const ability = useContext(AbilityContext);
  const fromHeader = useNavigate();
  const isAuth = useSelector(selectAuth);
  return (
    <nav className="navigation-container">
      <ul>
        <div>
          <li>
            <Link to={"/home"}>home</Link>
          </li>
          <li>
            <Link to={"/alldesigns"}>all designs</Link>
          </li>
        </div>
        <li>
          <Link to={"/home"}>LOGO</Link>
        </li>
        <div>
          <li>
            {isAuth == "visitor" ? (
              <Link to={"/login"}>login</Link>
            ) : (
              <Link
                onClick={() => {
                  localStorage.clear();
                  updateAbility(ability, "visitor");
                  fromHeader("/home");
                }}
                to={"#"}
              >
                logout
              </Link>
            )}
          </li>
          {isAuth == 'visitor' ?<li>
            <Link to={"/signup"}>signup</Link>
          </li>: ""}
          <li>
            <Link to={"/dashboard"}>dashboard</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Header;
