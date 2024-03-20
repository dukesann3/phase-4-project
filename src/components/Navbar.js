import { NavLink } from "react-router-dom";
import "./component_CSS/navbar.css"

function Navbar(){
    return(
        <div className="navbar-container">
            <div className='logo-container'>
                <h1>COMPANY</h1>
            </div>
            <nav className="navbar-link-window">
                <NavLink to="/" className="navbar-link">Home</NavLink>
                <NavLink to='/employee' className="navbar-link">Employees</NavLink>
                <NavLink to='/project' className="navbar-link">Projects</NavLink>
                {/* <NavLink to='/test'>Test</NavLink> */}
            </nav>
        </div>
    )
}

export default Navbar