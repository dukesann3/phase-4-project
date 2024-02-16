import React from "react";
import { NavLink } from "react-router-dom";

function Employee({props}){
    const {first, last, department, role, id} = props

    //delete style inline out and use actual styling from CSS file please
    //this is only for testing purposes only

    return(
        <NavLink to={`/employees/${id}`}>
            <div className="employee-window"> 
                <div className="container" style={{display: "inline"}}>{first}</div>
                <div className="container" style={{display: "inline"}}>{last}</div>
                <div className="container" style={{display: "inline"}}>{department}</div>
                <div className="container" style={{display: "inline"}}>{role}</div>
            </div>
        </NavLink>
    )
}

export default Employee