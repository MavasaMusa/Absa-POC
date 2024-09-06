import Navbar from "../../navbar/navbar";
import './landing.css';
import logo1 from './tap.png';
import Home from "./home";
function LandingPage() {


  return (
    <><Navbar />
    <div className="">
      
      <div className="container">
        <div className="container-left">
          <h1>Empowering Your Financial <br></br>Future with Innovation 
          <br></br>& Integrity</h1>
          <h2 className="tap">tap to proceed</h2>
          <div className="container-btn">
<<<<<<< HEAD
          
            <a href='/home'><img src={logo1}/></a>
            
=======
            <a href='/home'><img src={logo1}/></a>
            <h2>tap to proceed</h2>
>>>>>>> f00a11ad1a1bc45f60608fa73da661af31b7cb89
          </div>
        </div>
        <div className="container-right">
          <div className="images">
            <img src="https://techpointmag.com/wp-content/uploads/2019/11/ABSA-bank-ATM.jpg" className="bank1"/>
            <img src="https://www.clindz-careers.co.za/wp-content/uploads/2024/05/ABSA-Bank-Tellers-scaled.jpg" className="bank2"/>
          </div>
          <div className="content">
            <h4>Dedicated to Delivering Exceptional Banking Services</h4>
            <h2>Transforming Banking with Purpose and Precision</h2>
            <h3>Your Trusted Partner in Financial Success</h3>
            <p>At ABSA, we deliver personalized financial solutions designed to 
                help you achieve your goals. With innovation and customer 
                satisfaction at our core, we’re here to support your success.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default LandingPage;
