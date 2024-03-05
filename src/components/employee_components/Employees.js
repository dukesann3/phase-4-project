import React from "react";
import { useEffect, useState } from "react";
import Employee from "./Employee";
import {Card} from 'semantic-ui-react';
import "../component_CSS/search-filter.css";
import EmployeeAddForm from "../form_components/EmployeeAddForm";
import SearchFilter from "../SearchFilter";

function Employees(){

    const [employees, setEmployees] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [btnClick, setBtnClick] = useState(false);

    useEffect(()=>{
        fetch('/employees')
        .then(r => r.json())
        .then(emp => setEmployees(emp))
    },[]);

    const open = () => setBtnClick(true);
    const close = () => setBtnClick(false);

    function handleSearch(event){
        setSearchQuery(event.target.value)
    };

    function addEmployee(newEmployee){
        setEmployees([...employees, newEmployee]);
    }

    const filteredItems = employees.filter((emp) => {
        const {first_name, last_name, department, role} = emp;
        const amalgamationOfEmp = String(first_name+last_name+department+role);
        const searchQueryLC = searchQuery.toLowerCase();
        if(searchQueryLC === ""){
            return true;
        }
        else if(amalgamationOfEmp.toLowerCase().includes(searchQueryLC)){
            return true;
        }
        else{
            return false;
        }
    });

    return(
        <>
            <SearchFilter open={open} handleSearch={handleSearch}/>

            <Card.Group className="group" itemsPerRow={3} centered={true}>
                {filteredItems.map((employee)=>{
                    return (<Card><Employee key={employee.id} props={employee} /></Card>)
                })}
            </Card.Group>
                
            <br/>
            {
                btnClick ?
                    <EmployeeAddForm addEmployee={addEmployee} close={close}/>
                :
                null
            }
        </>
    )
}

export default Employees