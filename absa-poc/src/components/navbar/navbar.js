import "./navbar.css";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navdiv">
        <div className="logo">
          <a href="#">
            <img src="https://logos-download.com/wp-content/uploads/2018/09/ABSA_Group_Logo.png" />
          </a>
        </div>
        <ul>
            <li>
                <a>
                    <img src='https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg'/>
                </a>
            </li>
            <li>
                <a>
                    <img src='https://static.vecteezy.com/system/resources/previews/016/451/156/original/logout-icon-sign-vector.jpg' />
                </a>
            </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;