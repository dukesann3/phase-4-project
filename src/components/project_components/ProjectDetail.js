import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import Assignment from "../assignment_components/Assignment";
import { Card } from "semantic-ui-react";

function ProjectDetail(){

    const { prj_id } = useParams();
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
    const [changeLogForm, setChangeLogForm] = useState({
        project_id: prj_id,
        detail: ""
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

    function handleLogChange(event){
        const detail = event.target.value;

        setChangeLogForm({
            ...changeLogForm,
            detail: detail
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!formChecker() && changeLogForm.detail === ""){
            //give error message here for incomplete form
            return
        }

        await Promise.all([
            fetch(`/projects/${prj_id}`,{
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(prjUpdateForm)
            }),
            fetch(`/project_log`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(changeLogForm)
            })
        ])
        .then(r => 
            Promise.all(r.map((resp) => resp.json()))
            )
        .then((response) => {
            console.log(response)
            setPrjDetail(response[0]);
            setPrjUpdateForm(response[0]);
            setChangeLogForm({
                project_id: prj_id,
                detail: ""
            })
        })

    }

    function handlePatch(patchedAssignment){
        const id = patchedAssignment.id;
        const copyPrj = JSON.parse(JSON.stringify(prjDetail));
        
        for(const property in copyPrj){
            if(property == "assignments"){
                for(let i = 0; i < copyPrj[property].length; i++){
                    const element = copyPrj[property][i]
                    if(element.id == id){ 
                        copyPrj[property][i] = patchedAssignment;
                    }
                }
            }
        }

        setPrjDetail(copyPrj);
    }

    function handleDelete(assignment_id){
        const copyPrj = JSON.parse(JSON.stringify(prjDetail));
        
        for(const property in copyPrj){
            if(property == "assignments"){
                for(let i = 0; i < copyPrj[property].length; i++){
                    const element = copyPrj[property][i]
                    if(element.id == assignment_id){ 
                        copyPrj[property].splice(i,1);
                    }
                }
            }
        }

        setPrjDetail(copyPrj);
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
                    <Card.Group itemsPerRow={3}>
                        {prjDetail.assignments.map((assign) => {
                            return <Assignment key={assign.id} props={assign} handlePrjPatch={handlePatch} handlePrjDelete={handleDelete}/>
                        })}
                    </Card.Group>
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
                        <input type="text" placeholder="change detail" name="change_detail" value={changeLogForm.detail} onChange={handleLogChange}></input>                        
                        <button type="submit">SUBMIT</button>
                    </form>
                </>
                : 
                <h1>Loading...</h1>
            }
        </div>
    )
}

export default ProjectDetail