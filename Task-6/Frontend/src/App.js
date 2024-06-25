import Navbar from './Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery/Display.js';
function App() {
  let component
  switch (window.location.pathname) {
    case "/":
      component=<Home/>
      break
    case "/gal":
      component=<Gallery/>
      break
  }
  return (
    <div>
      <Navbar />
      <div className="container">
        {component}
      </div>
    </div>
  );
}

export default App;
