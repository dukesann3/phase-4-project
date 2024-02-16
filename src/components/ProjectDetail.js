import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import Assignment from "./Assignment";

function ProjectDetail(){

    let { prj_id } = useParams();
    const [prjDetail, setPrjDetail] = useState()
    const [prjUpdateForm, setPrjUpdateForm] = useState({
        sales_order: "",
        name: "",
        start_date: "",
        expected_end_date: "",
        customer_name: "",
        sale_price: "",
        comment: ""
    })

    useEffect(()=>{
        fetch(`/projects/${prj_id}`)
        .then(r => r.json())
        .then((response) => {
            setPrjDetail(response);
            setPrjUpdateForm(response);
        })
    }, [])

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;

        setPrjUpdateForm({
            ...prjUpdateForm,
            [name]: value
        });

    }

    function formChecker(){
        for(const property in prjUpdateForm){
            if(!prjUpdateForm[property] && property!="comment"){
                return false
            }
        }
        return true
    }

    function handleSubmit(event){
        event.preventDefault();
        
        if(!formChecker()){
            //give error message here for incomplete form
            return
        }

        fetch(`/projects/${prj_id}`,{
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prjUpdateForm)
        })
        .then((r) => {
            if(r.ok){
                return r.json();
            }
            else{
                throw new Error("Something went wrong");
            }
        })
        .then((response) => {
            setPrjDetail(response);
            setPrjUpdateForm(response);
        })
        .catch((error) => {
            //do something when error
            console.log(error)
        })


    }

    return(
        <div className="project-detail-window">
            {(prjDetail && prjUpdateForm) ? 
                <> 
                    <div className="constainer">{prjDetail.sales_order}</div>
                    <div className="constainer">{prjDetail.name}</div>
                    <div className="constainer">{prjDetail.start_date}</div>
                    <div className="constainer">{prjDetail.expected_end_date}</div>
                    <div className="constainer">{prjDetail.customer_name}</div>
                    <div className="constainer">{prjDetail.sale_price}</div>
                    <div className="constainer">{prjDetail.comment}</div>

                    {/* Create some kind of line right here */}
                    <br />
                    {prjDetail.assignments.map((assign) => {
                        return <Assignment key={assign.id} props={assign}/>
                    })}
                    {/* Create and organize project patch form */}
                    <br/>
                    <form onSubmit={handleSubmit}>
                        <input type="number" placeholder="sales order" name="sales_order" value={prjUpdateForm.sales_order} onChange={handleChange}></input>
                        <input type="text" placeholder="name" name="name" value={prjUpdateForm.name} onChange={handleChange}></input>
                        <input type="date" placeholder="start date" name="start_date" value={prjUpdateForm.start_date} onChange={handleChange}></input>
                        <input type="date" placeholder="expected end date" name="expected_end_date" value={prjUpdateForm.expected_end_date} onChange={handleChange}></input>
                        <input type="text" placeholder="customer name" name="customer_name" value={prjUpdateForm.customer_name} onChange={handleChange}></input>
                        <input type="number" placeholder="sale price" name="sale_price" value={prjUpdateForm.sale_price} onChange={handleChange}></input>
                        <input type="text" placeholder="comment" name="comment" value={prjUpdateForm.comment} onChange={handleChange}></input>
                        <button>SUBMIT</button>
                    </form>
                </>
                : 
                <h1>Loading...</h1>
            }
        </div>
    )
}

export default ProjectDetail