import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import Assignment from "../assignment_components/Assignment";
import { Card, Button } from "semantic-ui-react";
import '../project_components/project_CSS/all_projects.css';
import "../component_CSS/details.css";
import AssignmentAddForm from "../form_components/AssignmentAddForm";
import Details from "../Details";

function ProjectDetail(){

    const { prj_id } = useParams();
    const [prjDetail, setPrjDetail] = useState()
    const [filterBy, setFilterBy] = useState("All");

    const [openAddForm, setOpenAddForm] = useState(false);
    const open = () => setOpenAddForm(true);
    const close = () => setOpenAddForm(false);  

    function handleAddAsgn(newAssignment){
        let copyPrj = JSON.parse(JSON.stringify(prjDetail));

        for(const property in copyPrj){
            if(property === "assignments"){
                copyPrj[property].push(newAssignment);
            }
        }
        
        setPrjDetail(copyPrj);
    }

    useEffect(()=>{
        fetch(`/projects/${prj_id}`)
        .then(r => r.json())
        .then((response) => {
            setPrjDetail(response);
        })
    }, []);

    function handlePatch(patchedAssignment){
        const id = patchedAssignment.id;
        const copyPrj = JSON.parse(JSON.stringify(prjDetail));
        
        for(const property in copyPrj){
            if(property == "assignments"){
                for(let i = 0; i < copyPrj[property].length; i++){
                    const element = copyPrj[property][i]
                    if(element.id == id){ 
                        copyPrj[property][i] = patchedAssignment;
                    }
                }
            }
        }

        setPrjDetail(copyPrj);
    }

    function handleDelete(assignment_id){
        const copyPrj = JSON.parse(JSON.stringify(prjDetail));
        
        for(const property in copyPrj){
            if(property == "assignments"){
                for(let i = 0; i < copyPrj[property].length; i++){
                    const element = copyPrj[property][i]
                    if(element.id == assignment_id){ 
                        copyPrj[property].splice(i,1);
                    }
                }
            }
        }

        setPrjDetail(copyPrj);
    }

    function handleAsgnFilter(event){
        setFilterBy(event.target.value);
    }

    const filterOptions = ["Completed Assignments", "Late Assignments", "All"];

    const filteredAssignments = prjDetail ? prjDetail.assignments.filter((asgn) => {
        if(filterBy === "All"){
            return true;
        }
        else if(filterBy=== "Completed Assignments"){
            if(asgn.isComplete){
                return true;
            }
        }
        else if(filterBy === "Late Assignments"){
            const now = new Date();
            const nowTimeStamp = now.getTime();
            const asgnEnd = new Date(asgn.expected_end_date);
            const AsgnEndTimeStamp = asgnEnd.getTime();
        
            const diffMicroSeconds = AsgnEndTimeStamp - nowTimeStamp;
            const diffDays = Math.round(diffMicroSeconds / (1000*60*60*24));
            if(diffDays <= 0){
                return true;
            }
        }
        return false;
    }) : null;

    const [asgnAddForm, setAsgnAddForm] = useState({
        employee_id: "",
        project_id: prj_id,
        name: "",
        start_date: "",
        expected_end_date: "",
        comments: "",
        isComplete: false
    });

    function handleAddChange(event){
        const name = event.target.name;
        const value = event.target.value;

        setAsgnAddForm({
            ...asgnAddForm,
            [name]: value
        });
    }
    
    function addAsgnFormChecker(){
        const {employee_id, project_id, name, start_date, expected_end_date} = asgnAddForm;
        if(employee_id && project_id && name && start_date && expected_end_date){
            return true;
        }
        return false;
    }

    function handleAsgnAddSubmit(){

        if(!addAsgnFormChecker()){
            return false;
        }

        fetch(`/assignments`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(asgnAddForm)
        })
        .then((r) => {
            if(r.ok){
                return r.json();
            }
            throw new Error("Something went wrong");
        })
        .then((newAsgn) => {
            handleAddAsgn(newAsgn);
            setAsgnAddForm({
                employee_id: "",
                project_id: prj_id,
                name: "",
                start_date: "",
                expected_end_date: "",
                comments: "",
                isComplete: false
            });
            close();
        })
        .catch((error) => {
            console.log(error);
            close();
        })
    }

    return(
        <div className="project-detail-window">
            {prjDetail ? 
                <div className="detail-window">

                    <Details open={open} details={prjDetail}
                        handleAsgnFilter={handleAsgnFilter} filterOptions={filterOptions}/>

                    <hr />

                    <Card.Group itemsPerRow={3} className='group'>
                        {filteredAssignments.map((assign) => {
                            return <Assignment 
                            key={assign.id} 
                            props={assign} 
                            handlePrjPatch={handlePatch} 
                            handlePrjDelete={handleDelete} 
                            />
                        })}
                    </Card.Group>
                    {
                        openAddForm ?
                        <AssignmentAddForm 
                        form={asgnAddForm}
                        handleSubmit={handleAsgnAddSubmit}
                        handleChange={handleAddChange}
                        close={close}
                        />
                        : null
                    }
                </div>
                : 
                <h1>Loading...</h1>
            }
        </div>
    )
}

export default ProjectDetail