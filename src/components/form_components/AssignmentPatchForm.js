import {Form, Button} from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import '../assignment_components/assignmentCSS/assignmentPatchFormCSS.css';

function AssignmentPatchForm({handleBtnClick, handleSubmit, asgnUpdateForm, asgnChangeDetail, handleAsgnDetailChange, handleAsgnFormChange}){

    const [allEmp, setAllEmp] = useState([]);
    const [allPrj, setAllPrj] = useState([]);

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
            setAllEmp(emp);
            setAllPrj(prj);
        })
        .catch((error) => {
            console.log(error);
        })
    },[]);

    const empOptions = () => {
        if(!allEmp){
            return <option>None</option>
        }

        let empOptionsArray = [];
        for(const emp of allEmp){
            const empObj = {
                key: emp.id,
                text: emp.first_name + " " + emp.last_name,
                value: emp.id
            }
            empOptionsArray.push(empObj);
        }
        return empOptionsArray;
    }

    const prjOptions = () => {
        if(!allPrj){ 
            return <option>None</option>
        }

        let prjOptionsArray = [];
        for(const prj of allPrj){
            const prjObj = {
                key: prj.id,
                text: prj.name,
                value: prj.id
            }
            prjOptionsArray.push(prjObj);
        }
        return prjOptionsArray;
    }


    return(
        <Form className="assignment-patch-form" onSubmit={handleSubmit}>
            <button className="btn-position" onClick={handleBtnClick}>X</button>
            <h2>Edit Assignment</h2>
            <Form.Group>
                <div className="select-container">
                    <h3>Employee Selection</h3>
                    <select className="asgn-patch-form-select" 
                    name="employee_id" 
                    onChange={handleAsgnFormChange}>
                        {empOptions().map((emp) => {
                            if(emp.key === asgnUpdateForm.employee_id){
                                return <option selected value={emp.value} key={emp.text+emp.value}>{emp.text}</option>
                            }
                            return <option value={emp.value} key={emp.text+emp.value}>{emp.text}</option>
                        })}
                    </select>
                </div>

                <div className="select-container">
                    <h3>Project Selection</h3>
                    <select className="asgn-patch-form-select" 
                    name="project_id" 
                    onChange={handleAsgnFormChange}>
                        {prjOptions().map((prj) => {
                            if(prj.key === asgnUpdateForm.project_id){
                                return <option selected value={prj.value} key={prj.text}>{prj.text}</option>
                            }
                            return <option value={prj.value} key={prj.value}>{prj.text}</option>
                        })}
                    </select>
                </div>
            </Form.Group>
            <Form.Group>
                <Form.Input 
                fluid label="Assignment Name" 
                placeholder="Assignment Name"
                name="name"
                value={asgnUpdateForm.name}
                onChange={handleAsgnFormChange}
                />

                <Form.Input 
                fluid label="Comments" 
                placeholder="Comments" 
                name="comments"
                value={asgnUpdateForm.comments}
                onChange={handleAsgnFormChange}
                />

                <Form.Input 
                fluid label="Change Detail" 
                placeholder="Change Detail" 
                name="detail"
                value={asgnChangeDetail.detail}
                onChange={handleAsgnDetailChange}
                />
            </Form.Group>
            <Form.Group>
                <input 
                type="date" 
                placeholder="Start Date" 
                name="start_date" 
                value={asgnUpdateForm.start_date}
                onChange={handleAsgnFormChange}
                />

                <input 
                type="date" 
                placeholder="Expected End Date" 
                name="expected_end_date"
                value={asgnUpdateForm.expected_end_date}
                onChange={handleAsgnFormChange}
                />
            </Form.Group>
            <Button>SUBMIT</Button>
        </Form>
    )
}

export default AssignmentPatchForm;

