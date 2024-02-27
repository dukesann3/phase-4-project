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
      <body className="outlet">
        <Outlet className="default-position"/>
      </body>
      <div className='footer'>
        <Footer />
      </div>
    </>
  );
}

export default App;
