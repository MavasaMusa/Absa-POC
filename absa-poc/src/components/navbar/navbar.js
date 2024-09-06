import "./navbar.css";
import LandingPage from "../pages/landing/landing";
import Profile from "../pages/profile/profile";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navdiv">
        <div className="logo">
          <a href="/landing">
            <img src="https://www.underconsideration.com/brandnew/archives/absa_logo.png" />
          </a>
        </div>
        <ul>
            <li>
                <a href="/profile">
                    <img src='https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg'/>
                </a>
            </li>
          
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
