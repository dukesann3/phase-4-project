import { NavLink } from "react-router-dom";
import "./component_CSS/navbar.css"

function Navbar(){
    return(
        <div className="navbar-container">
            <div className='logo-container'>
                <h1>COMPANY</h1>
            </div>
            <div className="navbar-link-window">
                <NavLink to="/">Home</NavLink>
                <NavLink to='/employees'>Employees</NavLink>
                <NavLink to='/projects'>Projects</NavLink>
                <NavLink to='/test'>Test</NavLink>
            </div>
        </div>
    )
}

export default Navbar