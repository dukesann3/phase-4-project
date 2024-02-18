
function AssignmentLog({props}){

    const {assignment_id, detail, updated_at} = props;

    return(
        <>
            <div className="somecontainter">Assignment ID: {assignment_id}</div>
            <div className="somecontainter">Change Detail: {detail}</div>
            <div className="somecontainter">Updated At: {updated_at}</div>
        </>
    )
}

export default AssignmentLog;