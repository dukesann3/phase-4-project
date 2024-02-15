
function Assignment({props}){

    const {comments, expected_end_date, start_date, name} = props

    return(
        <div className="assignment-window">
            <div className="container">{name}</div>
            <div className="container">{start_date}</div>
            <div className="container">{expected_end_date}</div>
            <div className="container">{comments}</div>
        </div>
    )
}

export default Assignment