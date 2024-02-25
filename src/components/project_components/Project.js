import { NavLink } from "react-router-dom"
import { Card, Button, Confirm } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Project({props, handlePrjDelete}){

    const {sales_order, name, id, start_date, expected_end_date, customer_name} = props;
    const navigate = useNavigate();

    const [state, setState] = useState({open: false});
    const open = () => setState({open: true});
    const close = () => setState({open: false});

    function handleDelete(){
        handlePrjDelete(id);
    }

    return(
        <Card>
            <Card.Content>
                <Card.Header>Project Name: {name}</Card.Header>
                <Card.Header>Sales Order: {sales_order}</Card.Header>
                <Card.Description>Customer Name: {customer_name}</Card.Description>
                <Card.Meta>Start Date: {start_date}</Card.Meta>
                <Card.Meta>Expected End Date: {expected_end_date}</Card.Meta>
            </Card.Content>
            <Card.Content>
                <NavLink to={`/projects/${id}`} className="prj-nav-link">See Details</NavLink>
                <Button basic color='yellow'>Edit</Button>
                <Button basic color='red' onClick={open}>Delete</Button>
                <Confirm
                    open={state.open} 
                    onCancel={close}
                    onConfirm={handleDelete}
                    content={`Are you sure want to delete project ${name}? It will also delete all assignments tied to this project.`}
                />
            </Card.Content>
        </Card>
    )
}

export default Project
 