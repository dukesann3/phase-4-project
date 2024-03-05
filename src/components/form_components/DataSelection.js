
export const EmployeeSelectionForAdd = ({emps, handleChange, value}) => {

    return(
        <div>
            <h3>Employee Selection</h3>
            <select name="employee_id" 
            onChange={handleChange}
            value={value}
            >
                {emps.map((emp) => {
                    return <option value={emp.id} key={emp.id+emp.first_name}>{emp.first_name + " " + emp.last_name}</option>
                })}
            </select>
        </div>
    )
}

export const ProjectSelectionForAdd = ({prjs, handleChange, value}) => {

    return(
        <div>
            <h5>Project Selection</h5>
            <select name="project_id" 
            onChange={handleChange}
            value={value}
            >
                {prjs.map((prj) => {
                    return <option value={prj.id} key={prj.id+prj.name}>{prj.name}</option>
                })}
            </select>
        </div>
    )
}

export function EmployeeSelectionForPatch({emps, OGempID, handleChange, value}){
    return(
        <div>
            <h3>Employee Selection</h3>
            <select name="employee_id" 
            onChange={handleChange}
            value={value} >
                {emps.map((emp) => {
                    if(emp.id === OGempID){
                        return <option selected value={emp.id} key={emp.id+emp.first_name}>{emp.first_name + " " + emp.last_name}</option>
                    }
                    return <option value={emp.id} key={emp.id+emp.first_name}>{emp.first_name + " " + emp.last_name}</option>
                })}
            </select>
        </div>
    )
}

export function ProjectSelectionForPatch({prjs, OGprjID, handleChange, value}){
    return(
        <div>
            <h3>Project Selection</h3>
            <select name="project_id" 
            onChange={handleChange}
            value={value}>
                {prjs.map((prj) => {
                    if(prj.id === OGprjID){
                        return <option selected value={prj.id} key={prj.id+prj.name}>{prj.name}</option>
                    }
                    return <option value={prj.id} key={prj.id+prj.name}>{prj.name}</option>
                })}
            </select>
        </div>
    )
}



