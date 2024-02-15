import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <h1>Add Routes to App. Cannot right now because no internet</h1>
      <Outlet />
    </>
  );
}

export default App;
