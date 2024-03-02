import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import "./components/component_CSS/outlet.css";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="outlet">
        <Outlet className="default-position"/>
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </>
  );
}

export default App;
