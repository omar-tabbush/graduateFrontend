import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-container">
      <ul>
        <div>
          <li>
            <Link to="/privacy">privacy</Link>
          </li>
          <li>
            {" "}
            <Link to="/terms&conditions">terms & condition</Link>
          </li>
        </div>
        <li>
          <Link to="/home">LOGO</Link>
        </li>
        <div>
          <li>
            <Link to={"contact"}>contact us</Link>
          </li>
          <li>
            <Link to={"contactDev"}>contact developer</Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Footer;
