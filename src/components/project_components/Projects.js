import { useEffect, useState } from "react";
import Project from "./Project";
import { Card } from "semantic-ui-react";
import ProjectAddForm from "../form_components/ProjectAddForm";
import SearchFilter from "../SearchFilter";
import './project_CSS/all_projects.css';

function Projects(){

    const [projects, setProjects] = useState([])
    const [filter, setFilter] = useState("");
    const [btnClick, setBtnClick] = useState(false);

    useEffect(()=>{
        fetch("/projects")
        .then(r => r.json())
        .then(response => setProjects(response))
    }, []);

    const open = () => setBtnClick(true);
    const close = () => setBtnClick(false);

    function addProject(prj){
        setProjects([...projects, prj]);
    }

    function patchProject(prj){
        setProjects(projects.map((project) => {
            if(project.id === prj.id){
                return prj
            }
            return project;
        }));
    }

    function deleteProject(prj){
        setProjects(projects.filter(project => project.id !== prj.id));
    }

    function handleFilterChange(event){
        setFilter(event.target.value);
    }

    const filteredProjects = projects.filter((prj) => {
        const {name, sales_order, customer_name} = prj;
        const altogether = (name+sales_order+customer_name).toLowerCase();
        if(altogether.includes(filter.toLowerCase())){
            return true;
        }
        return false;
    });

    return(
        <>
            <SearchFilter open={open} handleSearch={handleFilterChange}/>

            <Card.Group className="prj-group" centered={true} itemsPerRow={3}>
                {filteredProjects.map((prj) => {
                    const {sales_order, id} = prj
                    return <Project key={id+sales_order} project={prj} 
                                patchProject={patchProject} deleteProject={deleteProject}/>
                })}
            </Card.Group>

            {
                btnClick ? 
                <ProjectAddForm close={close} addProject={addProject} />
                :
                null
            }
        </>
    )
}

export default Projects