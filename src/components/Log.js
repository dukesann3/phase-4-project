import { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";

function Log(){

    const [asgnLog, setAsgnLog] = useState([]);
    const [prjLog, setPrjLog] = useState([]);

    useEffect(() => {
        Promise.all([
            fetch('/assignment_log'),
            fetch('/project_log')
        ])
        .then(r => Promise.all(r.map((resp) => {
            if(resp.ok){
                return resp.json();
            }
            throw new Error("Something went wrong");
        })))
        .then(([asgn, prj]) => {
            setAsgnLog(asgn);
            setPrjLog(prj);
        })
        .catch((error) => {
            console.log(error);
        })
    });

    return(
        <>
            <Card.Group>
                {}
            </Card.Group>
        </>
    )
}

export default Log;