import { useState } from "react";
import {Card, Button, Confirm} from 'semantic-ui-react';
import AssignmentPatchForm from "../form_components/AssignmentPatchForm";
import "../component_CSS/form.css";
import LateDateOrNot from "./LateDateOrNot";

function Assignment({assignment, patchAssignment, deleteAssignment}){

    const {isComplete, comments, expected_end_date, start_date, name, id} = assignment;
    const [state, setState] = useState({open: false});

    const open = () => setState({open: true});
    const close = () => setState({open: false});

    const [btnClick, setBtnClick] = useState(false);

    function handleBtnClick(){
        setBtnClick(!btnClick);
    }

    function handleRemoveAgn(event){
        event.preventDefault();

        fetch(`/assignments/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application.json()"
            }
        })
        .then((r) => {
            if(r.ok){
                return r.json();
            }
                throw new Error("Something Went Wrong");
        })
        .then(response => deleteAssignment(response))
        .catch(error => console.log(error))
    }

    function handleIsComplete(event){
        event.preventDefault();

        const patchReq = {
            isComplete: !isComplete,
            detail: !isComplete ? "Assignment Not Complete" : "Assignment Completed" 
        }

        fetch(`/assignments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patchReq)
        })
        .then((r) => {
            if(r.ok){
                return r.json();
            }
            throw new Error("Something Went Wrong");
        })
        .then(assignment => patchAssignment(assignment))
        .catch(error => console.log(error))
    }


    return(
        <> 
            <Card className="indiv-card-container">
                <LateDateOrNot expected_end_date={expected_end_date} isComplete={isComplete}/>
                <Card.Content>
                    <Card.Header>Assignment Name: {name}</Card.Header>
                    <Card.Meta>Start Date: {start_date}</Card.Meta>
                    <Card.Meta>Expected End Date: {expected_end_date}</Card.Meta>
                    <Card.Description>{comments}</Card.Description>
                </Card.Content>
                <Card.Content>
                    <Button basic color={isComplete ? "green" : "blue"} onClick={handleIsComplete}>{isComplete ? "Un-Complete" : "Completed"}</Button>
                    <Button basic color='yellow' onClick={handleBtnClick}>Edit</Button>
                    <Button basic color='red' onClick={open}>Delete</Button>
                    <Confirm
                    open={state.open} 
                    onCancel={close}
                    onConfirm={handleRemoveAgn}
                    content={`Are you sure want to delete assignment: ${name}?`}
                    />
                </Card.Content>
            </Card>

            {
                btnClick ?
                <AssignmentPatchForm close={handleBtnClick}
                patchAssignment={patchAssignment} assignment={assignment} />
                :
                null
            }
        </>
    )
}

export default Assignment