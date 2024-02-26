import { useEffect, useState } from "react";
import Project from "./Project";
import { Card, Button } from "semantic-ui-react";
import './project_CSS/all_projects.css';
import ProjectAddForm from "../form_components/ProjectAddForm";

function Projects(){

    const [projects, setProjects] = useState([])
    const [form, setForm] = useState({
        sales_order: "",
        name: "",
        start_date: "",
        expected_end_date: "",
        customer_name: "",
        sale_price: "",
        comment: ""
    });
    const [filter, setFilter] = useState("");
    const [btnClick, setBtnClick] = useState(false);

    useEffect(()=>{
        fetch("/projects")
        .then(r => r.json())
        .then(response => setProjects(response))
    }, []);


    function handleChange(event){
        const name = event.target.name
        const value = event.target.value

        setForm({
            ...form,
            [name]: value
        })
    }

    function formChecker(){
        const {sales_order, name, start_date, expected_end_date} = form
        if(sales_order && name && start_date && expected_end_date){
            return true
        }

        return false
    }

    function handleClick(){
        setBtnClick(!btnClick);
    }

    //catach error please
    function handleSubmit(event){
        event.preventDefault()
        if(!formChecker()){
            //give it some error message please
            console.log("ok, so it hasn't worked?");
            console.log(form);
            return
        }

        fetch("/projects", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        .then((r) => {
            if(r.ok){
                return r.json();
            }
            throw new Error("Something went wrong")
        })
        .then((newPrj) => {
            setProjects([...projects, newPrj]);
        })
        .catch((error) => {
            console.log(error);
        })

    }

    function handlePrjDelete(id){
        fetch(`/projects/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((r) => {
            if(r.ok){
                return r.json() 
            }
            else{
                console.log(r);
                throw new Error("Something went wrong");
            }
        })
        .then((response) => {
            console.log(response);
            setProjects(projects.filter(prj => prj.id !== id));
        })
        .catch((error) => {
            console.log(error);
        })
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

    function handleProjectPatch(prj){
        setProjects(projects.map((project) => {
            if(project.id === prj.id){
                return prj
            }
            else{
                return project;
            }
        }));
    }



    return(
        <>
            <div className="search-filter-window">
                <div className="projects-word"><h1>PROJECTS</h1></div>
                <input type="text" className="search-term" placeholder="What are you looking for?" onChange={handleFilterChange}/>
                <Button primary className="add-prj-btn" onClick={handleClick}>Add Project</Button>
            </div>

            <hr/>

            <Card.Group className="prj-group" centered={true} itemsPerRow={3}>
                {filteredProjects.map((prj) => {
                    const {sales_order, id} = prj
                    return <Project 
                    key={id+sales_order} 
                    project={prj} 
                    handlePrjDelete={handlePrjDelete} 
                    handleProjectPatch={handleProjectPatch}
                    />
                })}
            </Card.Group>

            {
                btnClick ? 
                <ProjectAddForm 
                handleClick={handleClick} 
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                form={form}
                />
                :
                null
            }
        </>
    )
}

export default Projects