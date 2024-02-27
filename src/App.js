import Navbar from "./components/Navbar";
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
    </>
  );
}

export default App;
