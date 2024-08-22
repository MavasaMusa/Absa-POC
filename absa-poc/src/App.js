import './App.css';
import Navbar from './components/navbar/navbar';
import Home from './components/pages/landing/home';
import Landing from './components/pages/landing/landing';
import Update from './components/pages/update/update';

function App() {
  let component;
  switch (window.location.pathname.toLowerCase()){
    case "/":
      component = <Update />;
      break;

    case "/landing":
      component = <Home />
      break;

    default:
      component = <Update />
  }
  return (
    <div className="App">
      {component}
    </div>
  );
}

export default App;
