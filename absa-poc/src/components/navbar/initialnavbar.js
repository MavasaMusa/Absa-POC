import "./navbar.css";
import LandingPage from "../pages/landing/landing";
import Profile from "../pages/profile/profile";
function IniNavbar() {

  return (
    <nav className="navbar">
      <div className="navdiv">
        <div className="logo">
          <a href="/landing">
            <img src="https://www.underconsideration.com/brandnew/archives/absa_logo.png" />
          </a>
        </div>
       
      </div>
    </nav>
  );
}

export default IniNavbar;