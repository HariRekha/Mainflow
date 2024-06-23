import Navbar from './Navbar';
import Pricing from './pages/Pricing';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './Footer';
import Signinout from './pages/Authentication/Sign_inout';
function App() {
  let component
  switch (window.location.pathname) {
    case "/":
      component=<Home/>
      break
    case "/pricing":
      component=<Pricing/>
      break
    case "/about":
      component=<About/>
      break
    case "/signinout":
        component=<Signinout/>
        break
  }
  return (
    <div>
      <Navbar />
      <div className="container">
        {component}
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
