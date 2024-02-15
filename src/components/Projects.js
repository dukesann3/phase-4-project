import { useEffect, useState } from "react"
import Project from "./Project"

function Projects(){

    const [projects, setProjects] = useState([])
    //add form later. After I create a way to view assignment

    useEffect(()=>{
        fetch("/projects")
        .then(r => r.json())
        .then(response => setProjects(response))
    }, [])

    return(
        <>
            {projects.map((prj) => {
                const {sales_order, name, id} = prj
                return(<Project id={id} sales_order={sales_order} name={name} />)
            })}
        </>
    )
}

export default Projects