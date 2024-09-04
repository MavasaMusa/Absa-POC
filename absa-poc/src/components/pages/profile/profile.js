import Navbar from '../../navbar/navbar';
import './profile.css';
import swal from 'sweetalert';

function Profile({ navigateTo }) {

  function validateForm(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Dummy validation for demonstration (Replace this with your actual validation logic)
    if (email !== "admin@gmail.com" || password !== "admin123") {
      swal("Error", "Invalid credentials. Please try again.", "error");
    } else {
      navigateTo('CreateUser');
    }
  }

  return (
    <>
    <Navbar/>
    <div className="containe">
    
   
      <form id="registrationForm" onSubmit={validateForm}>
        <h2>Admin Login</h2>
    
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Enter your email" 
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Enter your password" 
            required
          />
        </div>
    
        <div>
          <input type="submit" className="button" value="Submit" />
        </div>
      </form>
    </div>
    </>
  );
}

export default Profile;
