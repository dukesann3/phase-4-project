import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddAssignment(){

    const navigate = useNavigate();

    const [assignForm, setAssignForm] = useState({
        employee_id: "",
        project_id: "",
        name: "",
        comments: "",
        start_date: "",
        expected_end_date: ""
    })

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        
        setAssignForm({
            ...assignForm,
            [name]: value
        });
    }

    function formChecker(){
        const {employee_id, project_id, name, start_date, expected_end_date} = assignForm;
        if(employee_id && project_id && name && start_date && expected_end_date){
            return true
        }
        return false
    }

    function handleSubmit(event){
        event.preventDefault();
        if(!formChecker()){
            //give error message here
            return
        }

        fetch('/assignments', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(assignForm)
        })
        .then((r) => {
            if(r.ok){
                return r.json()
            }
            throw new Error("Something went wrong");
        })
        .then((response) => {
            console.log(response);
            navigate(`/employees/${assignForm.employee_id}`);
            let blankAssignForm = {};
            for(const property in assignForm){
                Object.assign(blankAssignForm, {[property]: ""});
            }
            setAssignForm(blankAssignForm);
        })
        .catch((error) => {
            //or do something if error occurs
            console.log(error);
        })
        
    }

    return(
        <>
            <h1>Add Assignment Here</h1>
            <form onSubmit={handleSubmit}>
                <input type="number" placeholder='employee id' name="employee_id" value={assignForm.employee_id} onChange={handleChange}></input>
                <input type="number" placeholder="project id" name="project_id" value={assignForm.project_id} onChange={handleChange}></input>
                <input type="text" placeholder="name" name="name" value={assignForm.name} onChange={handleChange}></input>
                <input type="text" placeholder="comments" name="comments" value={assignForm.comments} onChange={handleChange}></input>
                <input type="date" placeholder="start date" name="start_date" value={assignForm.start_date} onChange={handleChange}></input>
                <input type="date" placeholder="expected end date" name="expected_end_date" value={assignForm.expected_end_date} onChange={handleChange}></input>
                <button>SUBMIT</button>
            </form>
        </>
    )
}

export default AddAssignment;