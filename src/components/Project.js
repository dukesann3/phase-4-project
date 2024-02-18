import { NavLink } from "react-router-dom"

function Project({props, handlePrjDelete}){

    const {sales_order, name, id} = props

    function handleDelete(){
        handlePrjDelete(id);
    }

    return(
        <>
            <NavLink to={`/projects/${id}`}>
                <div className="project-window">
                    <div className="container" style={{display: "inline"}}>{sales_order}</div>
                    <div className="container" style={{display: "inline"}}>{name}</div>
                </div>
            </NavLink>
            <button onClick={handleDelete}>Delete</button>
        </>
    )
}

export default Project
