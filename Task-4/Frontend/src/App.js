import Navbar from './Navbar';
import Home from './pages/Home';
import Footer from './Footer';
import Task from './pages/TaskManager/Task';
function App() {
  let component
  switch (window.location.pathname) {
    case "/":
      component=<Home/>
      break
    case "/task":
      component=<Task/>
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
