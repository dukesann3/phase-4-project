import { useEffect, useState } from "react"

function Assignment({props, handlePatch, handleDelete}){

    const {comments, expected_end_date, start_date, name, employee_id, project_id, id} = props;

    //need to find out if I am allowed to change foreign keys since it is a key.
    const [asgnUpdateForm, setAsgnUpdateForm] = useState({
        employee_id: employee_id,
        project_id: project_id,
        name: name,
        start_date: start_date,
        expected_end_date: expected_end_date,
        comments: comments
    });

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;

        console.log(name, value);

        setAsgnUpdateForm({
            ...asgnUpdateForm,
            [name]: value
        })
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

    function handleSubmit(event){
        event.preventDefault();

        if(!formChecker()){
            //give error message here please
            return
        }

        fetch(`/assignments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(asgnUpdateForm)
        })
        .then((r) => {
            if(r.ok){
                return r.json()
            }
            else{
                //please elaborate on your errors please
                throw new Error("Something went wrong")
            }
        })
        .then((assignment) => {
            console.log(assignment);
            handlePatch(assignment);
        })
        .catch((error) => {
            //do something when an error occurs please
            console.log(error)
        })
    }

    function handleRemoveAgn(event){
        event.preventDefault()

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
            handleDelete(id)
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return(
        <> 
            <div className="assignment-window">
                <div className="container">{name}</div>
                <div className="container">{start_date}</div>
                <div className="container">{expected_end_date}</div>
                <div className="container">{comments}</div>
            </div>
            <br />
            <form onSubmit={handleSubmit}>
                <input type="number" placeholder='employee id' name="employee_id" value={asgnUpdateForm.employee_id} onChange={handleChange}></input>
                <input type="number" placeholder="project id" name="project_id" value={asgnUpdateForm.project_id} onChange={handleChange}></input>
                <input type="text" placeholder="name" name="name" value={asgnUpdateForm.name} onChange={handleChange}></input>
                <input type="text" placeholder="comments" name="comments" value={asgnUpdateForm.comments} onChange={handleChange}></input>
                <input type="date" placeholder="start date" name="start_date" value={asgnUpdateForm.start_date} onChange={handleChange}></input>
                <input type="date" placeholder="expected end date" name="expected_end_date" value={asgnUpdateForm.expected_end_date} onChange={handleChange}></input>
                <button>SUBMIT</button>
            </form>
            <button onClick={handleRemoveAgn}>Delete Assignment</button>
        </>
    )
}

export default Assignment