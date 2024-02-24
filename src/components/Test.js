import './component_CSS/test.css';


function Test(){

    function addDays(days){
        let date = new Date();
        date.setDate(date.getDate() + days);
        return date;
    }
    //reminder, january is 0th month in JS

    const now = new Date();
    let copyOfNow = new Date(now);

    const currentTimeObj = {
        year: now.getFullYear(),
        month: now.getMonth()+1,
        date: now.getDate()
    };

    const timeIn100Days = addDays(100);
    const futureTimeObj = {
        year: timeIn100Days.getFullYear(),
        month: timeIn100Days.getMonth(),
        date: timeIn100Days.getDate()
    };


    let dateArray = [];
    let count = 0;
    let days = 1;

    while(timeIn100Days.getTime() > copyOfNow.getTime()){
        dateArray.push(copyOfNow);
        copyOfNow = addDays(days);
        console.log(copyOfNow);
        days ++;
        count ++;

        if(count > 100){
            break
        }
    }

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    console.log(dateArray);

    return(
        <div className="container-of-dates">
            {dateArray.map((dates) => {
                return(
                    <div className="single-date-container">
                        {
                        dates.getDate() === 1 ? 
                        <span>{`${dates.getMonth()+1}/1`}</span>:
                        null
                        }
                        <span>{dates.getDate()}</span>
                        <span>{daysOfWeek[dates.getDay()]}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default Test;