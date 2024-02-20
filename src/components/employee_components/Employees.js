import React from "react";
import { useEffect, useState } from "react";
import Employee from "./Employee";
import {Card, Button} from 'semantic-ui-react';
import '../employee_components/employeeCSS/employees.css';
import EmployeeAddForm from "../form_components/EmployeeAddForm";

function Employees(){

    const [employees, setEmployees] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [btnClick, setBtnClick] = useState(false);
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        department: "",
        role: ""
    });

    useEffect(()=>{
        fetch('/employees')
        .then(r => r.json())
        .then(emp => setEmployees(emp))
    },[]);

    function formCheck(){
        for (const property in form) {
            if(form[property] === ""){
                return false
            }
        }
        return true
    }

    function handleSubmit(event){
        event.preventDefault()

        if(!formCheck()){
            console.log("Error something needs to be done")
            return;
        }

        fetch("/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        .then((r)=> r.json())
        .then((response) => {
            const {first_name, last_name, department, role} = response
            const newEmployee = {
                first_name: first_name,
                last_name: last_name,
                department: department,
                role: role
            }
            setEmployees([...employees, newEmployee])
        })

    };

    function handleChange(event){
        const name = event.target.name
        const value = event.target.value
        setForm({
            ...form,
            [name]: value
        })
    };

    function handleSearch(event){
        setSearchQuery(event.target.value)
    };

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

    function handleBtnClick(){
        setBtnClick(!btnClick);
    }

    return(
        <>
            <div className="search-filter-window">
                <div className="employees-word"><h1>EMPLOYEES</h1></div>
                <input type="text" className="search-term" placeholder="What are you looking for?" onChange={handleSearch}/>
                <Button primary className="add-emp-btn" onClick={handleBtnClick}>Add Employee</Button>
            </div>

            <div className="hr-line">
                <hr></hr>
            </div>

            <Card.Group className="emp-group" itemsperRow={6} centered={true}>
                {filteredItems.map((employee)=>{
                    return (<Card><Employee key={employee.id} props={employee}/></Card>)
                })}
            </Card.Group>
                
            <br/>
            {
                btnClick ?
                    <EmployeeAddForm handleSubmit={handleSubmit} handleChange={handleChange} handleBtnClick={handleBtnClick} form={form}/>
                :
                null
            }
        </>
    )
}

export default Employees