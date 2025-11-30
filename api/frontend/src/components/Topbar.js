import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext, useState } from "react";
import { Context } from "../context/Context";
const Topbar = () => {
  const { user, dispatch } = useContext(Context);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="top">
        <div className="topLeft">
          <i className="topIcon fa-brands fa-linkedin"></i>
          <i className="topIcon fa-brands fa-facebook"></i>
          <i className="topIcon fa-brands fa-twitter"></i>
        </div>
        
        {/* Hamburger Menu Icon */}
        <div className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <i className={mobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        <div className={`topCentre ${mobileMenuOpen ? "active" : ""}`}>
          <ul className="topList">
            <li className="topListItem" onClick={closeMobileMenu}>
              <Link className="link" to="/">
                HOME
              </Link>
            </li>
            <li className="topListItem" onClick={closeMobileMenu}>
              <Link className="link" to="/about">
                ABOUT
              </Link>
            </li>
            <li className="topListItem" onClick={closeMobileMenu}>
              <Link className="link" to="/contact">
                CONTACT
              </Link>
            </li>
            <li className="topListItem" onClick={closeMobileMenu}>
              <Link className="link" to="/write">
                WRITE
              </Link>
            </li>
            {user && (
              <li className="topListItem" onClick={handleLogout}>
                LOGOUT
              </li>
            )}
            {!user && (
              <>
                <li className="topListItem mobileOnly" onClick={closeMobileMenu}>
                  <Link className="link" to="/login">
                    LOGIN
                  </Link>
                </li>
                <li className="topListItem mobileOnly" onClick={closeMobileMenu}>
                  <Link className="link" to="/register">
                    REGISTER
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="topRight">
          {user ? (
            <Link to="/settings">
              <>
                <img
                  className="topImg"
                  src={`http://localhost:5000/images/${user.profilePic}`}
                  alt=""
                />
                <i className="topSearchIcon fa-sharp fa-solid fa-magnifying-glass"></i>
              </>
            </Link>
          ) : (
            <ul className="topList topRightList">
              <li className="topListItem">
                <Link className="link" to="/login">
                  LOGIN
                </Link>
              </li>
              <li className="topListItem">
                <Link className="link" to="/register">
                  REGISTER
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
      {mobileMenuOpen && <div className="overlay" onClick={closeMobileMenu}></div>}
    </>
  );
};

export default Topbar;
