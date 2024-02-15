import { useEffect, useState } from "react"
import Project from "./Project"

function Projects(){

    const [projects, setProjects] = useState([])
    const [form, setForm] = useState({

    })

    // sales_order=db.Column(db.Integer, nullable=False)
    // name=db.Column(db.String, nullable=False)
    // start_date=db.Column(db.Date, nullable=False)
    // expected_end_date=db.Column(db.Date, nullable=False)
    // customer_name=db.Column(db.String)
    // sale_price=db.Column(db.Float)
    // comment=db.Column(db.String)

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