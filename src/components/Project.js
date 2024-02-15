import { NavLink } from "react-router-dom"

function Project(props){

    const {sales_order, name, id} = props

    //please create new CSS specifically for display please

    return(
        <NavLink to={`/projects/${id}`}>
            <div className="project-window">
                <div className="container" style={{display: "inline"}}>{sales_order}</div>
                <div className="container" style={{display: "inline"}}>{name}</div>
            </div>
        </NavLink>
    )
}

export default Project
