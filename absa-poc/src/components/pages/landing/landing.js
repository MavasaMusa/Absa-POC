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
          <br></br>& Integrity
          </h1>
          <div className="container-btn">
            <a href='/home'><img src={logo1}/></a>
            <h2>tap to proceed</h2>
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
