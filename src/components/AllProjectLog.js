import { useEffect, useState } from "react";
import ProjectLog from "./ProjectLog";

function AllProjectLog(){

    const [prjLog, setPrjLog] = useState([]);

    useEffect(() => {
        fetch('/project_log')
        .then(r => r.json())
        .then(response => setPrjLog(response));
    }, [])

    return(
        <>
            {prjLog.map((log) => {
                return <ProjectLog key={log.id+log.updated_at} props={log}/>
            })}
        </>
    )
}

export default AllProjectLog; 