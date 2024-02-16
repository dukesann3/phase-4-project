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
    }, [])

    return(
        <>
            {empDetail ?
            <div className="employee-detail-window">
                <div>{empDetail.first_name} {empDetail.last_name}</div>
                <div>{empDetail.department}</div>
                <div>{empDetail.role}</div>
                <br/>
                {empDetail.assignments.map((assign) => {
                    return <Assignment key={assign.id} props={assign}/>
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