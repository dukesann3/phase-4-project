
function ProjectMeta({details}){

    const {name, sales_order, customer_name, 
        sale_price, start_date, expected_end_date, comment} = details;

    return(
        <div className="desc-container">
            <h2>Project: {name}'s Assignments</h2>
            <h3>Sales Order: {sales_order}</h3>
            <div className="meta">
                <span>Customer Name: {customer_name}</span>
                <span>Sale Price: ${sale_price}</span>
                <span>Start Date: {start_date}</span>
                <span>Expected End Date: {expected_end_date}</span>
            </div>
            <div>
                <span>Comments: {comment}</span>
            </div>
        </div>
    )
}

function EmployeeMeta({details}){

    const {first_name, last_name, department, role} = details;

    return(
        <div className="desc-container">
            <h2>{first_name} {last_name}'s Assignments</h2>
            <div className="meta">
                <span>Department: {department}</span>
                <span>Role: {role}</span>
            </div>
        </div>
    )
}

function FilterContainer({handleAsgnFilter, filterOptions}){
    return(
        <div className="emp-container">
            <h4>Filter Assignments By:</h4>
            <select className="filter-asgn"  
            onChange={handleAsgnFilter}>
                {filterOptions.map((filter, i) => {
                    if(filter === "All"){
                        return <option selected value={filter} key={`${filter}+${i}`}>{filter}</option>
                    }
                    return <option value={filter} key={`${filter}+${i}`}>{filter}</option>
                })}
            </select>
        </div>
    )
}

function Details({open, details, handleAsgnFilter, filterOptions}){

    const URL = window.location.href;

    return(
        <div className="detail-window">
            <div className="desc-window">
                {URL.includes("employee") ? <EmployeeMeta details={details}/> : <ProjectMeta details={details}/>}
                <FilterContainer handleAsgnFilter={handleAsgnFilter} filterOptions={filterOptions}/>
                <div className='btn-window'>
                    <h4>Add Assignment:</h4>
                    <Button onClick={open} className='btn'>Add</Button>
                </div>
            </div>
        </div>
    )
}

export default Details;

{/* <div className="detail-window">
<div className="desc-window">
    <ProjectMeta />
    <FilterContainer />
    <div className='btn-window'>
        <h4>Add Assignment:</h4>
        <Button onClick={open} className='btn'>Add</Button>
    </div>
</div>
</div> */}

{/* <div className="detail-window">
<div className="desc-window">
    <div className="desc-container">
        <h2>{empDetail.first_name} {empDetail.last_name}'s Assignments</h2>
        <div className="meta">
            <span>Department: {empDetail.department}</span>
            <span>Role: {empDetail.role}</span>
        </div>
    </div>
    <div className="filter-emp-container">
        <h4>Filter Assignments By:</h4>
        <select className="filter-asgn"  
        onChange={handleAsgnFilter}>
            {filterOptions.map((filter, i) => {
                if(filter === "All"){
                    return <option selected value={filter} key={`${filter}+${i}`}>{filter}</option>
                }
                return <option value={filter} key={`${filter}+${i}`}>{filter}</option>
            })}
        </select>
    </div>
    <div className='btn-window'>
        <h4>Add Assignment:</h4>
        <Button onClick={open} className='btn'>Add</Button>
    </div>
</div> */}