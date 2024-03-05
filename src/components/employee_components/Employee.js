import React from "react";
import { NavLink } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import {Card} from 'semantic-ui-react';

function Employee({props}){
    const {first_name, last_name, department, role, id} = props

    return(
        <Card.Content>
                <Card.Header>{first_name} {last_name}</Card.Header>
                <Card.Description>Department: {department}</Card.Description>
                <Card.Description>Role: {role}</Card.Description>
            <NavLink to={`/employee/${id}`}>See Details</NavLink>
        </Card.Content>
    )
}

export default Employee