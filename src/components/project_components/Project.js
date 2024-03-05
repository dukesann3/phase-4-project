import { NavLink } from "react-router-dom"
import { Card, Button, Confirm } from "semantic-ui-react";
import { useState } from "react";
import ProjectPatchForm from "../form_components/ProjectPatchForm";

function Project({project, patchProject, deleteProject}){

    const {sales_order, name, id, start_date, expected_end_date, customer_name, comment, sale_price, isComplete} = project;

    const [formOpen, setFormOpen] = useState(false);
    const openPatchForm = () => setFormOpen(true);
    const closePatchForm = () => setFormOpen(false);

    const [state, setState] = useState({open: false});
    const open = () => setState({open: true});
    const close = () => setState({open: false});

    function handleDeleteProject(event){
        event.preventDefault();
        fetch(`/projects/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((r) => {
            if(r.ok) return r.json();
            throw new Error("Something Went Wrong");
        })
        .then(deleteProject(project))
        .catch(error => console.log(error))
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
                    <NavLink to={`/project/${id}`} className="prj-nav-link">See Details</NavLink>
                    <Button basic color='yellow' onClick={openPatchForm}>Edit</Button>
                    <Button basic color='red' onClick={open}>Delete</Button>
                    <Confirm
                        open={state.open} 
                        onCancel={close}
                        onConfirm={handleDeleteProject}
                        content={`Are you sure want to delete project ${name}? It will also delete all assignments tied to this project.`}
                    />
                </Card.Content>
            </Card>
            {
                formOpen ? 
                <ProjectPatchForm patchProject={patchProject} 
                        close={closePatchForm} project={project}/>
                :
                null
            }
        </>
    )
}

export default Project
 