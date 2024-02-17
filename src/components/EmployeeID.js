import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import Assignment from "./Assignment";

function EmployeeID(){

    let {emp_id} = useParams();
    const [empDetail, setEmpDetail] = useState();

    useEffect(()=>{
        fetch(`/employees/${emp_id}`)
        .then(r => r.json())
        .then(data => setEmpDetail(data))
    }, []);

    function handlePatch(patchedAssignment){
        const id = patchedAssignment.id;
        const copyEmp = JSON.parse(JSON.stringify(empDetail));
        
        for(const property in copyEmp){
            if(property == "assignments"){
                for(let i = 0; i < copyEmp[property].length; i++){
                    const element = copyEmp[property][i]
                    if(element.id == id){ 
                        copyEmp[property][i] = patchedAssignment;
                    }
                }
            }
        }

        setEmpDetail(copyEmp);
    }

    return(
        <>
            {empDetail ?
            <div className="employee-detail-window">
                <div>{empDetail.first_name} {empDetail.last_name}</div>
                <div>{empDetail.department}</div>
                <div>{empDetail.role}</div>
                <br/>
                {empDetail.assignments.map((assign) => {
                    return <Assignment key={assign.id} props={assign} handlePatch={handlePatch}/>
                })}
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