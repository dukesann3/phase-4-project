import { NavLink } from "react-router-dom"

function Navbar(){
    return(
        <>
            <div>Navbar for developing purposes. Change later</div>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to='/employees'>Employees</NavLink>
                <NavLink to='/projects'>Projects</NavLink>
            </nav>
        </>
    )
}

export default Navbar