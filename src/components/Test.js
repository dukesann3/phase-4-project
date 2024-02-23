import './component_CSS/test.css';


function Test(){

    const currentDate = new Date();
    const timeStamp = currentDate.getTime();
    console.log(timeStamp);
    
    const testDate = new Date(2024, 4, 23);
    console.log(testDate.getTime());

    return(
        <div className="grid-container">
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
        </div>
    )
}

export default Test;