import './App.css';
import Navbar from './components/navbar/navbar';
import Home from './components/pages/landing/home';
import Landing from './components/pages/landing/landing';

function App() {
  let component;
  switch (window.location.pathname.toLowerCase()){
    case "/":
      component = <Landing />;
      break;

    case "/landing":
      component = <Home />
      break;

    default:
      component = <Landing />
  }
  return (
    <div className="App">
      {component}
    </div>
  );
}

export default App;
