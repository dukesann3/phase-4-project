import { NavLink } from "react-router-dom"
import { Card, Button, Confirm } from "semantic-ui-react";
import { useState } from "react";
import ProjectPatchForm from "../form_components/ProjectPatchForm";

function Project({project, handlePrjDelete, handleProjectPatch}){

    const {sales_order, name, id, start_date, expected_end_date, customer_name, comment, sale_price, isComplete} = project;

    const [form, setForm] = useState({
        sales_order: sales_order,
        name: name,
        start_date: start_date,
        expected_end_date: expected_end_date,
        customer_name: customer_name,
        sale_price: sale_price,
        comment: comment,
        isComplete: isComplete
    });

    const [log, setLog] = useState({
        project_id: id,
        detail: ""
    });

    const [formOpen, setFormOpen] = useState(false);
    const openPatchForm = () => setFormOpen(true);
    const closePatchForm = () => setFormOpen(false);

    const [state, setState] = useState({open: false});
    const open = () => setState({open: true});
    const close = () => setState({open: false});

    function handleDelete(){
        handlePrjDelete(id);
    }

    function patchFormChecker(){
        const {project_id, detail} = log;
        const {start_date, expected_end_date, sales_order, name, sale_price} = form;

        const combinedArray = [];
        combinedArray.push([project_id, detail, start_date, expected_end_date, sales_order, name, sale_price]);
        
        for(const attr of combinedArray){
            if(!attr){
                return false;
            }
        }
        return true;
    }

    function patchPrjForm(){

        patchFormChecker();

        Promise.all([
            fetch(`/projects/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }),
            fetch('/project_log', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(log)
            })
        ])
        .then(response => Promise.all(response.map((resp) => {
            if(resp.ok){
                return resp.json()
            }
            throw new Error("Something went wrong");
        })))
        .then(([prj, log]) => {
            handleProjectPatch(prj);
            console.log(log);
            closePatchForm();
        })
        .catch((error) => {
            console.log(error);
            closePatchForm();
        })
    }

    function handleChangeLog(event){
        const name = event.target.name;
        const value = event.target.value;

        setLog({
            ...log,
            [name]: value
        });
    }

    function handleChangePrj(event){
        const name = event.target.name;
        const value = event.target.value;

        setForm({
            ...form,
            [name]: value
        });
    }

    return(
        <>
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
                    <Button basic color='yellow' onClick={openPatchForm}>Edit</Button>
                    <Button basic color='red' onClick={open}>Delete</Button>
                    <Confirm
                        open={state.open} 
                        onCancel={close}
                        onConfirm={handleDelete}
                        content={`Are you sure want to delete project ${name}? It will also delete all assignments tied to this project.`}
                    />
                </Card.Content>
            </Card>
            {
                formOpen ? 
                <ProjectPatchForm 
                handlePatch={patchPrjForm} 
                close={closePatchForm} 
                handleChangeLog={handleChangeLog}
                handleChangePrj={handleChangePrj}
                form={form}
                logForm={log}
                />
                :
                null
            }
        </>
    )
}

export default Project
 