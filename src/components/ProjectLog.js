
function ProjectLog({props}){

    const {project_id, updated_at, detail} = props;

    return(
        <>
            <div className="Some container">Project ID: {project_id}</div>
            <div className="Some container">Updated At: {updated_at}</div>
            <div className="Some container">Detail: {detail}</div>
        </>
    )
}

export default ProjectLog;