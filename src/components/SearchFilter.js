import "../components/component_CSS/search-filter.css";
import { Button } from "semantic-ui-react";

//This belongs to Employees.js and Projects.js
function SearchFilter({handleBtnClick, handleSearch}){

    const URL = window.location.href;
    const info = URL.includes("employee") ? 
    {
        title: "EMPLOYEES",
        addWhat: "Add Employee"
    } : 
    {
        title: "PROJECTS",
        addWhat: "Add Project"
    };

    return(
        <>
            <div className="search-filter-window">
                <div className="word"><h1>{info.title}</h1></div>
                <input type="text" className="search-term" placeholder="What are you looking for?" onChange={handleSearch}/>
                <Button primary className="add-btn" onClick={handleBtnClick}>{info.addWhat}</Button>
            </div>

            <div className="hr-line">
                <hr></hr>
            </div>
        </>
    )
}

export default SearchFilter;