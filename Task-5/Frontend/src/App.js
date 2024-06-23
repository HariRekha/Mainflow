import Navbar from './Navbar';
import Home from './pages/Home';
import Footer from './Footer';
import Calci from './pages/Calsi/Calsi';
function App() {
  let component
  switch (window.location.pathname) {
    case "/":
      component=<Home/>
      break
    case "/cal":
      component=<Calci/>
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
