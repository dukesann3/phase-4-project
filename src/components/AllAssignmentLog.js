import { useEffect, useState } from "react";
import AssignmentLog from "./AssignmentLog";

function AllAssignmentLog(){

    const [asgnLog, setAsgnLog] = useState([]);

    useEffect(() => {
        fetch('/assignment_log')
        .then(r => r.json())
        .then((response) => {
            setAsgnLog(response);
        })
    }, []);

    return(
        <>
            {asgnLog.map((log) => {
                return <AssignmentLog key={log.id+log.updated_at} props={log}/>
            })}
        </>
    )
}

export default AllAssignmentLog;