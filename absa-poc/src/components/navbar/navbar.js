import "./navbar.css";
import { useEffect, useState } from "react";

function Navbar() {
  // Manage authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in by looking at localStorage
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    if (userLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Remove login status
    setIsLoggedIn(false); // Update state
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navdiv">
        <div className="logo">
          <a href="/landing">
            <img src="https://www.underconsideration.com/brandnew/archives/absa_logo.png" alt="Logo" />
          </a>
        </div>
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <a href="/profile">
                  <img src='https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg' alt="Profile" /> 
                </a>
              </li>
              <li className="logout-container">
                <button onClick={handleLogout} className="logout-button">
                  <img src='https://th.bing.com/th/id/OIP.g4_sGeqxq8pG0mPEg4YaRgAAAA?rs=1&pid=ImgDetMain' alt="Logout" />
                </button>
              </li>
            </>
          ) : (
            <li>
              <a href="/login">   <img src='https://th.bing.com/th/id/OIP.g4_sGeqxq8pG0mPEg4YaRgAAAA?rs=1&pid=ImgDetMain' alt="Logout" />
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
