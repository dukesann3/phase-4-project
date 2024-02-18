import { useEffect, useState } from "react"
import Project from "./Project"

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
    })

    useEffect(()=>{
        fetch("/projects")
        .then(r => r.json())
        .then(response => setProjects(response))
    }, [])

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

    //catach error please
    function handleSubmit(event){
        event.preventDefault()
        if(!formChecker){
            //give it some error message please
            return
        }

        fetch("/projects", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        .then(r => r.json())
        .then((response) => {
            setProjects([...projects, response])
            console.log(response)
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
                throw new Error("Something went wrong")
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

    return(
        <>
            {projects.map((prj) => {
                const {sales_order, id} = prj
                return(<Project key={id+sales_order} props={prj} handlePrjDelete={handlePrjDelete}/>)
            })}
            {/* Try to make this dryer */}
            <form onSubmit={handleSubmit}>
                <input type="number" placeholder="sales order" name="sales_order" value={form.sales_order} onChange={handleChange}></input>
                <input type="text" placeholder="name" name="name" value={form.name} onChange={handleChange}></input>
                <input type="date" placeholder="start date" name="start_date" value={form.start_date} onChange={handleChange}></input>
                <input type="date" placeholder="expected end date" name="expected_end_date" value={form.expected_end_date} onChange={handleChange}></input>
                <input type="text" placeholder="customer name" name="customer_name" value={form.customer_name} onChange={handleChange}></input>
                <input type="number" placeholder="sale price" name="sale_price" value={form.sale_price} onChange={handleChange}></input>
                <input type="text" placeholder="comment" name="comment" value={form.comment} onChange={handleChange}></input>
                <button>SUBMIT</button>
            </form>
        </>
    )
}

export default Projects