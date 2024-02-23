import { useState } from "react";
import {Card, Button, Confirm} from 'semantic-ui-react';
import AssignmentPatchForm from "../form_components/AssignmentPatchForm";
import "./assignmentCSS/assignmentPatchFormCSS.css";
import LateDateOrNot from "./LateDateOrNot";

function Assignment({props, handleEmpPatch, handleEmpDelete, handlePrjPatch, handlePrjDelete}){

    const {comments, expected_end_date, start_date, name, employee_id, project_id, id} = props;
    const [state, setState] = useState({open: false});

    const open = () => setState({open: true});
    const close = () => setState({open: false});

    //need to find out if I am allowed to change foreign keys since it is a key.
    const [asgnUpdateForm, setAsgnUpdateForm] = useState({
        employee_id: employee_id,
        project_id: project_id,
        name: name,
        start_date: start_date,
        expected_end_date: expected_end_date,
        comments: comments
    });
    const [asgnChangeDetail, setAsgnChangeDetail] = useState({
        assignment_id: id,
        detail: ""
    });
    const [btnClick, setBtnClick] = useState(false);

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;

        setAsgnUpdateForm({
            ...asgnUpdateForm,
            [name]: value
        })
    }

    function handleBtnClick(){
        setBtnClick(!btnClick);
    }

    function formChecker(){
        for(const property in asgnUpdateForm){
            if(property == "comments"){
                continue
            }
            else if(!asgnUpdateForm[property]){
                return false;
            }
        }
        return true;
    }

    function handleAsgnDetailChange(event){
        const name = event.target.name;
        const value = event.target.value;

        setAsgnChangeDetail({
            ...asgnChangeDetail,
            [name]: value
        })
    }

    function handleSubmit(event){
        event.preventDefault();

        if(!formChecker() && asgnChangeDetail.detail === ""){
            //give error message here please
            console.log("EXQUEEZE MEW?");
            return
        }

        Promise.all([
            fetch(`/assignments/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(asgnUpdateForm)
            }),
            fetch(`/assignment_log`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(asgnChangeDetail)
            })
        ])
        .then(r => 
            Promise.all(r.map(resp => resp.json()))
        )
        .then((response) => {
            const url = window.location.pathname;
            console.log(response);
            if(url.includes("projects")){
                handlePrjPatch(response[0]);

                setAsgnChangeDetail({
                    assignment_id: id,
                    detail: ""
                });
            }
            else if(url.includes("employees")){
                handleEmpPatch(response[0]);

                setAsgnChangeDetail({
                    assignment_id: id,
                    detail: ""
                });
            }
        })
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
            else{
                throw new Error("Something weird happened");
            }
        })
        .then((response) => {
            console.log(window.location)
            const url = window.location.pathname;
            if(url.includes("projects")){
                handlePrjDelete(id);         
            }
            else if(url.includes("employees")){
                handleEmpDelete(id);
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return(
        <> 
            <Card className="indiv-card-container">
                <LateDateOrNot expected_end_date={expected_end_date}/>
                <Card.Content>
                    <Card.Header>Assignment Name: {name}</Card.Header>
                    <Card.Meta>Start Date: {start_date}</Card.Meta>
                    <Card.Meta>Expected End Date: {expected_end_date}</Card.Meta>
                    <Card.Description>{comments}</Card.Description>
                </Card.Content>
                <Card.Content>
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
                <AssignmentPatchForm 
                handleBtnClick={handleBtnClick} 
                handleSubmit={handleSubmit} 
                asgnUpdateForm={asgnUpdateForm}
                asgnChangeDetail={asgnChangeDetail}
                handleAsgnDetailChange={handleAsgnDetailChange}
                handleAsgnFormChange={handleChange}
                />
                :
                null
            }
        </>
    )
}

export default Assignment