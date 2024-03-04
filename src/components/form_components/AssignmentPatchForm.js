import {Form, Button} from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import '../component_CSS/form.css';

function AssignmentPatchForm({handleBtnClick, handleSubmit, asgnUpdateForm, asgnChangeDetail, handleAsgnDetailChange, handleAsgnFormChange}){

    const [emps, setEmps] = useState([]);
    const [prjs, setPrjs] = useState([]);

    useEffect(() => {
        Promise.all([
            fetch('/employees'),
            fetch('/projects')
        ])
        .then(resp => Promise.all(resp.map((r) => {
            if(r.ok){
                return r.json();
            }
            throw new Error("Something went wrong.");
        })))
        .then(([emp, prj]) => {
            setEmps(emp);
            setPrjs(prj);
        })
        .catch((error) => {
            console.log(error);
        })
    },[]);

    return(
        <Form className="form" onSubmit={handleSubmit}>
            <button className="btn-position" onClick={handleBtnClick}>X</button>
            <h2>Edit Assignment</h2>
            <Form.Group widths='equal'>
                <div className="select-container">
                    <h3>Employee Selection</h3>
                    <select className="asgn-select" 
                    name="employee_id" 
                    onChange={handleAsgnFormChange}>
                        {emps.map((emp) => {
                            if(emp.id === asgnUpdateForm.employee_id){
                                return <option selected value={emp.id} key={emp.id+emp.first_name}>{emp.first_name + " " + emp.last_name}</option>
                            }
                            return <option value={emp.id} key={emp.id+emp.first_name}>{emp.first_name + " " + emp.last_name}</option>
                        })}
                    </select>
                </div>

                <div className="select-container">
                    <h3>Project Selection</h3>
                    <select className="asgn-patch-form-select" 
                    name="project_id" 
                    onChange={handleAsgnFormChange}>
                        {prjs.map((prj) => {
                            if(prj.id === asgnUpdateForm.project_id){
                                return <option selected value={prj.id} key={prj.id+prj.name}>{prj.name}</option>
                            }
                            return <option value={prj.id} key={prj.id+prj.name}>{prj.name}</option>
                        })}
                    </select>
                </div>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input fluid label="Assignment Name" placeholder="Assignment Name" name="name"
                        value={asgnUpdateForm.name} onChange={handleAsgnFormChange}/>

                <Form.TextArea label="Comments" placeholder="Comments" name="comments"
                        value={asgnUpdateForm.comments} onChange={handleAsgnFormChange}/>

                <Form.TextArea label="Change Detail" placeholder="Change Detail" name="detail"
                        value={asgnChangeDetail.detail} onChange={handleAsgnDetailChange}/>
            </Form.Group>
            <Form.Group widths='equal'>
                <input type="date" placeholder="Start Date" name="start_date" 
                        value={asgnUpdateForm.start_date} onChange={handleAsgnFormChange}/>

                <input type="date" placeholder="Expected End Date" name="expected_end_date"
                        value={asgnUpdateForm.expected_end_date} onChange={handleAsgnFormChange}/>
            </Form.Group>
            <Button>SUBMIT</Button>
        </Form>
    )
}

export default AssignmentPatchForm;

