import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";

function ProjectDetail(){

    let { prj_id } = useParams();
    const [prjDetail, setPrjDetail] = useState()

    useEffect(()=>{
        fetch(`/projects/${prj_id}`)
        .then(r => r.json())
        .then((response) => {
            setPrjDetail(response)
        })
    }, [])

    return(
        <div className="project-detail-window">
            {prjDetail ? 
                <> 
                    <div className="constainer">{prjDetail.sales_order}</div>
                    <div className="constainer">{prjDetail.name}</div>
                    <div className="constainer">{prjDetail.start_date}</div>
                    <div className="constainer">{prjDetail.expected_end_date}</div>
                    <div className="constainer">{prjDetail.customer_name}</div>
                    <div className="constainer">{prjDetail.sale_price}</div>
                    <div className="constainer">{prjDetail.comment}</div>
                </>
                : 
                <h1>Loading...</h1>
            }
        </div>
    )
}

export default ProjectDetail