import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import Assignment from "../assignment_components/Assignment";
import {Card, Segment} from 'semantic-ui-react';
import './employeeCSS/employeeAssignment.css';

function EmployeeID(){

    let {emp_id} = useParams();
    const [empDetail, setEmpDetail] = useState();
    const [filterBy, setFilterBy] = useState("All");

    useEffect(()=>{
        fetch(`/employees/${emp_id}`)
        .then(r => r.json())
        .then(data => setEmpDetail(data))
    }, []);

    function handlePatch(patchedAssignment){
        const id = patchedAssignment.id;
        const copyEmp = JSON.parse(JSON.stringify(empDetail));
        
        for(const property in copyEmp){
            if(property === "assignments"){
                for(let i = 0; i < copyEmp[property].length; i++){
                    const element = copyEmp[property][i]
                    if(element.id === id){ 
                        copyEmp[property][i] = patchedAssignment;
                    }
                }
            }
        }

        setEmpDetail(copyEmp);
    }

    function handleDelete(assignment_id){
        const copyEmp = JSON.parse(JSON.stringify(empDetail));
        
        for(const property in copyEmp){
            if(property === "assignments"){
                for(let i = 0; i < copyEmp[property].length; i++){
                    const element = copyEmp[property][i]
                    if(element.id === assignment_id){ 
                        copyEmp[property].splice(i,1);
                    }
                }
            }
        }

        setEmpDetail(copyEmp);
    }

    function handleAsgnFilter(event){
        setFilterBy(event.target.value);
    }

    const filterOptions = ["Completed Assignments", "Late Assignments", "All"];

    const filteredAssignments = empDetail ? empDetail.assignments.filter((asgn) => {
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

    return(
        <>
            {empDetail ?
            <div className="employee-detail-window">
                <div className="employee-desc-window">
                    <div className="employee-desc-container">
                        <h2>{empDetail.first_name} {empDetail.last_name}'s Assignments</h2>
                        <div className="employee-meta">
                            <span>Department: {empDetail.department}</span>
                            <span>Role: {empDetail.role}</span>
                        </div>
                    </div>
                    <div className="filter-emp-container">
                        <h4>Filter Assignments By:</h4>
                        <select className="filter-asgn"  
                        onChange={handleAsgnFilter}>
                            {filterOptions.map((filter, i) => {
                                if(filter === "All"){
                                    return <option selected value={filter} key={`${filter}+${i}`}>{filter}</option>
                                }
                                return <option value={filter} key={`${filter}+${i}`}>{filter}</option>
                            })}
                        </select>
                    </div>
                </div>
        
                <hr />
                <Card.Group className="assignment-group" itemsPerRow={3}>
                    {filteredAssignments.map((assign) => {
                        return <Assignment key={assign.id} props={assign} handleEmpPatch={handlePatch} handleEmpDelete={handleDelete}/>
                    })}
                </Card.Group>
            </div>
            :
            <>
                <h1>Loading...</h1>
            </>
            }
        </>
    )
}

export default EmployeeID