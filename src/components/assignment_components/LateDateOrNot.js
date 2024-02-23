
import './assignmentCSS/assignmentCSS.css';

function LateDateOrNot({expected_end_date, isComplete}){

    const now = new Date();
    const nowTimeStamp = now.getTime();
    const asgnEnd = new Date(expected_end_date);
    const AsgnEndTimeStamp = asgnEnd.getTime();

    const diffMicroSeconds = Math.abs(AsgnEndTimeStamp - nowTimeStamp);
    const diffDays = Math.round(diffMicroSeconds / (1000*60*60*24));

    return(
        <>
            {
                (isComplete) ? 
                <div className='completed-assignment date-indicator'>
                    Assignment Completed.
                </div> :
                (diffDays >= 3) ? 
                <div className='color-green date-indicator'>
                    Clear. {diffDays} days to deadline.
                </div> :
                (diffDays >= 0 && diffDays < 3) ?
                <div className='color-yellow date-indicator'>
                    Warning. {diffDays} days to deadline.
                </div> :
                <div className='color-red date-indicator'>
                    Deadline Passed. {diffDays} days passed deadline.
                </div>
            }
        </>
    )
}

export default LateDateOrNot;