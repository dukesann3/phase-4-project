import { Form, Button } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { EmployeeSelectionForAdd, ProjectSelectionForAdd } from "./DataSelection";
import '../component_CSS/form.css';


function AssignmentAddForm({form, handleSubmit, handleChange, close}){

    const [emps, setEmps] = useState([]);
    const [prjs, setPrjs] = useState([]);

    useEffect(() => {
        Promise.all([
            fetch('/employees'),
            fetch('/projects')
        ])
        .then(response => Promise.all(response.map((r) => {
            if(r.ok){
                return r.json();
            }
            throw new Error("Something went wrong");
        })))
        .then(([empResp, prjResp]) => {
            setEmps(empResp);
            setPrjs(prjResp);
        })
    },[]);

    const url = window.location.href;

    return (
        <Form onSubmit={handleSubmit}>
            <button className='btn-position' onClick={close}>X</button>
            <h2>Add Assignment</h2>
            <Form.Group widths='equal' className="align">
                {url.includes("project") ? 
                <EmployeeSelectionForAdd emps={emps} handleChange={handleChange}/>
                : 
                null}
                {url.includes("employee") ? 
                <ProjectSelectionForAdd prjs={prjs} handleChange={handleChange}/>
                : 
                null}

                <Form.Input fluid label="Assignment Name" placeholder='Assignment Name'
                        name="name" value={form.name} onChange={handleChange}/>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input fluid label="Start Date" name="start_date"
                        value={form.start_date} onChange={handleChange} type='date'/>

                <Form.Input fluid label="Expected End Date" name="expected_end_date"
                        value={form.expected_end_date} onChange={handleChange} type='date'/>

                <Form.TextArea fluid label="Comment" name="comments"
                        value={form.comments} onChange={handleChange}/>
            </Form.Group>
            <Button>Submit</Button>
        </Form>
    )
}

export default AssignmentAddForm;
