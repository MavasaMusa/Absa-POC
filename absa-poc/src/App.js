import './App.css';
import Navbar from './components/navbar/navbar';
import Home from './components/pages/landing/home';
import LandingPage from './components/pages/landing/landing';
import Landing from './components/pages/landing/landing';
import Main from './components/pages/main/main';
import Profile from './components/pages/profile/profile';
import CreateUser from './components/pages/userAccount/user';
import Balances from './components/pages/statements/balances';
import OtpVerification from './components/pages/OTP page/otp';
import BankStatement from './components/pages/statements/statements';
import UpdateContact from './components/pages/statements/update';

function App() {
  let component=null;
  switch (window.location.pathname.toLowerCase()) {
    case "/":
      component = <LandingPage />;
      break;

    case "/home":
      component = <Home />;
      break;

    case "/statements":
      component = <BankStatement />;
      break;
  
    case "/update":
      component = <UpdateContact />;
      break;

    case "/main":
      component = <Main />;
       break;

    case "/profile":
      component = <Profile />;
      break;

    case "/user":
       component = <CreateUser />;
       break;

    case "/otp":
        component = <OtpVerification />;
        break;
   
    case "/balances":
        component = <Balances />;
    break;

    default:
      component = <LandingPage />;
  }
  return (
    <div className="App">
      {component}
    </div>
  );
}

export default App;
