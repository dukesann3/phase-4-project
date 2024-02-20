import { NavLink } from "react-router-dom"

function Navbar(){
    return(
        <>
            <div>Navbar for developing purposes. Change later</div>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to='/employees'>Employees</NavLink>
                <NavLink to='/projects'>Projects</NavLink>
                <NavLink to='/add_assignments'>Add Assignments</NavLink>
                <NavLink to='/assignment_logs'>Assignment Logs</NavLink>
                <NavLink to='/project_logs'>Project Logs</NavLink>
                <NavLink to='/test'>Test</NavLink>
            </nav>
        </>
    )
}

export default Navbar